const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

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

socket.on('playerRole', (role) => {
    playerRole = role;
    renderBoard();
});

socket.on('spectatorRole', () => {
    playerRole = null;
    renderBoard();
});

socket.on('boardState', (fen) => {
    chess.load(fen);
    renderBoard();
});

socket.on('invalidMove', (msg) => {
    alert(msg);
});

// Initial render
renderBoard();
