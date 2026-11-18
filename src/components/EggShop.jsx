import { useState } from 'react';
import { DragonCard } from './DragonCard.jsx';
import { DRAGONS, DRAGON_NAMES, RARITY, dragonLevel, MAX_LEVEL } from '../data/dragons.js';

const EGG_COST = 20;

// The Hatchery: buy an egg on the left, hatch it in the nest on the right.
export function EggShop({ coins, hasEgg, dragons, onBuyEgg, onHatch }) {
  const [justHatched, setJustHatched] = useState(false);
  const canBuy = coins >= EGG_COST && !hasEgg;
  const newest = dragons[dragons.length - 1];
  const newestCount = newest ? dragons.filter((d) => d === newest).length : 0;
  const newestLevel = newest ? dragonLevel(dragons, newest) : 0;
  let headline = 'NEW DRAGON!';
  if (newestCount > MAX_LEVEL) headline = 'ALREADY MAX LEVEL';
  else if (newestCount > 1) headline = `LEVEL UP! LEVEL ${newestLevel}`;

  function buy() {
    setJustHatched(false);
    onBuyEgg();
  }

  function hatch() {
    setJustHatched(true);
    onHatch();
  }

  let buyLabel = 'Buy egg for 20 coins';
  if (hasEgg) buyLabel = 'Egg in your nest';
  else if (!canBuy) buyLabel = 'Not enough coins';

  return (
    <main className="screen">
      <div>
        <h1 className="screen-title">The Hatchery</h1>
        <p className="muted screen-subtitle">Trade your coins for a mystery egg, then hatch it to meet your dragon.</p>
      </div>

      <div className="hatchery-grid">
        {/* Shop */}
        <section className="card shop">
          <span className="pill" style={{ background: '#4A3580', color: '#EFE4FF', alignSelf: 'flex-start' }}>EGG SHOP</span>
          <div className="shop-item">
            <img src="/images/egg.png" alt="Mystery egg in a nest" className="shop-egg" />
            <div>
              <h2 className="shop-title">Mystery Egg</h2>
              <p className="muted" style={{ margin: '4px 0 10px' }}>Hatches one random dragon. A dragon you already have levels up.</p>
              <div className="price">
                <img src="/images/icon-coin.svg" alt="" width="26" height="26" />
                <span>20</span>
              </div>
            </div>
          </div>
          <div className="odds">
            {DRAGON_NAMES.map((name) => (
              <span key={name} className="pill" style={{ background: RARITY[DRAGONS[name].rarity].bg, color: RARITY[DRAGONS[name].rarity].fg }}>
                {DRAGONS[name].rarity} {DRAGONS[name].chance}%
              </span>
            ))}
          </div>
          <button className="btn btn-primary shop-button" onClick={buy} disabled={!canBuy}>
            {buyLabel}
          </button>
          {!hasEgg && coins < EGG_COST && (
            <p className="muted" style={{ margin: 0 }}>You need {EGG_COST - coins} more coins.</p>
          )}
          {hasEgg && (
            <p className="muted" style={{ margin: 0 }}>Your egg is waiting in the nest. Hatch it before buying another.</p>
          )}
        </section>

        {/* Nest */}
        <section className="nest stars">
          {hasEgg && (
            <>
              <img src="/images/egg.png" alt="Mystery egg in a nest" className="nest-egg" />
              <p className="muted" style={{ margin: 0 }}>Something is moving inside...</p>
              <button className="btn btn-primary hatch-button" onClick={hatch}>Hatch Egg</button>
            </>
          )}

          {!hasEgg && justHatched && newest && (
            <>
              <span className="new-dragon">{headline}</span>
              <div style={{ width: 300 }}>
                <DragonCard name={newest} level={newestLevel} large />
              </div>
              <p className="muted" style={{ margin: 0, fontWeight: 700 }}>Saved to your Dragons tab.</p>
            </>
          )}

          {!hasEgg && !justHatched && (
            <>
              <div className="empty-nest">
                <img src="/images/icon-egg-outline.svg" alt="" width="64" height="64" />
              </div>
              <h2 style={{ fontSize: 26 }}>Your nest is empty</h2>
              <p className="muted" style={{ margin: 0, maxWidth: 320 }}>Buy a Mystery Egg from the shop and it will appear here.</p>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
