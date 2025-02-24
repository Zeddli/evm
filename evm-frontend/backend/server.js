// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*', // adjust for production
    methods: ['GET', 'POST'],
  },
});

// Maintain an in-memory list of connected players and their scores
let players = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // When a player joins the lobby, store their info (for demo, use socket id as name)
  socket.on('join lobby', (playerData) => {
    players[socket.id] = {
      name: playerData.name || socket.id,
      score: 0, // initial score
    };
    // Broadcast updated lobby info
    io.emit('lobby update', players);
  });

  // Listen for score updates from battle events
  socket.on('update score', (data) => {
    if (players[socket.id]) {
      players[socket.id].score = data.score;
      io.emit('leaderboard update', players);
    }
  });

  // Chat message handling (existing)
  socket.on('chat message', (msg) => {
    console.log('Chat message received:', msg);
    socket.broadcast.emit('chat message', msg);
  });

  // Battle request handling (existing)
  socket.on('battle request', (data) => {
    console.log('Battle request received:', data);
    socket.broadcast.emit('battle request', data);
  });

  // When a user disconnects, remove them from the lobby
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    delete players[socket.id];
    io.emit('lobby update', players);
  });
});

const PORT = process.env.PORT || 3000; // use a port different from React if needed
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
