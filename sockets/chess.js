

// const { Chess } = require('chess.js');
// const chess = new Chess();

// let players = {};
// let playerNames = { white: '', black: '' };

// function setupSocket(io) {
//   io.on('connection', (socket) => {
//     console.log('New connection:', socket.id);

//     if (!players.white) {
//       players.white = socket.id;
//       socket.emit('playerRole', 'w');
//       socket.emit('waitingForOpponent');
//     } else if (!players.black) {
//       players.black = socket.id;
//       socket.emit('playerRole', 'b');
//       io.to(players.white).emit('opponentFound');
//       io.to(players.black).emit('opponentFound');
//     } else {
//       socket.emit('spectatorRole');
//     }

//     socket.on('setName', ({ name, role }) => {
//       if (role === 'w') playerNames.white = name;
//       else if (role === 'b') playerNames.black = name;
//       io.emit('updateNames', playerNames);
//     });

//     socket.on("move", (move) => {
//       try {
//         if (chess.turn() === 'w' && socket.id !== players.white) {
//           socket.emit("invalidMove", "It's White's turn!");
//           return;
//         }
//         if (chess.turn() === 'b' && socket.id !== players.black) {
//           socket.emit("invalidMove", "It's Black's turn!");
//           return;
//         }

//         const validMove = chess.move(move);
//         if (validMove) {
//           io.emit("move", move);
//           io.emit("boardState", chess.fen());
//         } else {
//           socket.emit("invalidMove", "Invalid move!");
//         }
//       } catch (err) {
//         console.error("Move error:", err.message);
//         socket.emit("invalidMove", "Server error: Invalid move.");
//       }
//     });

//     socket.on("disconnect", () => {
//       if (socket.id === players.white) delete players.white;
//       if (socket.id === players.black) delete players.black;
//       playerNames = { white: '', black: '' };
//       io.emit('updateNames', playerNames);
//     });
//   });
// }

// module.exports = setupSocket;


const { Chess } = require('chess.js');
const chess = new Chess();

let players = {};
let playerNames = { white: '', black: '' };

function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    if (!players.white) {
      players.white = socket.id;
      socket.emit('playerRole', 'w');
      socket.emit('waitingForOpponent');
    } else if (!players.black) {
      players.black = socket.id;
      socket.emit('playerRole', 'b');
      io.to(players.white).emit('opponentFound');
      io.to(players.black).emit('opponentFound');
    } else {
      socket.emit('spectatorRole');
    }

    socket.on('setName', ({ name, role }) => {
      if (role === 'w') playerNames.white = name;
      else if (role === 'b') playerNames.black = name;
      io.emit('updateNames', playerNames);
    });

    socket.on("move", (move) => {
      try {
        if (chess.turn() === 'w' && socket.id !== players.white) {
          socket.emit("invalidMove", "It's White's turn!");
          return;
        }
        if (chess.turn() === 'b' && socket.id !== players.black) {
          socket.emit("invalidMove", "It's Black's turn!");
          return;
        }

        const validMove = chess.move(move);
        if (validMove) {
          io.emit("move", move);
          io.emit("boardState", chess.fen());

          // ✅ Check for checkmate
          if (chess.isCheckmate()) {
            const winner = chess.turn() === 'w' ? playerNames.black : playerNames.white;
            const winnerColor = chess.turn() === 'w' ? 'Black' : 'White';

            io.emit("gameOver", {
              result: `${winnerColor} (${winner}) wins`,
              reason: "Checkmate"
            });
          }
        } else {
          socket.emit("invalidMove", "Invalid move!");
        }
      } catch (err) {
        console.error("Move error:", err.message);
        socket.emit("invalidMove", "Server error: Invalid move.");
      }
    });

    socket.on("disconnect", () => {
      if (socket.id === players.white) delete players.white;
      if (socket.id === players.black) delete players.black;
      playerNames = { white: '', black: '' };
      io.emit('updateNames', playerNames);
    });
  });
}

module.exports = setupSocket;
