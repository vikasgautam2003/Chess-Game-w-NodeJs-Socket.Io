const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const connectDB = require('./db');


const indexRouter = require('./routes/index');       
const setupSocket = require('./sockets/chess');      

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
connectDB();


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);


setupSocket(io);


server.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
