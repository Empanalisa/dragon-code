import { DRAGONS, DRAGON_NAMES, RARITY, dragonLevel } from '../data/dragons.js';
import { DECORATIONS, GROUNDS, DRAGON_SPOTS, islandProgress, isUnlocked, needText } from '../data/island.js';

// The outline of the island (fits viewBox 0 0 800 420)
const ISLAND =
  '120,230 150,190 210,175 260,150 330,145 380,120 450,125 520,110 590,135 640,160 690,175 720,215 700,260 720,300 670,330 600,345 520,360 440,352 360,365 280,350 210,340 150,310 110,280';
const INK = '#1C1346';

// Each decoration is drawn with a few simple shapes at its own spot
function Decoration({ id }) {
  if (id === 'tree')
    return (
      <g>
        <rect x="183" y="205" width="14" height="32" fill="#8A5A3C" />
        <polygon points="155,212 190,135 225,212" fill="#2FB592" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <polygon points="165,175 190,118 215,175" fill="#3DDBB0" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      </g>
    );
  if (id === 'hut')
    return (
      <g>
        <rect x="600" y="208" width="80" height="58" rx="6" fill="#FFB061" stroke={INK} strokeWidth="3" />
        <polygon points="590,212 640,165 690,212" fill="#FF7A6B" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <rect x="628" y="232" width="24" height="34" rx="5" fill="#1C1233" />
      </g>
    );
  if (id === 'campfire')
    return (
      <g>
        <ellipse cx="430" cy="332" rx="34" ry="9" fill="#FFC53D" opacity="0.25" />
        <line x1="410" y1="336" x2="450" y2="326" stroke="#8A5A3C" strokeWidth="7" strokeLinecap="round" />
        <line x1="410" y1="326" x2="450" y2="336" stroke="#8A5A3C" strokeWidth="7" strokeLinecap="round" />
        <path d="M430 288 C442 302 446 312 438 324 L422 324 C414 312 418 300 430 288 Z" fill="#FF8A3D" stroke={INK} strokeWidth="2" />
        <path d="M430 304 C436 312 436 318 432 324 L428 324 C424 318 425 311 430 304 Z" fill="#FFD978" />
      </g>
    );
  if (id === 'flag')
    return (
      <g>
        <line x1="380" y1="168" x2="380" y2="88" stroke="#FCF5FF" strokeWidth="4" strokeLinecap="round" />
        <polygon points="382,90 422,104 382,118" fill="#FF6EC7" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      </g>
    );
  if (id === 'crystals')
    return (
      <g stroke={INK} strokeWidth="2" strokeLinejoin="round">
        <polygon points="160,312 172,280 184,312 172,324" fill="#6FD3E8" />
        <polygon points="182,314 196,270 210,314 196,330" fill="#C77DFF" />
        <polygon points="208,316 216,296 224,316 216,324" fill="#6FD3E8" />
      </g>
    );
  if (id === 'lantern')
    return (
      <g>
        <line x1="290" y1="212" x2="290" y2="160" stroke="#5B3F94" strokeWidth="5" strokeLinecap="round" />
        <circle cx="290" cy="152" r="20" fill="#FFC53D" opacity="0.25" />
        <circle cx="290" cy="152" r="9" fill="#FFD978" stroke={INK} strokeWidth="2" />
      </g>
    );
  if (id === 'tower')
    return (
      <g stroke={INK} strokeWidth="3" strokeLinejoin="round">
        <rect x="475" y="92" width="50" height="100" fill="#A98BFF" />
        <rect x="471" y="78" width="12" height="16" fill="#A98BFF" />
        <rect x="494" y="78" width="12" height="16" fill="#A98BFF" />
        <rect x="517" y="78" width="12" height="16" fill="#A98BFF" />
        <rect x="492" y="118" width="16" height="24" rx="8" fill="#1C1233" />
      </g>
    );
  return null;
}

