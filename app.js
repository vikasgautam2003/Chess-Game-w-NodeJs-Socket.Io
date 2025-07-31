const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { Chess } = require('chess.js');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const chess = new Chess();
let players = {};

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title: "Chess Game" });
});

io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    if (!players.white) {
        players.white = socket.id;
        socket.emit('playerRole', 'w');
    } else if (!players.black) {
        players.black = socket.id;
        socket.emit('playerRole', 'b');
    } else {
        socket.emit('spectatorRole');
    }

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
    });
});

server.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
