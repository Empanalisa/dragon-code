import { useState } from 'react';
import { IslandScene } from './IslandScene.jsx';

const LETTERS = ['A', 'B', 'C', 'D'];
const EMPTY = { question: '', answers: ['', '', '', ''], correctIndex: null, hint: '', explanation: '' };

// My Island: your own land with your dragons, plus your own study questions.
export function MyIsland({ dragons, island, onIslandChange, questions, onAdd, onDelete, onPractice, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  function update(field, value) {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: undefined });
    setSaved(false);
  }

  function updateAnswer(i, value) {
    const answers = [...form.answers];
    answers[i] = value;
    setForm({ ...form, answers });
    setErrors({ ...errors, answers: undefined });
    setSaved(false);
  }

  function save(e) {
    e.preventDefault();
    const found = {};
    if (!form.question.trim()) found.question = 'Write the question.';
    if (form.answers.some((a) => !a.trim())) found.answers = 'Fill in all 4 answers.';
    if (form.correctIndex === null) found.correctIndex = 'Choose which answer is right.';
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const right = form.answers[form.correctIndex].trim();
    onAdd({
      id: 'my-' + Date.now(),
      question: form.question.trim(),
      answers: form.answers.map((a) => a.trim()),
      correctIndex: form.correctIndex,
      hint: form.hint.trim() || 'Read the question again slowly. Which answer fits every part of it?',
      explanation: form.explanation.trim() || `The right answer is "${right}".`,
      stack: null,
    });
    setForm(EMPTY);
    setSaved(true);
  }

  return (
    <main className="screen island">
      <div className="tower-top-row">
        <button className="btn btn-secondary" onClick={onClose}>← Practice</button>
      </div>
      <div>
        <h1 className="screen-title">My Island</h1>
        <p className="muted screen-subtitle">Your dragons live here. Decorate it, and write your own study questions below.</p>
      </div>

      <IslandScene dragons={dragons} island={island} onChange={onIslandChange} />

      <h2 style={{ fontSize: 28, marginTop: 12 }}>Study questions</h2>

      <div className="island-grid">
        {/* Write a question */}
        <form className="card island-form" onSubmit={save} noValidate>
          <h2 style={{ fontSize: 24 }}>Write a question</h2>

          <label className="field">
            <span className="field-label">Question</span>
            <textarea
              rows="3"
              value={form.question}
              onChange={(e) => update('question', e.target.value)}
              placeholder="e.g. What does peek() return?"
            />
            {errors.question && <span className="field-error">{errors.question}</span>}
          </label>

          <fieldset className="field">
            <legend className="field-label">Answers (pick the right one)</legend>
            {form.answers.map((answer, i) => (
              <div key={i} className="answer-row">
                <input
                  type="radio"
                  name="correct"
                  id={`correct-${i}`}
                  checked={form.correctIndex === i}
                  onChange={() => update('correctIndex', i)}
                />
                <label htmlFor={`correct-${i}`} className="answer-letter">{LETTERS[i]}</label>
                <input
                  type="text"
                  aria-label={`Answer ${LETTERS[i]}`}
                  value={answer}
                  onChange={(e) => updateAnswer(i, e.target.value)}
                />
              </div>
            ))}
            {errors.answers && <span className="field-error">{errors.answers}</span>}
            {errors.correctIndex && <span className="field-error">{errors.correctIndex}</span>}
          </fieldset>

          <label className="field">
            <span className="field-label">Hint (optional)</span>
            <input type="text" value={form.hint} onChange={(e) => update('hint', e.target.value)} />
          </label>

          <label className="field">
            <span className="field-label">Explanation (optional)</span>
            <input type="text" value={form.explanation} onChange={(e) => update('explanation', e.target.value)} />
          </label>

          <button type="submit" className="btn btn-primary">Add question</button>
          {saved && <span style={{ color: 'var(--right)', fontWeight: 800 }}>Saved to your island!</span>}
        </form>

        {/* Saved questions */}
        <section className="card island-list">
          <h2 style={{ fontSize: 24 }}>Your questions ({questions.length})</h2>
          {questions.length === 0 ? (
            <p className="muted" style={{ margin: 0 }}>No questions yet. Write your first one on the left.</p>
          ) : (
            <ul>
              {questions.map((q) => (
                <li key={q.id}>
                  <div>
                    <strong>{q.question}</strong>
                    <span className="muted"> Answer: {q.answers[q.correctIndex]}</span>
                  </div>
                  <button
                    className="link-button"
                    onClick={() => {
                      if (window.confirm('Delete this question?')) onDelete(q.id);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button className="btn btn-primary" onClick={onPractice} disabled={questions.length === 0}>
            Practice my questions
          </button>
        </section>
      </div>
    </main>
  );
}
