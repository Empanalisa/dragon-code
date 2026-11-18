// Every dragon the egg can hatch. Lifo and Overflow are color-shifted copies of Byteena until more art exists.
// chance = how likely each egg is to hatch it (adds up to 100).
// power = what the dragon does during questions. A dragon can use its power once per level each round.
export const DRAGONS = {
  Byteena: {
    rarity: 'Common',
    chance: 60,
    image: '/images/dragon-byteena.png',
    icon: '/images/dragon-icon.png',
    blurb: 'Loves to peek at the top of every stack.',
    power: { id: 'peek', name: 'Peek', text: 'Takes away one wrong answer.' },
  },
  Lifo: {
    rarity: 'Rare',
    chance: 30,
    image: '/images/dragon-lifo.png',
    icon: '/images/dragon-lifo-icon.png',
    blurb: 'Last into the cave, first out every morning.',
    power: { id: 'hint', name: 'Hint', text: 'Shows the hint before you answer.' },
  },
  Overflow: {
    rarity: 'Legendary',
    chance: 10,
    image: '/images/dragon-overflow.png',
    icon: '/images/dragon-overflow-icon.png',
    blurb: 'Grew so big no stack could hold it.',
    power: { id: 'double', name: 'Double', text: 'Your next right answer pays double coins.' },
  },
};

export const DRAGON_NAMES = Object.keys(DRAGONS);
export const MAX_LEVEL = 5;

// A dragon's level = how many times you've hatched it (up to MAX_LEVEL).
export function dragonLevel(dragons, name) {
  return Math.min(dragons.filter((d) => d === name).length, MAX_LEVEL);
}

// Pick a dragon using the chances above.
export function rollDragon() {
  let roll = Math.random() * 100;
  for (const name of DRAGON_NAMES) {
    roll -= DRAGONS[name].chance;
    if (roll < 0) return name;
  }
  return DRAGON_NAMES[0];
}

// The powers the player can use, one entry per dragon they own.
export function powersFor(dragons) {
  return DRAGON_NAMES.filter((name) => dragons.includes(name)).map((name) => ({
    ...DRAGONS[name].power,
    image: DRAGONS[name].icon,
    uses: dragonLevel(dragons, name),
  }));
}

// Pill and frame colors for each rarity
export const RARITY = {
  Common: { bg: '#4A3580', fg: '#EFE4FF', frame: 'var(--border)' },
  Rare: { bg: '#1F5A8C', fg: '#D6EEFF', frame: '#6FC3FF' },
  Legendary: { bg: 'var(--gold)', fg: '#2A1A00', frame: 'var(--gold)' },
};
