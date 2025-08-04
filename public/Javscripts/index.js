import { initSocket } from './socket.js';
import { renderBoard } from './board.js';
import { setupChat, appendChatMessage } from './chat.js';
import { setupToggles } from './uiToggles.js';
import { showPopup, showPopupWithButton } from './popups.js';
import { startTimerFor, stopAllTimers } from './timer.js';
import { addMoveToHistory } from './moveHistory.js';

console.log('[index.js] module loaded');

let myRole;

document.addEventListener('DOMContentLoaded', () => {
  initSocket({
    onWaiting: () => {
      console.log('[index.js] onWaiting');
      document.getElementById('loader-overlay').style.display = 'flex';
    },

    onRoleSet: role => {
      console.log('[index.js] onRoleSet:', role);
      myRole = role;

      document.getElementById('loader-overlay').style.display = 'flex';
      if (role === 'b') {
        document.getElementById('game-container').classList.add('rotate-board');
      }

      // ✅ Draw the board immediately on role assignment
      const startFen = new Chess().fen(); // global from <script src="chess.js">
      renderBoard(startFen, role);
    },

    onGameStart: () => {
      console.log('[index.js] onGameStart');
      const overlay = document.getElementById('loader-overlay');
      const message = document.getElementById('loader-message');

      message.textContent = 'Paired!';
      setTimeout(() => {
        overlay.style.display = 'none';

        // Already rendered once in onRoleSet, but you may re-render here if needed
        showPopup('Game starts!');
      }, 1000);
    },

    onNamesUpdate: ({ white, black }) => {
      console.log('[index.js] onNamesUpdate', white, black);
      document.getElementById('white-name').textContent = white || 'Waiting...';
      document.getElementById('black-name').textContent = black || 'Waiting...';
    },

    onBoardState: fen => {
      console.log('[index.js] onBoardState callback got FEN:', fen);
      renderBoard(fen, myRole);
      startTimerFor(fen.split(' ')[1], myRole);
    },

    onMove: move => {
      console.log('[index.js] onMove', move);
      addMoveToHistory(move);
    },

    onInvalid: msg => {
      console.log('[index.js] onInvalid', msg);
      showPopup(msg);
    },

    onGameOver: data => {
      console.log('[index.js] onGameOver', data);
      stopAllTimers();
      showPopup(`Game Over: ${data.result} – ${data.reason}`);
    },

    onChat: data => {
      console.log('[index.js] onChat', data);
      appendChatMessage(data);
    },

    onOpponentLeft: data => {
      console.log('[index.js] onOpponentLeft', data);
      showPopupWithButton(
        data.message,
        'Return Home',
        () => {
          const uname = document.getElementById('player-username').value || 'guest';
          window.location.href = uname.toLowerCase().includes('guest')
            ? '/guest/home'
            : '/user/home';
        }
      );
    }
  });

  setupChat();
  setupToggles();
});
