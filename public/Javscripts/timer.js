// public/Javscripts/Chess-Files/timer.js
import { socket } from './socket.js';

let whiteInterval, blackInterval;
let whiteTime = 300, blackTime = 300;

// turnChar: 'w' or 'b' from FEN; role: 'w' or 'b'
export function startTimerFor(turnChar, role) {
  clearInterval(whiteInterval);
  clearInterval(blackInterval);

  const expire = () => {
    const result = turnChar === 'w' ? '0-1' : '1-0';
    const reason = turnChar === 'w' ? 'White timed out' : 'Black timed out';
    socket.emit('gameOver', { result, reason });
  };

  if (turnChar === 'w') {
    whiteInterval = setInterval(() => {
      whiteTime--;
      updateDisplay('white', whiteTime);
      if (whiteTime <= 0) {
        clearInterval(whiteInterval);
        expire();
      }
    }, 1000);
  } else {
    blackInterval = setInterval(() => {
      blackTime--;
      updateDisplay('black', blackTime);
      if (blackTime <= 0) {
        clearInterval(blackInterval);
        expire();
      }
    }, 1000);
  }
}

function updateDisplay(color, time) {
  const el = document.getElementById(`${color}-timer`);
  el.textContent = `${String(Math.floor(time/60)).padStart(2,'0')}:${String(time%60).padStart(2,'0')}`;
}

export function stopAllTimers() {
  clearInterval(whiteInterval);
  clearInterval(blackInterval);
}
