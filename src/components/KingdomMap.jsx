import React, { useState } from 'react';

const TERRITORIES = [
  { 
    id: 'stack', 
    name: 'Stack Village', 
    kicker: 'VILLAGE 1 OPEN', 
    x: 28, 
    y: 51.8, 
    color: '#FF708B', 
    chip: '#FF708B', 
    locked: false, 
    text: 'Master LIFO stacks and data pointers to open the gates.' 
  },
  { 
    id: 'queue', 
    name: 'Queue Village', 
    kicker: 'VILLAGE 2 LOCKED', 
    x: 59, 
    y: 33, 
    color: '#31C48D', 
    chip: '#31C48D', 
    locked: true, 
    text: 'Locked! Clear Stack Village to open the gates of Queue Village.' 
  },
  { 
    id: 'array', 
    name: 'Array Forest', 
    kicker: 'VILLAGE 3 LOCKED', 
    x: 59, 
    y: 70.5, 
    color: '#FEE140', 
    chip: '#FEE140', 
    locked: true, 
    text: 'Locked! Clear previous villages to explore.' 
  },
  { 
    id: 'hatchery', 
    name: 'Hatchery Isle', 
    kicker: 'HATCHERY', 
    x: 88, 
    y: 33, 
    color: '#9061F9', 
    chip: '#9061F9', 
    locked: false, 
    text: 'You can afford an egg!' 
  },
  { 
    id: 'roost', 
    name: "Dragon's Roost", 
    kicker: 'DRAGONS', 
    x: 87.8, 
    y: 76.4, 
    color: '#1CADFF', 
    chip: '#1CADFF', 
    locked: false, 
    text: 'View your hatched dragon collection.' 
  }
];

export function KingdomMap({ coins = 0, onEnterVillage, onNavigate }) {
  const [selected, setSelected] = useState('stack');
  const active = TERRITORIES.find(t => t.id === selected) || TERRITORIES[0];

  return (
    <div style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Heading */}
      <h1 style={{ fontSize: '44px', fontWeight: 'bold', marginBottom: '8px', color: '#FFFFFF' }}>
        Choose your quest
      </h1>
      <p style={{ fontSize: '18px', color: 'var(--muted-text, #9CA3AF)', marginBottom: '24px' }}>
        Explore the kingdom and solve data structure challenges.
      </p>

      {/* Map Box */}
      <div 
        className="stars" 
        style={{ 
          position: 'relative', 
          borderRadius: '28px', 
          overflow: 'hidden', 
          backgroundColor: '#4A3BA8', 
          minHeight: '560px',
          marginBottom: '24px'
        }}
      >
        <svg viewBox="0 0 1000 560" style={{ width: '100%', display: 'block' }}>
          {TERRITORIES.map((t) => {
            const isSelected = selected === t.id;
            return (
              <polygon
                key={t.id}
                className="land"
                points="100,100 200,80 250,180 120,200"
                fill={t.locked ? '#2D2370' : t.color}
                stroke={isSelected ? '#FFFFFF' : 'none'}
                strokeWidth={isSelected ? '6' : '0'}
                onClick={() => setSelected(t.id)}
                style={{ cursor: 'pointer' }}
              />
            );
          })}
        </svg>

        {/* Markers */}
        {TERRITORIES.map((t) => {
          const isSelected = selected === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              style={{
                position: 'absolute',
                left: `${t.x}%`,
                top: `${t.y}%`,
                transform: `translate(-50%, -36px) ${isSelected ? 'scale(1.12)' : 'scale(1)'}`,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.2s'
              }}
            >
              <div 
                style={{ 
                  width: '66px', 
                  height: '66px', 
                  borderRadius: '50%', 
                  backgroundColor: t.chip, 
                  border: isSelected ? '4px solid #FFFFFF' : '3px solid rgba(255,255,255,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                {t.locked ? '🔒' : '⭐'}
              </div>
              <span style={{ 
                marginTop: '6px', 
                padding: '4px 12px', 
                borderRadius: '999px', 
                backgroundColor: '#1F2937', 
                color: '#FFFFFF', 
                fontSize: '15px', 
                fontFamily: 'Josefin Sans, sans-serif',
                whiteSpace: 'nowrap'
              }}>
                {t.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Info Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: '#1F2937', 
        padding: '20px', 
        borderRadius: '20px',
        color: '#FFFFFF',
        gap: '20px'
      }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '12px', 
          backgroundColor: active.color,
          flexShrink: 0 
        }} />
        
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', color: active.locked ? 'var(--locked-text, #9CA3AF)' : '#9CA3AF' }}>
            {active.kicker}
          </div>
          <div style={{ fontSize: '26px', fontFamily: 'Josefin Sans, sans-serif', fontWeight: 'bold', margin: '2px 0' }}>
            {active.name}
          </div>
          <div style={{ fontSize: '14px', color: active.locked ? 'var(--locked-text, #D1D5DB)' : '#D1D5DB' }}>
            {active.id === 'hatchery' && coins >= 20 ? "You can afford an egg!" : active.text}
          </div>
        </div>

        <div>
          {active.id === 'stack' ? (
            <button 
              className="btn btn-primary" 
              onClick={() => onEnterVillage && onEnterVillage('stack')}
            >
              Enter village
            </button>
          ) : active.locked ? (
            <button className="btn" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
              Locked
            </button>
          ) : (
            <button 
              className="btn btn-primary" 
              onClick={() => onNavigate && onNavigate(active.id)}
            >
              Open
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
