import { useState } from 'react';

// Stack Tower: use push and pop to turn your stack into the target stack.
// Stacks are written bottom first, so the last item is the top.
const NUMBERS = [1, 2, 3, 4, 5];
const MAX_HEIGHT = 6;
const COLORS = { 1: 'var(--stack)', 2: 'var(--hatchery)', 3: 'var(--roost)', 4: 'var(--queue)', 5: 'var(--array)' };

function randomStack(min, max) {
  const height = min + Math.floor(Math.random() * (max - min + 1));
  return Array.from({ length: height }, () => NUMBERS[Math.floor(Math.random() * NUMBERS.length)]);
}

function sameStack(a, b) {
  return a.length === b.length && a.every((n, i) => n === b[i]);
}

// Fewest moves: pop down to the part both stacks share at the bottom, then push the rest.
function fewestMoves(start, target) {
  let shared = 0;
  while (shared < start.length && shared < target.length && start[shared] === target[shared]) shared++;
  return start.length - shared + (target.length - shared);
}

function newRound() {
  let start = randomStack(1, 3);
  let target = randomStack(2, 4);
  while (sameStack(start, target)) target = randomStack(2, 4);
  return { start, target, current: start, moves: [], solved: false };
}

function Tower({ label, items, highlight }) {
  return (
    <div className="tower">
      <span className="tower-label">{label}</span>
      <div className={highlight ? 'tower-stack done' : 'tower-stack'}>
        {items.length === 0 && <span className="muted tower-empty">empty</span>}
        {[...items].reverse().map((n, i) => (
          <div key={items.length - i} className="tower-block" style={{ background: COLORS[n] }}>
            {n}
            {i === 0 && <span className="tower-top">← top</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function StackTower({ onWin, onClose }) {
  const [round, setRound] = useState(newRound);
  const [result, setResult] = useState(null); // { coins, perfect, best } after a win

  function apply(nextStack, move) {
    if (round.solved) return;
    const moves = [...round.moves, move];
    const solved = sameStack(nextStack, round.target);
    setRound({ ...round, current: nextStack, moves, solved });
    if (solved) {
      const best = fewestMoves(round.start, round.target);
      const perfect = moves.length <= best;
      const coins = perfect ? 10 : 5;
      setResult({ coins, perfect, best });
      onWin(coins);
    }
  }

  function push(n) {
    if (round.current.length >= MAX_HEIGHT) return;
    apply([...round.current, n], `push(${n})`);
  }

  function pop() {
    if (round.current.length === 0) return;
    apply(round.current.slice(0, -1), 'pop()');
  }

  function next() {
    setRound(newRound());
    setResult(null);
  }

  return (
    <main className="screen tower-screen">
      <div className="tower-top-row">
        <button className="btn btn-secondary" onClick={onClose}>← Practice</button>
        <span className="muted" style={{ fontWeight: 800 }}>Moves: {round.moves.length}</span>
      </div>

      <section className="card tower-card">
        <span className="pill" style={{ background: 'var(--stack)', color: 'var(--shadow)', alignSelf: 'flex-start' }}>
          STACK TOWER
        </span>
        <h1 style={{ fontSize: 30 }}>Make your stack match the target</h1>
        <p className="muted" style={{ margin: 0 }}>
          push(n) puts a block on top. pop() takes the top block off. You can only touch the top!
        </p>

        <div className="tower-row">
          <Tower label="Your stack" items={round.current} highlight={round.solved} />
          <Tower label="Target" items={round.target} />
        </div>

        <div className="tower-controls">
          {NUMBERS.map((n) => (
            <button
              key={n}
              className="btn btn-secondary tower-button"
              onClick={() => push(n)}
              disabled={round.solved || round.current.length >= MAX_HEIGHT}
            >
              push({n})
            </button>
          ))}
          <button className="btn btn-primary tower-button" onClick={pop} disabled={round.solved || round.current.length === 0}>
            pop()
          </button>
        </div>

        <p className="tower-log">
          {round.moves.length === 0 ? 'Your moves will show up here.' : round.moves.join('  →  ')}
        </p>

        {result && (
          <div className="tower-win">
            <strong style={{ color: 'var(--right)' }}>
              {result.perfect ? 'Perfect tower!' : 'Tower built!'} +{result.coins} coins
            </strong>
            <p style={{ margin: 0 }}>
              You used {round.moves.length} moves. The fewest possible was {result.best}.
              {!result.perfect && ' Tip: only pop down to the blocks that already match.'}
            </p>
            <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={next}>
              Next tower
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
