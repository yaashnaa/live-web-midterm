const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('code-update', (data) => {
    socket.broadcast.emit('code-update', data);
    io.sockets.emit(data)
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  socket.on('reconnect', (attemptNumber) => {
    console.log(`Reconnected after ${attemptNumber} attempts`);
  });
});


server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
