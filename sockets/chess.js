
const { Chess } = require('chess.js');
const games = {};

function setupSocket(io) {
  io.on('connection', (socket) => {
    socket.data.username = null;
    socket.data.role = null;
    socket.data.gameId = null;

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
      const gameId = Object.keys(games).find(id => games[id] === game);
      socket.data.role = 'b';
      socket.data.gameId = gameId;

      io.to(game.white).emit('opponentFound');
      io.to(game.black).emit('opponentFound');
      io.to(game.white).emit('playerRole', 'w');
      io.to(game.black).emit('playerRole', 'b');
    }

    socket.on('setName', ({ name, role }) => {
      const game = games[socket.data.gameId];
      if (!game) return;
      socket.data.username = name;
      if (role === 'w') game.names.white = name;
      else if (role === 'b') game.names.black = name;
      io.to(game.white).emit('updateNames', game.names);
      if (game.black) io.to(game.black).emit('updateNames', game.names);
    });

    socket.on('move', (move) => {
      const game = games[socket.data.gameId];
      if (!game) return;
      const chess = game.chess;
      const currentTurn = chess.turn();
      const isWhiteTurn = currentTurn === 'w';
      const isValidPlayer = (isWhiteTurn && socket.id === game.white) || (!isWhiteTurn && socket.id === game.black);

      if (!isValidPlayer) {
        socket.emit("invalidMove", "It's not your turn!");
        return;
      }

      let validMove;
      try {
        validMove = chess.move(move);
      } catch (err) {
        socket.emit("invalidMove", "Invalid move!");
        return;
      }

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

    socket.on("gameOver", ({ result, reason }) => {
      const game = games[socket.data.gameId];
      if (!game) return;
      io.to(game.white).emit("gameOver", { result, reason });
      if (game.black) io.to(game.black).emit("gameOver", { result, reason });
    });

    socket.on("chatMessage", ({ message }) => {
      const game = games[socket.data.gameId];
      if (!game || !message) return;
      const username = socket.data.username || "Guest";
      const chatData = { message, username };
      io.to(game.white).emit("chatMessage", chatData);
      if (game.black) io.to(game.black).emit("chatMessage", chatData);
    });

    socket.on("disconnect", () => {
      const gameId = socket.data.gameId;
      if (!gameId || !games[gameId]) return;
      const game = games[gameId];
      const opponentId = socket.id === game.white ? game.black : game.white;

      if (opponentId && io.sockets.sockets.get(opponentId)) {
        io.to(opponentId).emit("opponentLeft", {
          message: `${socket.data.username || "Your opponent"} has left the game. You win!`
        });
      }

      delete games[gameId];
    });
  });
}

module.exports = setupSocket;
