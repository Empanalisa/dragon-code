import { DRAGON_NAMES, dragonLevel } from './dragons.js';

// What you unlock on your island. need = how you unlock it:
//   hatched: hatch this many eggs   found: find this many different dragons   level: get any dragon to this level
export const DECORATIONS = [
  { id: 'tree', name: 'Tree', need: null },
  { id: 'hut', name: 'Hut', need: { type: 'hatched', n: 1 } },
  { id: 'campfire', name: 'Campfire', need: { type: 'hatched', n: 2 } },
  { id: 'flag', name: 'Flag', need: { type: 'found', n: 2 } },
  { id: 'crystals', name: 'Crystals', need: { type: 'level', n: 3 } },
  { id: 'lantern', name: 'Lantern', need: { type: 'hatched', n: 6 } },
  { id: 'tower', name: 'Dragon tower', need: { type: 'found', n: 3 } },
];

export const GROUNDS = [
  { id: 'meadow', name: 'Meadow', color: '#7FD69B', need: null },
  { id: 'sand', name: 'Sand', color: '#FFD978', need: { type: 'hatched', n: 3 } },
  { id: 'lavender', name: 'Lavender', color: '#C77DFF', need: { type: 'found', n: 3 } },
  { id: 'rose', name: 'Rose', color: '#FF7AC6', need: { type: 'level', n: 5 } },
];

// Where each dragon lives on the island, in % across / down the scene
export const DRAGON_SPOTS = {
  Byteena: { x: 32, y: 58 },
  Lifo: { x: 52, y: 44 },
  Overflow: { x: 70, y: 60 },
};

export const START_ISLAND = { name: 'My Island', ground: 'meadow', placed: ['tree'] };

// The numbers the unlock rules check
export function islandProgress(dragons) {
  return {
    hatched: dragons.length,
    found: DRAGON_NAMES.filter((name) => dragons.includes(name)).length,
    level: Math.max(0, ...DRAGON_NAMES.map((name) => dragonLevel(dragons, name))),
  };
}

export function isUnlocked(item, progress) {
  return !item.need || progress[item.need.type] >= item.need.n;
}

// Plain-words version of an unlock rule, for example "Hatch 2 eggs"
export function needText(need) {
  if (need.type === 'hatched') return `Hatch ${need.n} ${need.n === 1 ? 'egg' : 'eggs'}`;
  if (need.type === 'found') return `Find ${need.n} different dragons`;
  return `Get a dragon to Level ${need.n}`;
}
