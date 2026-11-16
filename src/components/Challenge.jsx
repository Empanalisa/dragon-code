import { useState } from 'react'
import { challenges } from '../data/challenges.js'

const LETTERS = ['A', 'B', 'C', 'D']
// one color per block in the stack picture (top block first)
const BLOCK_COLORS = ['var(--stack)', 'var(--hatchery)', 'var(--roost)', 'var(--queue)', 'var(--array)']

export function Challenge({ onCorrect, onClose }) {
  const [index, setIndex] = useState(0)
  const [wrongPicks, setWrongPicks] = useState([])
  const [solved, setSolved] = useState(false)
  const [cleared, setCleared] = useState(false)

  const challenge = challenges[index]
  const isLast = index === challenges.length - 1

  function pickAnswer(i) {
    if (solved || wrongPicks.includes(i)) return
    if (i === challenge.correctIndex) {
      setSolved(true)
      onCorrect(challenge.id)
    } else {
      setWrongPicks([...wrongPicks, i])
    }
  }

  function nextQuestion() {
    if (isLast) {
      setCleared(true)
      return
    }
    setIndex(index + 1)
    setWrongPicks([])
    setSolved(false)
  }

  if (cleared) {
    return (
      <div className="page">
        <div className="card" style={styles.clearedCard}>
          <img src="/images/icon-trophy.svg" alt="" width="96" height="96" />
          <h1 style={{ fontSize: 36 }}>Stack Village cleared!</h1>
          <p className="muted" style={{ margin: 0, fontSize: 18 }}>
            You answered all {challenges.length} stack questions. Your coins are waiting back on the map.
          </p>
          <button className="btn btn-primary" onClick={onClose}>
            Back to map
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      {/* top row */}
      <div style={styles.topRow}>
        <button className="btn btn-secondary" onClick={onClose}>
          ← Kingdom map
        </button>
        <span className="muted" style={{ fontWeight: 800 }}>
          Question {index + 1} of {challenges.length}
        </span>
      </div>

      <div className="card" style={styles.card}>
        <span className="pill" style={styles.villagePill}>STACK VILLAGE</span>
        <h1 style={{ fontSize: 30, lineHeight: 1.25 }}>{challenge.question}</h1>

        {/* stack picture */}
        {challenge.stack !== null && (
          <div className="stars" style={styles.stackBox}>
            {challenge.stack.map((item, i) => (
              <div key={i} style={styles.blockRow}>
                <div style={{ ...styles.block, background: BLOCK_COLORS[i % BLOCK_COLORS.length] }}>
                  {item}
                </div>
                {i === 0 && <span style={styles.topLabel}>← top</span>}
              </div>
            ))}
          </div>
        )}

        {/* answers */}
        <div style={styles.answerGrid}>
          {challenge.answers.map((answer, i) => {
            const isWrong = wrongPicks.includes(i)
            const isRight = solved && i === challenge.correctIndex
            const faded = solved && !isRight

            let look = styles.answer
            if (isWrong) look = { ...look, ...styles.answerWrong }
            if (isRight) look = { ...look, ...styles.answerRight }
            if (faded) look = { ...look, opacity: 0.5 }

            return (
              <button
                key={i}
                style={look}
                disabled={isWrong || solved}
                onClick={() => pickAnswer(i)}
              >
                <span style={styles.letter}>{LETTERS[i]}</span>
                <span style={{ flex: 1 }}>{answer}</span>
                {isWrong && <span style={{ color: 'var(--wrong)', fontSize: 22 }}>×</span>}
                {isRight && <span style={{ color: 'var(--right)', fontSize: 22 }}>✓</span>}
              </button>
            )
          })}
        </div>

        {/* feedback boxes */}
        {!solved && wrongPicks.length > 0 && (
          <div style={{ ...styles.feedback, ...styles.feedbackWrong }}>
            <strong style={{ color: 'var(--wrong)' }}>Not quite. Try again!</strong>
            <p style={{ margin: 0 }}>{challenge.hint}</p>
          </div>
        )}

        {solved && (
          <div style={{ ...styles.feedback, ...styles.feedbackRight }}>
            <strong style={{ color: 'var(--right)' }}>Correct!</strong>
            <p style={{ margin: 0 }}>{challenge.explanation}</p>
            <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={nextQuestion}>
              {isLast ? 'Finish village' : 'Next question'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  topRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  card: {
    maxWidth: 860,
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  villagePill: { alignSelf: 'flex-start', background: 'var(--gold)', color: 'var(--shadow)' },
  stackBox: {
    backgroundColor: 'var(--bg)',
    borderRadius: 'var(--radius)',
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  blockRow: { position: 'relative', display: 'flex', alignItems: 'center' },
  block: {
    width: 180,
    height: 42,
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--shadow)',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 20,
  },
  topLabel: {
    position: 'absolute',
    left: '100%',
    marginLeft: 12,
    whiteSpace: 'nowrap',
    color: 'var(--gold)',
    fontWeight: 800,
  },
  answerGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  answer: {
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '8px 16px',
    background: 'var(--surface-2)',
    color: 'var(--text)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'var(--border)',
    borderRadius: 'var(--radius)',
    boxShadow: '0 4px 0 var(--shadow)',
    fontFamily: 'var(--font-body)',
    fontSize: 17,
    fontWeight: 700,
    textAlign: 'left',
    cursor: 'pointer',
  },
  answerWrong: { background: 'var(--wrong-bg)', borderColor: 'var(--wrong)', cursor: 'not-allowed' },
  answerRight: { background: 'var(--right-bg)', borderColor: 'var(--right)', cursor: 'default' },
  letter: {
    flexShrink: 0,
    width: 34,
    height: 34,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg)',
    border: '2px solid var(--border)',
    fontFamily: 'var(--font-display)',
  },
  feedback: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 20,
    borderRadius: 'var(--radius)',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  feedbackWrong: { background: 'var(--wrong-bg)', borderColor: 'var(--wrong)' },
  feedbackRight: { background: 'var(--right-bg)', borderColor: 'var(--right)' },
  clearedCard: {
    maxWidth: 560,
    width: '100%',
    margin: '40px auto 0',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    textAlign: 'center',
  },
}
