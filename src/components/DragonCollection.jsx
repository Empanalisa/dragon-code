import { DragonCard } from './DragonCard.jsx';
import { DRAGON_NAMES, dragonLevel, MAX_LEVEL } from '../data/dragons.js';

// One card per dragon. Hatching the same dragon again levels it up (up to Level 5).
export function DragonCollection({ dragons }) {
  const found = DRAGON_NAMES.filter((name) => dragons.includes(name)).length;

  return (
    <main className="screen">
      <div>
        <h1 className="screen-title">Dragon collection</h1>
        <p className="muted screen-subtitle">
          {found} of {DRAGON_NAMES.length} found · {dragons.length} hatched. Hatching a dragon again levels it up (max Level {MAX_LEVEL}), and each level gives one more use of its power.
        </p>
      </div>

      {dragons.length === 0 && (
        <div className="card empty-collection">
          <div className="empty-ring">
            <img src="/images/icon-egg-outline.svg" alt="" width="30" height="30" />
          </div>
          <div>
            <h2 style={{ fontSize: 24 }}>No dragons yet</h2>
            <p className="muted" style={{ margin: 0 }}>
              Answer 2 questions in Stack Village to earn 20 coins, then buy your first egg.
            </p>
          </div>
        </div>
      )}

      <div className="dragon-grid">
        {DRAGON_NAMES.map((name) => (
          <DragonCard key={name} name={name} level={dragonLevel(dragons, name)} />
        ))}
      </div>
    </main>
  );
}