export function IslandScene({ dragons, island, onChange }) {
  const progress = islandProgress(dragons);
  const ground = GROUNDS.find((g) => g.id === island.ground) || GROUNDS[0];
  const residents = DRAGON_NAMES.filter((name) => dragons.includes(name));
  const shown = DECORATIONS.filter((d) => island.placed.includes(d.id) && isUnlocked(d, progress));

  function toggle(id) {
    const placed = island.placed.includes(id) ? island.placed.filter((x) => x !== id) : [...island.placed, id];
    onChange({ ...island, placed });
  }

  return (
    <>
      {/* The scene */}
      <section className="island-scene">
        <div className="island-box">
          <svg viewBox="0 0 800 420" className="island-svg" aria-hidden="true">
            <polygon points={ISLAND} transform="translate(0 14)" fill="#1A1048" />
            <polygon points={ISLAND} fill={ground.color} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
            <ellipse cx="300" cy="190" rx="90" ry="24" fill="#FFFFFF" opacity="0.18" />
            <ellipse cx="580" cy="190" rx="70" ry="18" fill="#FFFFFF" opacity="0.18" />
            {shown.map((d) => (
              <Decoration key={d.id} id={d.id} />
            ))}
          </svg>

          <span className="island-sign">{island.name || 'My Island'}</span>

          {residents.map((name, i) => {
            const level = dragonLevel(dragons, name);
            return (
              <div
                key={name}
                className="resident"
                style={{ left: `${DRAGON_SPOTS[name].x}%`, top: `${DRAGON_SPOTS[name].y}%`, animationDelay: `${i * 0.4}s` }}
              >
                <span className="resident-portrait" style={{ borderColor: RARITY[DRAGONS[name].rarity].frame }}>
                  <img src={DRAGONS[name].icon} alt="" />
                  <span className="resident-level">Lv {level}</span>
                </span>
                <span className="resident-name">{name}</span>
              </div>
            );
          })}

          {residents.length === 0 && (
            <p className="island-empty">Hatch a dragon in the Hatchery and it will come live here.</p>
          )}
        </div>
      </section>

      {/* Decorate */}
      <section className="card decorate">
        <h2 style={{ fontSize: 24 }}>Decorate your island</h2>
        <p className="muted" style={{ margin: 0 }}>
          Collect more dragons to unlock new decorations and ground colors.
        </p>

        <label className="field" style={{ maxWidth: 360 }}>
          <span className="field-label">Island name</span>
          <input
            type="text"
            maxLength={24}
            value={island.name}
            onChange={(e) => onChange({ ...island, name: e.target.value })}
          />
        </label>

        <div className="field">
          <span className="field-label">Ground</span>
          <div className="ground-row">
            {GROUNDS.map((g) => {
              const open = isUnlocked(g, progress);
              const on = island.ground === g.id;
              return (
                <button
                  key={g.id}
                  className={on ? 'ground-option on' : 'ground-option'}
                  disabled={!open}
                  aria-pressed={on}
                  onClick={() => onChange({ ...island, ground: g.id })}
                  title={open ? g.name : needText(g.need)}
                >
                  <span className="ground-swatch" style={{ background: g.color }}>
                    {!open && <img src="/images/icon-lock.svg" alt="" width="18" height="18" />}
                  </span>
                  <span>{g.name}</span>
                  {!open && <span className="unlock-text">{needText(g.need)}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="field">
          <span className="field-label">Decorations</span>
          <div className="decor-grid">
            {DECORATIONS.map((d) => {
              const open = isUnlocked(d, progress);
              const placed = island.placed.includes(d.id);
              return (
                <div key={d.id} className={open ? 'decor-tile' : 'decor-tile locked'}>
                  <svg viewBox={DECOR_VIEW[d.id]} className="decor-preview" aria-hidden="true">
                    <Decoration id={d.id} />
                  </svg>
                  <strong>{d.name}</strong>
                  {open ? (
                    <button className={placed ? 'btn btn-secondary decor-button' : 'btn btn-primary decor-button'} onClick={() => toggle(d.id)}>
                      {placed ? 'Remove' : 'Place'}
                    </button>
                  ) : (
                    <span className="unlock-text">
                      <img src="/images/icon-lock.svg" alt="" width="14" height="14" className="lock-light" /> {needText(d.need)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

// The area of the island picture each decoration sits in, used for the small previews
const DECOR_VIEW = {
  tree: '145 110 90 135',
  hut: '580 155 120 120',
  campfire: '395 280 70 65',
  flag: '360 80 75 95',
  crystals: '150 260 85 75',
  lantern: '265 125 50 95',
  tower: '460 70 80 130',
};
