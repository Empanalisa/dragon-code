import { useState } from 'react'
import { VILLAGES } from '../data/challenges.js'

const LETTERS = ['A', 'B', 'C', 'D']
// one color per block in the stack picture (top block first)
const BLOCK_COLORS = ['var(--stack)', 'var(--hatchery)', 'var(--roost)', 'var(--queue)', 'var(--array)']

// set = the questions to play: { name, topic, color, questions } (a village, Review, or My Island).
//   Optional: doneTitle, doneText, backLabel for the end card and back button.
// powers = the player's dragon powers, for example [{ id: 'peek', name: 'Peek', uses: 2, image, text }]
export function Challenge({ village = 'stack', set, powers = [], onCorrect, onWrong, onClose }) {
  const info = set || VILLAGES[village]
  const challenges = info.questions
  const [index, setIndex] = useState(0)
  const [wrongPicks, setWrongPicks] = useState([])
  const [solved, setSolved] = useState(false)
  const [cleared, setCleared] = useState(false)
  // dragon powers
  const [removed, setRemoved] = useState([]) // answers taken away by Peek
  const [showHint, setShowHint] = useState(false) // Hint shows before answering
  const [double, setDouble] = useState(false) // Double: next right answer pays twice
  const [used, setUsed] = useState({}) // how many times each power was used this round

  const challenge = challenges[index]
  const isLast = index === challenges.length - 1

  function pickAnswer(i) {
    if (solved || wrongPicks.includes(i) || removed.includes(i)) return
    if (i === challenge.correctIndex) {
      setSolved(true)
      onCorrect(challenge.id, { firstTry: wrongPicks.length === 0, double })
      setDouble(false)
    } else {
      setWrongPicks([...wrongPicks, i])
      if (onWrong) onWrong(challenge.id)
    }
  }

  function activatePower(power) {
    const left = power.uses - (used[power.id] || 0)
    if (solved || left <= 0) return
    if (power.id === 'peek') {
      // take away one wrong answer the player hasn't tried yet
      const options = challenge.answers
        .map((_, i) => i)
        .filter((i) => i !== challenge.correctIndex && !wrongPicks.includes(i) && !removed.includes(i))
      if (options.length === 0) return
      setRemoved([...removed, options[Math.floor(Math.random() * options.length)]])
    }
    if (power.id === 'hint') setShowHint(true)
    if (power.id === 'double') setDouble(true)
    setUsed({ ...used, [power.id]: (used[power.id] || 0) + 1 })
  }

  function nextQuestion() {
    if (isLast) {
      setCleared(true)
      return
    }
    setIndex(index + 1)
    setWrongPicks([])
    setSolved(false)
    setRemoved([])
    setShowHint(false)
  }

  if (cleared) {
    return (
      <div style={styles.wrap}>
        <div className="card" style={styles.clearedCard}>
          <img src="/images/icon-trophy.svg" alt="" width="96" height="96" />
          <h1 style={{ fontSize: 36 }}>{info.doneTitle || `${info.name} cleared!`}</h1>
          <p className="muted" style={{ margin: 0, fontSize: 18 }}>
            {info.doneText ||
              `You answered all ${challenges.length} ${info.topic} questions. Your coins are waiting back on the map.`}
          </p>
          <button className="btn btn-primary" onClick={onClose}>
            Back to {info.backLabel || 'map'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.wrap}>
      {/* top row */}
      <div style={styles.topRow}>
        <button className="btn btn-secondary" onClick={onClose}>
          ← {info.backLabel === 'practice' ? 'Practice' : 'Kingdom map'}
        </button>
        <span className="muted" style={{ fontWeight: 800 }}>
          Question {index + 1} of {challenges.length}
        </span>
      </div>

      <div className="card" style={styles.card}>
        <span className="pill" style={{ ...styles.villagePill, background: info.color }}>{info.name.toUpperCase()}</span>
        <h1 style={{ fontSize: 30, lineHeight: 1.25 }}>{challenge.question}</h1>

        {/* stack picture */}
        {challenge.stack && (
          <div className="stars" style={styles.stackBox}>
            {challenge.stack.map((item, i) => (
              <div key={i} style={styles.blockRow}>
                <div style={{ ...styles.block, background: BLOCK_COLORS[i % BLOCK_COLORS.length] }}>
                  {item}
                </div>
                {i === 0 && <span style={styles.topLabel}>← top</span>}
              </div>
            ))}
          </div>
        )}

        {/* queue picture: front on the left, back on the right */}
        {challenge.queue && (
          <div className="stars" style={styles.stackBox}>
            <div style={styles.lineRow}>
              <span style={styles.endLabel}>front</span>
              {challenge.queue.map((item, i) => (
                <div key={i} style={{ ...styles.block, width: 72, background: BLOCK_COLORS[i % BLOCK_COLORS.length] }}>
                  {item}
                </div>
              ))}
              <span style={styles.endLabel}>back</span>
            </div>
          </div>
        )}

        {/* array picture: one box per item, index above it */}
        {challenge.array && (
          <div className="stars" style={styles.stackBox}>
            <div style={styles.lineRow}>
              {challenge.array.map((item, i) => (
                <div key={i} style={styles.cell}>
                  <span style={styles.index}>[{i}]</span>
                  <div style={{ ...styles.block, width: 72, background: BLOCK_COLORS[i % BLOCK_COLORS.length] }}>
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* dragon powers */}
        {powers.length > 0 && (
          <div style={styles.powerBar}>
            <span className="muted" style={{ fontWeight: 800 }}>Dragon powers</span>
            {powers.map((p) => {
              const left = p.uses - (used[p.id] || 0)
              return (
                <button
                  key={p.id}
                  className="power"
                  disabled={solved || left <= 0}
                  onClick={() => activatePower(p)}
                  title={p.text}
                >
                  <img src={p.image} alt="" />
                  <span>{p.name}</span>
                  <span className="power-left">×{left}</span>
                </button>
              )
            })}
            {double && <span style={styles.doubleTag}>Next right answer pays double</span>}
          </div>
        )}

        {/* answers */}
        <div style={styles.answerGrid}>
          {challenge.answers.map((answer, i) => {
            const isWrong = wrongPicks.includes(i)
            const isRight = solved && i === challenge.correctIndex
            const isRemoved = removed.includes(i)
            const faded = (solved && !isRight) || isRemoved

            let look = styles.answer
            if (isWrong) look = { ...look, ...styles.answerWrong }
            if (isRight) look = { ...look, ...styles.answerRight }
            if (faded) look = { ...look, opacity: 0.5 }
            if (isRemoved) look = { ...look, textDecoration: 'line-through', cursor: 'not-allowed' }

            return (
              <button
                key={i}
                style={look}
                disabled={isWrong || solved || isRemoved}
                onClick={() => pickAnswer(i)}
              >
                <span style={{
                  ...styles.letter,
                  ...(isWrong ? { background: 'var(--wrong)', borderColor: 'var(--wrong)', color: '#2B0A08' } : {}),
                  ...(isRight ? { background: 'var(--right)', borderColor: 'var(--right)', color: '#0B2620' } : {}),
                }}>{LETTERS[i]}</span>
                <span style={{ flex: 1 }}>{answer}</span>
                {isWrong && <span style={{ color: 'var(--wrong)', fontSize: 22 }}>×</span>}
                {isRight && <span style={{ color: 'var(--right)', fontSize: 22 }}>✓</span>}
              </button>
            )
          })}
        </div>

        {/* hint from a dragon power, before any wrong answer */}
        {showHint && !solved && wrongPicks.length === 0 && (
          <div style={{ ...styles.feedback, ...styles.feedbackHint }}>
            <strong style={{ color: 'var(--queue)' }}>Dragon hint</strong>
            <p style={{ margin: 0 }}>{challenge.hint}</p>
          </div>
        )}

        {/* feedback boxes */}
        {!solved && wrongPicks.length > 0 && (
          <div style={{ ...styles.feedback, ...styles.feedbackWrong }}>
            <strong style={{ color: 'var(--wrong)' }}>Not quite. Try again!</strong>
            <p style={{ margin: 0 }}>{challenge.hint}</p>
          </div>
        )}

        {solved && (
          <div style={{ ...styles.feedback, ...styles.feedbackRight }}>
            <strong style={{ color: 'var(--right)' }}>Correct!</strong>
            <p style={{ margin: 0 }}>{challenge.explanation}</p>
            <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={nextQuestion}>
              {isLast ? 'Finish village' : 'Next question'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  // keeps the whole screen in one 860px column, lined up under the top bar
  wrap: { maxWidth: 860, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 },
  topRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  card: {
    maxWidth: 860,
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  villagePill: { alignSelf: 'flex-start', background: 'var(--gold)', color: 'var(--shadow)' },
  stackBox: {
    backgroundColor: 'var(--bg)',
    borderRadius: 'var(--radius)',
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  blockRow: { position: 'relative', display: 'flex', alignItems: 'center' },
  block: {
    width: 180,
    height: 42,
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--shadow)',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 20,
  },
  topLabel: {
    position: 'absolute',
    left: '100%',
    marginLeft: 12,
    whiteSpace: 'nowrap',
    color: 'var(--gold)',
    fontWeight: 800,
  },
  lineRow: { display: 'flex', alignItems: 'flex-end', gap: 8 },
  endLabel: { alignSelf: 'center', color: 'var(--gold)', fontWeight: 800, padding: '0 6px' },
  cell: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  index: { color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 },
  answerGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  answer: {
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '8px 16px',
    background: 'var(--surface-2)',
    color: 'var(--text)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'var(--border)',
    borderRadius: 'var(--radius)',
    boxShadow: '0 4px 0 var(--shadow)',
    fontFamily: 'var(--font-body)',
    fontSize: 17,
    fontWeight: 700,
    textAlign: 'left',
    cursor: 'pointer',
  },
  answerWrong: { background: 'var(--wrong-bg)', borderColor: 'var(--wrong)', cursor: 'not-allowed' },
  answerRight: { background: 'var(--right-bg)', borderColor: 'var(--right)', cursor: 'default' },
  letter: {
    flexShrink: 0,
    width: 34,
    height: 34,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg)',
    border: '2px solid var(--border)',
    fontFamily: 'var(--font-display)',
  },
  feedback: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 20,
    borderRadius: 'var(--radius)',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  feedbackHint: { background: '#173550', borderColor: 'var(--queue)' },
  powerBar: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 },
  doubleTag: { color: 'var(--gold)', fontWeight: 800 },
  feedbackWrong: { background: 'var(--wrong-bg)', borderColor: 'var(--wrong)' },
  feedbackRight: { background: 'var(--right-bg)', borderColor: 'var(--right)' },
  clearedCard: {
    maxWidth: 560,
    width: '100%',
    margin: '40px auto 0',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    textAlign: 'center',
  },
}
