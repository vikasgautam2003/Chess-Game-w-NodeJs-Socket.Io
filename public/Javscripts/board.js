// public/Javscripts/Chess-Files/board.js
import { socket, playerRole } from './socket.js';

// map a piece object → Unicode
const pieceMap = {
  pw: '♙', pb: '♟',
  rw: '♖', rb: '♜',
  nw: '♘', nb: '♞',
  bw: '♗', bb: '♝',
  qw: '♕', qb: '♛',
  kw: '♔', kb: '♚'
};
function getPieceSymbol(piece) {
  return pieceMap[piece.type + piece.color] || '';
}

export function renderBoard(fen, role) {
     console.log('[board.js] renderBoard called, role=', role, 'fen=', fen);
  const chess = new Chess(fen);                     // global from UMD <script>
  const board = document.querySelector('.chessboard');
  if (!board) return console.error('No .chessboard in DOM');
  board.innerHTML = '';

  // exactly as your original, preserving orientation logic
  const currentBoard = chess.board();
  const rows = role === 'b' ? [...currentBoard].reverse() : currentBoard;

  rows.forEach((row, i) => {
    const rowIdx = role === 'b' ? 7 - i : i;
    const cols   = role === 'b' ? [...row].reverse() : row;

    cols.forEach((square, j) => {
      const colIdx = role === 'b' ? 7 - j : j;
      const squareDiv = document.createElement('div');
      squareDiv.className = `square ${(rowIdx + colIdx) % 2 === 0 ? 'light' : 'dark'}`;
      squareDiv.dataset.row = rowIdx;
      squareDiv.dataset.col = colIdx;

      if (square) {
        // **piece container exactly as before**
        const pieceDiv = document.createElement('div');
        pieceDiv.className = `piece ${square.color === 'w' ? 'white' : 'black'}`;
        pieceDiv.innerHTML = getPieceSymbol(square);

        if (role === square.color) {
          pieceDiv.setAttribute('draggable', true);
          pieceDiv.addEventListener('dragstart', e => {
            pieceDiv.classList.add('dragging');
            e.dataTransfer.setData('text/plain', '');
          });
          pieceDiv.addEventListener('dragend', () => {
            pieceDiv.classList.remove('dragging');
          });
        }

        squareDiv.appendChild(pieceDiv);
      }

      // drop handlers
      squareDiv.addEventListener('dragover', e => e.preventDefault());
      squareDiv.addEventListener('drop', e => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        if (!dragging) return;
        const from = String.fromCharCode(97 + parseInt(dragging.parentElement.dataset.col))
                   + (8 - parseInt(dragging.parentElement.dataset.row));
        const to   = String.fromCharCode(97 + colIdx)
                   + (8 - rowIdx);
        socket.emit('move', { from, to, promotion: 'q' });
      });

      board.appendChild(squareDiv);
    });
  });
}
