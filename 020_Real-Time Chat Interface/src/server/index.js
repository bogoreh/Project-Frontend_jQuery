const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Socket.io setup with CORS
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store connected users
const users = new Map();
const messages = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (username) => {
    // Store user information
    users.set(socket.id, username);
    
    // Notify others about new user
    socket.broadcast.emit('message', {
      username: 'System',
      text: `${username} joined the chat`,
      timestamp: new Date()
    });

    // Send current users list to all clients
    io.emit('userList', Array.from(users.values()));
    
    // Send message history to the new user
    socket.emit('messageHistory', messages.slice(-50));
  });

  socket.on('sendMessage', (text) => {
    const username = users.get(socket.id);
    if (username) {
      const message = {
        username,
        text,
        timestamp: new Date()
      };
      
      // Store message
      messages.push(message);
      
      // Broadcast to all clients
      io.emit('message', message);
    }
  });

  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    if (username) {
      users.delete(socket.id);
      
      // Notify others about user leaving
      socket.broadcast.emit('message', {
        username: 'System',
        text: `${username} left the chat`,
        timestamp: new Date()
      });

      // Update users list
      io.emit('userList', Array.from(users.values()));
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});