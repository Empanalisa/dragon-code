import { useState } from 'react';
import './KingdomMap.css';

// Every place on the map. x / y = where its button sits, in % across / down the map.
// Villages (number 1-3) unlock in order; the other two places are always open.
const TERRITORIES = [
  {
    id: 'stack',
    name: 'Stack Village',
    number: 1,
    x: 28,
    y: 51.8,
    color: 'var(--stack)',
    chip: '#FFD978',
    icon: '/images/icon-stack.svg',
    text: 'Master push, pop and LIFO to defend the tower.',
  },
  {
    id: 'queue',
    name: 'Queue Village',
    number: 2,
    x: 59,
    y: 33,
    color: 'var(--queue)',
    chip: '#9ADCF0',
    icon: '/images/icon-queue.svg',
    text: 'Line up and learn FIFO: first in, first out.',
    lockedText: 'Locked! Clear Stack Village to open the gates of Queue Village.',
  },
  {
    id: 'array',
    name: 'Array Forest',
    number: 3,
    x: 59,
    y: 70.5,
    color: 'var(--array)',
    chip: '#A3E3B4',
    icon: '/images/icon-array.svg',
    text: 'Find your way through the forest, one index at a time.',
    lockedText: 'Locked! Clear Queue Village to find the path into the forest.',
  },
  {
    id: 'hatchery',
    name: 'Hatchery Isle',
    kicker: 'EGG SHOP',
    x: 88,
    y: 33,
    color: 'var(--hatchery)',
    chip: 'var(--hatchery)',
    picture: '/images/egg-icon.png',
    text: 'Mystery eggs cost 20 coins. Each one hatches a dragon.',
    action: 'Visit the Hatchery',
    screen: 'hatchery',
  },
  {
    id: 'roost',
    name: "Dragon's Roost",
    kicker: 'YOUR COLLECTION',
    x: 87.8,
    y: 76.4,
    color: 'var(--roost)',
    chip: 'var(--roost)',
    picture: '/images/dragon-icon.png',
    text: 'Your hatched dragons live here.',
    action: 'View dragons',
    screen: 'dragons',
  },
];

// cleared = which villages are finished, for example { stack: true, queue: false, array: false }
export function KingdomMap({ coins = 0, cleared = {}, onEnterVillage, onNavigate }) {
  const [selected, setSelected] = useState('stack');

  // Work out each place's state from the player's progress
  const places = TERRITORIES.map((t) => {
    const locked = (t.id === 'queue' && !cleared.stack) || (t.id === 'array' && !cleared.queue);
    if (!t.number) return { ...t, locked: false };
    const state = locked ? 'LOCKED' : cleared[t.id] ? 'CLEARED' : 'OPEN';
    return {
      ...t,
      locked,
      kicker: `VILLAGE ${t.number} · ${state}`,
      text: locked ? t.lockedText : t.text,
      icon: locked ? '/images/icon-lock.svg' : t.icon,
      action: cleared[t.id] ? 'Replay village' : 'Enter village',
    };
  });
  const active = places.find((t) => t.id === selected) || places[0];

  // The land picture changes as villages unlock
  let mainland = '/images/mainland.svg';
  if (cleared.queue) mainland = '/images/mainland-all-open.svg';
  else if (cleared.stack) mainland = '/images/mainland-queue-open.svg';

  let description = active.text;
  if (active.id === 'hatchery' && coins >= 20) description = 'You can afford an egg!';

  function handleAction() {
    if (active.number) {
      if (onEnterVillage) onEnterVillage(active.id);
    } else if (active.screen && onNavigate) {
      onNavigate(active.screen);
    }
  }

  return (
    <main className="kingdom">
      {/* Heading */}
      <div>
        <h1 className="kingdom-title">Choose your quest</h1>
        <p className="muted kingdom-subtitle">
          Pick a territory on the map. Clear challenges, earn coins, and hatch dragons.
        </p>
      </div>

      <section className="map-card">
        {/* Map box: background is CSS, the land is 3 pictures, markers sit on top */}
        <div className="map-box">
          <img src={mainland} alt="" className="map-piece mainland" />
          <img src="/images/hatchery-isle.svg" alt="" className="map-piece hatchery" />
          <img src="/images/dragons-roost.svg" alt="" className="map-piece roost" />
          <img src="/images/compass.svg" alt="" className="map-piece compass" />
          <span className="sea-label" style={{ left: '24%', top: '5%' }}>Null Ocean</span>
          <span className="sea-label" style={{ left: '87.8%', top: '54%' }}>Sea of Syntax</span>

          {/* Markers */}
          {places.map((t) => {
            const isSelected = selected === t.id;
            return (
              <button
                key={t.id}
                className={isSelected ? 'marker selected' : 'marker'}
                style={{ left: `${t.x}%`, top: `${t.y}%` }}
                onClick={() => setSelected(t.id)}
                aria-label={t.name + (t.locked ? ', locked' : '')}
              >
                <span className="marker-chip" style={{ background: t.chip }}>
                  {t.picture ? (
                    <img src={t.picture} alt="" className="marker-picture" />
                  ) : (
                    <img src={t.icon} alt="" className="marker-icon" />
                  )}
                </span>
                <span className="marker-name">{t.name}</span>
              </button>
            );
          })}
        </div>

        {/* Info bar */}
        <div className="info-bar">
          <div className="info-panel">
            <div className="info-square" style={{ background: active.color }}>
              {active.locked && <img src="/images/icon-lock.svg" alt="" width="28" height="28" />}
            </div>
            <div className="info-text">
              <div className="info-kicker">{active.kicker}</div>
              <div className="info-name">{active.name}</div>
              <div className={active.locked ? 'info-description locked' : 'info-description'}>
                {description}
              </div>
            </div>
          </div>

          {active.locked ? (
            <button className="btn btn-primary info-button" disabled>
              Locked
            </button>
          ) : (
            <button className="btn btn-primary info-button" onClick={handleAction}>
              {active.action} →
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
