import { useEffect, useState } from 'react';
import { KingdomMap } from './components/KingdomMap.jsx';
import { Challenge } from './components/Challenge.jsx';
import { EggShop } from './components/EggShop.jsx';
import { DragonCollection } from './components/DragonCollection.jsx';
import { Practice } from './components/Practice.jsx';
import { StackTower } from './components/StackTower.jsx';
import { MyIsland } from './components/MyIsland.jsx';
import { VILLAGES } from './data/challenges.js';
import { rollDragon, powersFor } from './data/dragons.js';
import { loadSave, writeSave, clearSave, dayString } from './data/save.js';
import './App.css';

const EGG_COST = 20;
const COINS_PER_ANSWER = 10; // first time a village question is answered right
const COINS_PER_REVIEW = 5; // every right answer in Review
const DAILY_BONUS = 10; // first practice of the day
const REVIEW_SIZE = 5;

const START = { coins: 0, rewarded: [], missed: [], hasEgg: false, dragons: [], streak: { count: 0, lastDay: null }, custom: [] };
const ALL_QUESTIONS = Object.values(VILLAGES).flatMap((v) => v.questions);

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function App() {
  // Load saved progress once, then keep each piece in its own state
  const [saved] = useState(() => ({ ...START, ...(loadSave() || {}) }));
  const [screen, setScreen] = useState('map'); // map | challenge | practice | tower | island | hatchery | dragons
  const [session, setSession] = useState(null); // the questions being played right now
  const [coins, setCoins] = useState(saved.coins);
  const [rewarded, setRewarded] = useState(saved.rewarded); // village questions already paid
  const [missed, setMissed] = useState(saved.missed); // questions answered wrong: the review pile
  const [hasEgg, setHasEgg] = useState(saved.hasEgg);
  const [dragons, setDragons] = useState(saved.dragons);
  const [streak, setStreak] = useState(saved.streak);
  const [custom, setCustom] = useState(saved.custom); // My Island questions
  const [toast, setToast] = useState(null);

  // Save after every change
  useEffect(() => {
    writeSave({ coins, rewarded, missed, hasEgg, dragons, streak, custom });
  }, [coins, rewarded, missed, hasEgg, dragons, streak, custom]);

  // Hide the toast message after a few seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  // A village is cleared once every one of its questions has paid out
  const cleared = {};
  for (const id of Object.keys(VILLAGES)) {
    cleared[id] = VILLAGES[id].questions.every((q) => rewarded.includes(q.id));
  }

  // The streak only counts if you practiced today or yesterday
  const liveStreak = streak.lastDay === dayString(0) || streak.lastDay === dayString(-1) ? streak.count : 0;

  // Review pile: questions you got wrong, then ones you already answered right
  const missedQuestions = ALL_QUESTIONS.filter((q) => missed.includes(q.id));
  const doneQuestions = ALL_QUESTIONS.filter((q) => rewarded.includes(q.id) && !missed.includes(q.id));

  function practicedToday() {
    const today = dayString(0);
    if (streak.lastDay === today) return;
    const count = streak.lastDay === dayString(-1) ? streak.count + 1 : 1;
    setStreak({ count, lastDay: today });
    setCoins((c) => c + DAILY_BONUS);
    setToast(`${count}-day streak! +${DAILY_BONUS} bonus coins`);
  }

  function play(kind, set) {
    setSession({ key: Date.now(), kind, set });
    setScreen('challenge');
  }

  function enterVillage(id) {
    play('village', VILLAGES[id]);
  }

  function startReview() {
    const questions = [...shuffle(missedQuestions), ...shuffle(doneQuestions)].slice(0, REVIEW_SIZE);
    play('review', {
      name: 'Review',
      topic: 'review',
      color: 'var(--pink)',
      questions,
      doneTitle: 'Review done!',
      doneText: 'Nice practice. Questions you got right on the first try leave your review pile.',
      backLabel: 'practice',
    });
  }

  function startMyIsland() {
    play('custom', {
      name: 'My Island',
      topic: 'custom',
      color: 'var(--roost)',
      questions: shuffle(custom),
      doneTitle: 'Practice done!',
      doneText: `You went through all ${custom.length} of your own questions.`,
      backLabel: 'practice',
    });
  }

  function handleCorrect(id, { firstTry, double }) {
    const times = double ? 2 : 1;
    let earned = 0;
    if (session.kind === 'village' && !rewarded.includes(id)) {
      earned = COINS_PER_ANSWER * times; // each village question pays only once
      setRewarded((r) => [...r, id]);
    }
    if (session.kind === 'review') {
      earned = COINS_PER_REVIEW * times;
      if (firstTry) setMissed((m) => m.filter((x) => x !== id));
    }
    if (earned > 0) setCoins((c) => c + earned);
    practicedToday();
  }

  function handleWrong(id) {
    if (session.kind === 'custom') return; // your own questions don't go in the review pile
    setMissed((m) => (m.includes(id) ? m : [...m, id]));
  }

  function handleTowerWin(earned) {
    setCoins((c) => c + earned);
    practicedToday();
  }

  function handleBuyEgg() {
    if (coins < EGG_COST || hasEgg) return;
    setCoins(coins - EGG_COST);
    setHasEgg(true);
  }

  function handleHatch() {
    // The first hatch is always Byteena, so the demo is predictable
    const name = dragons.length === 0 ? 'Byteena' : rollDragon();
    setDragons([...dragons, name]);
    setHasEgg(false);
  }

  function resetGame() {
    if (!window.confirm('Reset all progress? Coins, dragons and your own questions will be gone.')) return;
    clearSave();
    setScreen('map');
    setSession(null);
    setCoins(START.coins);
    setRewarded([]);
    setMissed([]);
    setHasEgg(false);
    setDragons([]);
    setStreak(START.streak);
    setCustom([]);
  }

  const tabs = [
    { id: 'map', label: 'Kingdom map' },
    { id: 'practice', label: 'Practice' },
    { id: 'hatchery', label: 'Hatchery' },
    { id: 'dragons', label: `Dragons (${dragons.length})` },
  ];
  let activeTab = screen;
  if (screen === 'challenge') activeTab = session && session.kind === 'village' ? 'map' : 'practice';
  if (screen === 'tower' || screen === 'island') activeTab = 'practice';

  return (
    <div className="app stars">
      <div className="page">
        {/* Top nav */}
        <header className="top-nav">
          <button className="logo" onClick={() => setScreen('map')}>
            <img src="/images/logo.svg" alt="" width="44" height="44" />
            <span>Code &amp; Conquer</span>
          </button>
          <nav className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={tab.id === activeTab ? 'tab active' : 'tab'}
                onClick={() => setScreen(tab.id)}
              >
                {tab.label}
              </button>
            ))}
            <div className="streak-counter" title="Day streak: practice once a day to keep it going">
              <img src="/images/icon-flame.svg" alt="" width="24" height="24" />
              <span>{liveStreak}</span>
            </div>
            <div className="coin-counter" aria-label={`${coins} coins`}>
              <img src="/images/icon-coin.svg" alt="" width="30" height="30" />
              <span>{coins}</span>
            </div>
          </nav>
        </header>

        {/* One screen at a time */}
        {screen === 'map' && (
          <KingdomMap coins={coins} cleared={cleared} onEnterVillage={enterVillage} onNavigate={setScreen} />
        )}
        {screen === 'challenge' && session && (
          <Challenge
            key={session.key}
            set={session.set}
            powers={powersFor(dragons)}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            onClose={() => setScreen(session.kind === 'village' ? 'map' : 'practice')}
          />
        )}
        {screen === 'practice' && (
          <Practice
            streak={liveStreak}
            reviewCount={missedQuestions.length}
            canReview={missedQuestions.length + doneQuestions.length > 0}
            customCount={custom.length}
            onReview={startReview}
            onTower={() => setScreen('tower')}
            onIsland={() => setScreen('island')}
          />
        )}
        {screen === 'tower' && <StackTower onWin={handleTowerWin} onClose={() => setScreen('practice')} />}
        {screen === 'island' && (
          <MyIsland
            questions={custom}
            onAdd={(q) => setCustom([...custom, q])}
            onDelete={(id) => setCustom(custom.filter((q) => q.id !== id))}
            onPractice={startMyIsland}
            onClose={() => setScreen('practice')}
          />
        )}
        {screen === 'hatchery' && (
          <EggShop coins={coins} hasEgg={hasEgg} dragons={dragons} onBuyEgg={handleBuyEgg} onHatch={handleHatch} />
        )}
        {screen === 'dragons' && <DragonCollection dragons={dragons} />}

        <button className="reset" onClick={resetGame}>Reset progress</button>
      </div>

      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

export default App;
