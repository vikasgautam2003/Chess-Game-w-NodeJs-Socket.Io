// public/Javscripts/Chess-Files/moveHistory.js
export function addMoveToHistory({ from, to }) {
  const list = document.getElementById('move-list');
  const li = document.createElement('li');
  li.textContent = `${from} → ${to}`;
  list.appendChild(li);
  list.scrollTop = list.scrollHeight;
}
