// Saves the player's progress in this browser, so refreshing the page doesn't wipe it.
const KEY = 'code-and-conquer-save';

export function loadSave() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || null;
  } catch {
    return null; // no save yet, or the browser blocks storage
  }
}

export function writeSave(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // storage full or blocked: the game still works, it just won't remember
  }
}

export function clearSave() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // nothing to clear
  }
}

// Today's date as "2026-11-18". daysFromToday = -1 gives yesterday.
export function dayString(daysFromToday = 0) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  return d.toLocaleDateString('en-CA');
}
