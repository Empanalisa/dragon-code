// The Practice hub: Review, the Stack Tower mini-game, and My Island.
export function Practice({ streak, reviewCount, canReview, customCount, onReview, onTower, onIsland }) {
  return (
    <main className="screen">
      <div>
        <h1 className="screen-title">Practice</h1>
        <p className="muted screen-subtitle">
          Keep earning coins by practicing. Your first practice each day gives a +10 coin bonus
          {streak > 0 ? ` and keeps your ${streak}-day streak going.` : ' and starts a streak.'}
        </p>
      </div>

      <div className="practice-grid">
        <section className="card practice-card">
          <span className="practice-icon" style={{ background: 'var(--right-bg)' }}><img src="/images/icon-check.svg" alt="" width="32" height="32" /></span>
          <h2>Review</h2>
          <p className="muted">
            Replay questions from the villages. The ones you got wrong come first, and they leave your
            review pile when you get them right on the first try.
          </p>
          <p className="practice-stat">{reviewCount} to review · +5 coins per right answer</p>
          <button className="btn btn-primary" onClick={onReview} disabled={!canReview}>
            {canReview ? 'Start review' : 'Answer a village question first'}
          </button>
        </section>

        <section className="card practice-card">
          <span className="practice-icon" style={{ background: 'var(--stack)' }}><img src="/images/icon-stack.svg" alt="" width="32" height="32" /></span>
          <h2>Stack Tower</h2>
          <p className="muted">
            A mini-game: use push and pop to build the target tower. You can only touch the top!
          </p>
          <p className="practice-stat">+10 coins for a perfect tower · +5 otherwise</p>
          <button className="btn btn-primary" onClick={onTower}>Play Stack Tower</button>
        </section>

        <section className="card practice-card">
          <span className="practice-icon" style={{ background: 'var(--roost)' }}><img src="/images/icon-pencil.svg" alt="" width="32" height="32" /></span>
          <h2>My Island</h2>
          <p className="muted">
            Your own land where your dragons live. Decorate it as you collect, and write your own study questions.
          </p>
          <p className="practice-stat">{customCount} of your own questions · counts for your streak</p>
          <button className="btn btn-primary" onClick={onIsland}>Open My Island</button>
        </section>
      </div>
    </main>
  );
}
