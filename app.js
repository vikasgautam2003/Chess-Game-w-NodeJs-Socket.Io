const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');

const setupSocket = require('./sockets/chess');
const homepageRouter = require('./routes/home');
const guestRouter = require('./routes/guest-games');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const decodeToken = require('./middlewares/decodeToken.js');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


connectDB();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(decodeToken);

app.use('/', homepageRouter);
app.use('/guest', guestRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);


setupSocket(io);


server.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
