


const { Chess } = require('chess.js');

const games = {};

function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('New connection:', socket.id);
    socket.data.username = null;
    socket.data.role = null;
    socket.data.gameId = null;

    // Matchmaking
    let game = Object.values(games).find(g => !g.black);
    if (!game) {
      const newGameId = socket.id;
      games[newGameId] = {
        white: socket.id,
        black: null,
        chess: new Chess(),
        names: { white: '', black: '' }
      };
      socket.data.role = 'w';
      socket.data.gameId = newGameId;
      socket.emit('playerRole', 'w');
      socket.emit('waitingForOpponent');
    } else {
      game.black = socket.id;
      socket.data.role = 'b';
      socket.data.gameId = Object.keys(games).find(id => games[id] === game);
      io.to(game.white).emit('opponentFound');
      io.to(game.black).emit('opponentFound');
      io.to(game.white).emit('playerRole', 'w');
      io.to(game.black).emit('playerRole', 'b');
    }

    // Set username
    socket.on('setName', ({ name, role }) => {
      const game = games[socket.data.gameId];
      if (!game) return;
      socket.data.username = name;
      if (role === 'w') game.names.white = name;
      else if (role === 'b') game.names.black = name;
      io.to(game.white).emit('updateNames', game.names);
      if (game.black) io.to(game.black).emit('updateNames', game.names);
    });

    // Handle moves
    socket.on("move", (move) => {
      const game = games[socket.data.gameId];
      if (!game) return;
      const chess = game.chess;

      const currentTurn = chess.turn();
      if ((currentTurn === 'w' && socket.id !== game.white) ||
          (currentTurn === 'b' && socket.id !== game.black)) {
        socket.emit("invalidMove", "It's not your turn!");
        return;
      }

      const validMove = chess.move(move);
      if (validMove) {
        io.to(game.white).emit("move", move);
        io.to(game.black).emit("move", move);
        io.to(game.white).emit("boardState", chess.fen());
        io.to(game.black).emit("boardState", chess.fen());

        if (chess.isCheckmate()) {
          const winnerColor = currentTurn === 'w' ? 'Black' : 'White';
          const winnerName = currentTurn === 'w' ? game.names.black : game.names.white;
          io.to(game.white).emit("gameOver", {
            result: `${winnerColor} (${winnerName}) wins`,
            reason: "Checkmate"
          });
          io.to(game.black).emit("gameOver", {
            result: `${winnerColor} (${winnerName}) wins`,
            reason: "Checkmate"
          });
        }
      } else {
        socket.emit("invalidMove", "Invalid move!");
      }
    });

    socket.on("disconnect", () => {
      const gameId = socket.data.gameId;
      if (!gameId || !games[gameId]) return;
      const game = games[gameId];

      if (socket.id === game.white || socket.id === game.black) {
        io.to(game.white).emit('updateNames', { white: '', black: '' });
        io.to(game.black).emit('updateNames', { white: '', black: '' });
        delete games[gameId];
      }
    });
  });
}

module.exports = setupSocket;

