<div align="center">

<img src="public/images/dragon-byteena.png" alt="Byteena, the first dragon in Code & Conquer" width="180" />

# 🐉 Code & Conquer

**A browser game that teaches CS1 data-structure basics: answer coding questions, earn coins, hatch dragons.**

[**▶ Play the live demo**](https://dragon-code-drab.vercel.app)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel&logoColor=white)

</div>

---

## About

Code & Conquer was built by a student team in the **Girls Who Code club at UCF**. The idea: make a first computer-science course feel like a game instead of a quiz. Players travel around a kingdom map, clear a village of coding questions for each CS1 topic, spend their coins on dragon eggs, and build up a collection of dragons that help them in later challenges.

The team planned the game, designed the dragons and screens, built it in React over several weeks, and presented the finished project together at the end of the club term.

### My role

I was the team's **mentor** and co-presented the finished project with the team at the end of the term.

## Features

### Learn
- **Kingdom map with three topic villages**: Stack Village, Queue Village and Array Forest, each with three questions. Clearing a village unlocks the next one.
- **Hints and explanations on every question.** A wrong answer is crossed out and shows a hint that never gives the answer away. A right answer shows a short explanation of why it's right.
- **Fair rewards.** Each village question pays **10 coins once**, so replaying can't be farmed. Wrong answers cost nothing, and getting it right after a mistake still earns the full reward. See [`docs/challenges/reward-rules.md`](docs/challenges/reward-rules.md).

### Collect
- **Egg shop and hatchery.** An egg costs 20 coins. The first hatch is always Byteena, so the demo is predictable. After that, hatches are random by rarity.
- **Three dragons with powers.** Hatching the same dragon again levels it up, to a maximum of level 5.

| Dragon | Rarity | Hatch chance | Power |
| --- | --- | --- | --- |
| Byteena | Common | 60% | **Peek**: removes one wrong answer |
| Lifo | Rare | 30% | **Hint**: shows the hint before you answer |
| Overflow | Legendary | 10% | **Double**: your next right answer pays double |

### Practice
- **Review** replays the questions you missed first, then ones you've already cleared (+5 coins per right answer).
- **Stack Tower** is a push/pop puzzle. You turn your stack into the target stack in as few moves as you can (+10 coins for a perfect tower, +5 otherwise).
- **My Island** lets you write your own questions and decorate a personal island. Hatching dragons unlocks new decorations and ground styles.
- **Daily streaks** give a bonus for practicing each day.
- **Progress saves in your browser** (`localStorage`), so refreshing doesn't wipe your dragons. There's also a reset button in the app.

## Tech stack

| | |
| --- | --- |
| UI | React 19 (function components and hooks) |
| Build tool | Vite 8 with `@vitejs/plugin-react` |
| Styling | Plain CSS with shared design tokens (CSS variables) |
| Linting | [oxlint](https://oxc.rs/docs/guide/usage/linter) with React and hooks rules |
| Hosting | Vercel |
| State and persistence | React state plus `localStorage`, with no backend |

## Getting started

You need [Node.js](https://nodejs.org/) and npm.

```bash
git clone https://github.com/Empanalisa/dragon-code.git
cd dragon-code
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint with oxlint |

## Project structure

```
dragon-code/
├── docs/challenges/     # Question write-ups and the coin reward rules
├── design/dragons/      # Dragon design notes
├── public/images/       # Map art, dragons, eggs and icons
└── src/
    ├── App.jsx          # Game state, coin rules, screen routing
    ├── components/      # KingdomMap, Challenge, EggShop, DragonCollection,
    │                    # Practice, StackTower, MyIsland, IslandScene
    └── data/            # challenges.js, dragons.js, island.js, save.js
```

The questions, dragons and island unlocks live in `src/data/` as plain data, so adding a new village or dragon mostly means adding an entry rather than changing game logic.

## Team

Built by the Girls Who Code at UCF team:

- **Elisa**
- **Rosalie**
- **Cali**

Thank you to everyone who contributed to the game.
