const socket = io();
const chess = new Chess();
const board = document.querySelector('.chessboard');
const loader = document.getElementById('loader-overlay');
const loaderMessage = document.getElementById('loader-message');
const username = document.getElementById('player-username')?.value || 'Guest';
const chatBox = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-chat');

let playerRole, whiteTimer, blackTimer;
let whiteTime = 300, blackTime = 300;
let moveHistory = [];

sendBtn.addEventListener('click', () => {
  const msg = chatInput.value.trim();
  if (msg) {
    socket.emit('chatMessage', { message: msg, username });
    chatInput.value = '';
  }
});

chatInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendBtn.click();
});

socket.on('chatMessage', ({ message, username }) => {
  const d = document.createElement('div');
  d.textContent = `${username}: ${message}`;
  chatBox.appendChild(d);
  chatBox.scrollTop = chatBox.scrollHeight;
});

function showPopup(msg) {
  const popup = document.createElement('div');
  popup.className = 'fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white border-l-4 border-blue-500 text-blue-800 p-4 rounded shadow-lg min-w-[280px] max-w-sm';
  popup.innerHTML = `<div>${msg}</div><button onclick="this.parentElement.remove()">×</button>`;
  document.getElementById('popup-container').appendChild(popup);
  setTimeout(() => popup.remove(), 2000);
}

function showPopupWithButton(msg, btn, cb) {
  const p = document.createElement('div');
  p.className = 'fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] bg-white border-l-4 border-red-500 text-gray-800 p-4 rounded shadow-xl flex flex-col items-center max-w-sm w-full';
  p.innerHTML = `<div class="mb-3">${msg}</div><button class="bg-red-500 text-white px-4 py-2 rounded">${btn}</button>`;
  p.querySelector('button').onclick = () => { p.remove(); cb(); };
  document.getElementById('popup-container').appendChild(p);
}

function updateTimer(id, t) {
  document.getElementById(id).textContent = `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
}

function startWhite() {
  clearInterval(blackTimer);
  whiteTimer = setInterval(() => {
    whiteTime--;
    updateTimer('white-timer', whiteTime);
    if (whiteTime <= 0) {
      clearInterval(whiteTimer);
      socket.emit('gameOver', { result: '0-1', reason: 'White timed out' });
    }
  }, 1000);
}

function startBlack() {
  clearInterval(whiteTimer);
  blackTimer = setInterval(() => {
    blackTime--;
    updateTimer('black-timer', blackTime);
    if (blackTime <= 0) {
      clearInterval(blackTimer);
      socket.emit('gameOver', { result: '1-0', reason: 'Black timed out' });
    }
  }, 1000);
}

function getPieceSymbol(piece) {
  const map = {
    pw: '♙', pb: '♟', rw: '♖', rb: '♜',
    nw: '♘', nb: '♞', bw: '♗', bb: '♝',
    qw: '♕', qb: '♛', kw: '♔', kb: '♚'
  };
  return map[piece.type + piece.color] || '';
}

function renderBoard() {
  const currentBoard = chess.board();
  const rows = playerRole === 'b' ? [...currentBoard].reverse() : currentBoard;
  board.innerHTML = '';
  rows.forEach((row, i) => {
    const rowIdx = playerRole === 'b' ? 7 - i : i;
    const cols = playerRole === 'b' ? [...row].reverse() : row;
    cols.forEach((square, j) => {
      const colIdx = playerRole === 'b' ? 7 - j : j;
      const squareDiv = document.createElement('div');
      squareDiv.className = `square ${(rowIdx + colIdx) % 2 === 0 ? 'light' : 'dark'}`;
      squareDiv.dataset.row = rowIdx;
      squareDiv.dataset.col = colIdx;

      if (square) {
        const pieceDiv = document.createElement('div');
        pieceDiv.className = `piece ${square.color === 'w' ? 'white' : 'black'}`;
        pieceDiv.innerHTML = getPieceSymbol(square);

        if (playerRole === square.color) {
          pieceDiv.setAttribute('draggable', true);
          pieceDiv.addEventListener('dragstart', (e) => {
            pieceDiv.classList.add('dragging');
            e.dataTransfer.setData('text/plain', '');
          });
          pieceDiv.addEventListener('dragend', () => {
            pieceDiv.classList.remove('dragging');
          });
        }

        squareDiv.appendChild(pieceDiv);
      }

      squareDiv.addEventListener('dragover', e => e.preventDefault());
      squareDiv.addEventListener('drop', e => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        if (!dragging) return;
        const from = `${String.fromCharCode(97 + parseInt(dragging.parentElement.dataset.col))}${8 - parseInt(dragging.parentElement.dataset.row)}`;
        const to = `${String.fromCharCode(97 + colIdx)}${8 - rowIdx}`;
        socket.emit('move', { from, to, promotion: 'q' });
      });

      board.appendChild(squareDiv);
    });
  });
}

socket.on('waitingForOpponent', () => {
  loaderMessage.textContent = 'Finding an opponent...';
  loader.style.display = 'flex';
});

socket.on('playerRole', (role) => {
  playerRole = role;
  loader.style.display = 'flex';
  if (role === 'b') document.getElementById('game-container').classList.add('rotate-board');
  socket.emit('setName', { name: username, role });
});

socket.on('opponentFound', () => {
  loaderMessage.textContent = 'Paired!';
  setTimeout(() => {
    loader.style.display = 'none';
    renderBoard();
    showPopup("Game starts!");
  }, 1000);
});

socket.on('updateNames', ({ white, black }) => {
  document.getElementById('white-name').textContent = white || 'Waiting...';
  document.getElementById('black-name').textContent = black || 'Waiting...';
});

socket.on('boardState', (fen) => {
  chess.load(fen);
  renderBoard();
  chess.turn() === 'w' ? startWhite() : startBlack();
});

socket.on('move', (move) => {
  chess.move(move);
  moveHistory.push(move);
  renderBoard();
  const li = document.createElement('li');
  li.textContent = `${move.from} → ${move.to}`;
  document.getElementById('move-list').appendChild(li);
  document.getElementById('move-list').scrollTop = document.getElementById('move-list').scrollHeight;
});

socket.on('invalidMove', (msg) => showPopup(msg));

socket.on('gameOver', ({ result, reason }) => {
  clearInterval(whiteTimer);
  clearInterval(blackTimer);
  showPopup(`Game Over: ${result} – ${reason}`);
});

socket.on('opponentLeft', ({ message }) => {
  showPopupWithButton(message, "Return Home", () => {
    const lower = username.toLowerCase();
    window.location.href = lower.includes('guest') ? "/guest/home" : "/user/home";
  });
});



const toggleHistoryBtn = document.getElementById('toggle-history');
const toggleChatBtn = document.getElementById('toggle-chat');
const moveHistoryPanel = document.getElementById('move-history');
const chatPanel = document.getElementById('chat-container');

toggleHistoryBtn.addEventListener('click', () => {
  moveHistoryPanel.classList.toggle('modal');
});

toggleChatBtn.addEventListener('click', () => {
  chatPanel.classList.toggle('modal');
});


renderBoard();
updateTimer('white-timer', whiteTime);
updateTimer('black-timer', blackTime);
