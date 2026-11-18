import { DRAGONS, RARITY } from '../data/dragons.js';

// One dragon: picture with its name on top, then rarity, level, power and a short blurb.
// level = 0 means not found yet: the card shows a dark mystery dragon instead.
export function DragonCard({ name, level = 1, large = false }) {
  const dragon = DRAGONS[name];
  if (!dragon) return null;
  const rarity = RARITY[dragon.rarity];
  const found = level > 0;

  return (
    <article
      className={large ? 'dragon-card large' : 'dragon-card'}
      style={{ borderColor: found ? rarity.frame : 'var(--surface-2)' }}
    >
      <div className="dragon-picture">
        <img src={dragon.image} alt={found ? name + ', a dragon' : 'Not found yet'} className={found ? '' : 'mystery'} />
        <span className="dragon-name">{found ? name : '???'}</span>
        {found && <span className="dragon-level">Level {level}</span>}
      </div>
      <div className="dragon-meta">
        <span className="pill" style={found ? { background: rarity.bg, color: rarity.fg } : { background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
          {dragon.rarity.toUpperCase()} · {dragon.chance}%
        </span>
        {found ? (
          <>
            <p className="dragon-power">
              <strong>{dragon.power.name}:</strong> {dragon.power.text}
            </p>
            <p className="muted dragon-blurb">{dragon.blurb}</p>
          </>
        ) : (
          <p className="muted dragon-blurb">Not hatched yet. Keep buying eggs!</p>
        )}
      </div>
    </article>
  );
}
