
const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');
const loader = document.getElementById('loader-overlay');
const loaderMessage = document.getElementById('loader-message');
const username = document.getElementById('player-username')?.value || 'Guest';

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

let whiteTime = 5 * 60;
let blackTime = 5 * 60;
let whiteTimer, blackTimer;
let whiteName = "", blackName = "";
let moveHistory = [];

const updateTimerDisplay = (id, timeLeft) => {
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  document.getElementById(id).textContent = `${mins}:${secs}`;
};

const startWhiteTimer = () => {
  clearInterval(blackTimer);
  whiteTimer = setInterval(() => {
    whiteTime--;
    updateTimerDisplay('white-timer', whiteTime);
    if (whiteTime <= 0) {
      clearInterval(whiteTimer);
      socket.emit("gameOver", {
        fen: chess.fen(),
        whiteUsername: whiteName,
        blackUsername: blackName,
        result: "0-1",
        moves: moveHistory,
        reason: "White timed out"
      });
    }
  }, 1000);
};

const startBlackTimer = () => {
  clearInterval(whiteTimer);
  blackTimer = setInterval(() => {
    blackTime--;
    updateTimerDisplay('black-timer', blackTime);
    if (blackTime <= 0) {
      clearInterval(blackTimer);
      socket.emit("gameOver", {
        fen: chess.fen(),
        whiteUsername: whiteName,
        blackUsername: blackName,
        result: "1-0",
        moves: moveHistory,
        reason: "Black timed out"
      });
    }
  }, 1000);
};

const renderBoard = () => {
  const board = chess.board();
  boardElement.innerHTML = '';
  const rows = playerRole === 'b' ? [...board].reverse() : board;

  rows.forEach((row, rowIndex) => {
    const displayRow = playerRole === 'b' ? 7 - rowIndex : rowIndex;
    const cols = playerRole === 'b' ? [...row].reverse() : row;

    cols.forEach((square, colIndex) => {
      const displayCol = playerRole === 'b' ? 7 - colIndex : colIndex;
      const squareDiv = document.createElement('div');
      squareDiv.classList.add('square', (displayRow + displayCol) % 2 === 0 ? 'light' : 'dark');
      squareDiv.dataset.row = displayRow;
      squareDiv.dataset.col = displayCol;

      if (square) {
        const pieceDiv = document.createElement('div');
        pieceDiv.classList.add('piece', square.color === 'w' ? 'white' : 'black');
        pieceDiv.innerHTML = getPieceUnicode(square);
        const canDrag = playerRole === square.color;
        pieceDiv.draggable = canDrag;

        pieceDiv.addEventListener('dragstart', (e) => {
          if (!canDrag) return;
          draggedPiece = pieceDiv;
          sourceSquare = { row: displayRow, col: displayCol };
          e.dataTransfer.setData('text/plain', '');
        });

        pieceDiv.addEventListener('dragend', () => {
          draggedPiece = null;
          sourceSquare = null;
        });

        squareDiv.appendChild(pieceDiv);
      }

      squareDiv.addEventListener('dragover', (e) => e.preventDefault());

      squareDiv.addEventListener('drop', (e) => {
        e.preventDefault();
        if (!draggedPiece || !sourceSquare) return;
        const targetSquare = {
          row: parseInt(squareDiv.dataset.row),
          col: parseInt(squareDiv.dataset.col),
        };

        const move = {
          from: `${String.fromCharCode(97 + sourceSquare.col)}${8 - sourceSquare.row}`,
          to: `${String.fromCharCode(97 + targetSquare.col)}${8 - targetSquare.row}`,
          promotion: 'q',
        };

        socket.emit('move', move);
      });

      boardElement.appendChild(squareDiv);
    });
  });
};

const getPieceUnicode = (piece) => {
  const unicodes = {
    pw: '♙', pb: '♟',
    rw: '♖', rb: '♜',
    nw: '♘', nb: '♞',
    bw: '♗', bb: '♝',
    qw: '♕', qb: '♛',
    kw: '♔', kb: '♚'
  };
  return unicodes[piece.type + piece.color] || '';
};

socket.on('waitingForOpponent', () => {
  loaderMessage.textContent = 'Finding an opponent...';
  loader.style.display = 'flex';
});

socket.on('playerRole', (role) => {
  playerRole = role;
  loaderMessage.textContent = 'Finding an opponent...';
  loader.style.display = 'flex';
  if (role === 'b') {
    document.getElementById('game-container').classList.add('rotate-board');
  }
  socket.emit('setName', { name: username, role: playerRole });
});

socket.on('opponentFound', () => {
  loaderMessage.textContent = 'Paired!';
  setTimeout(() => {
    loader.style.display = 'none';
    renderBoard();
  }, 1000);
});

socket.on('spectatorRole', () => {
  playerRole = null;
  loader.style.display = 'none';
  renderBoard();
});

socket.on('updateNames', ({ white, black }) => {
  whiteName = white;
  blackName = black;
  document.getElementById('white-name').textContent = white || 'Waiting...';
  document.getElementById('black-name').textContent = black || 'Waiting...';
});

socket.on('boardState', (fen) => {
  chess.load(fen);
  renderBoard();
  const turn = chess.turn();
  if (turn === 'w') {
    clearInterval(blackTimer);
    startWhiteTimer();
  } else {
    clearInterval(whiteTimer);
    startBlackTimer();
  }
});

socket.on('move', (move) => {
  chess.move(move);
  moveHistory.push(move);
  renderBoard();
});

socket.on('invalidMove', (msg) => {
  alert(msg);
});

socket.on("gameOver", ({ result, reason }) => {
  clearInterval(whiteTimer);
  clearInterval(blackTimer);
  alert(`Game Over! ${result} - ${reason}`);
});

renderBoard();
updateTimerDisplay("white-timer", whiteTime);
updateTimerDisplay("black-timer", blackTime);
