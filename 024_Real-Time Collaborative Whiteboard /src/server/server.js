const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let users = [];
let drawingHistory = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  const newUser = { id: socket.id, name: `User${users.length + 1}` };
  users.push(newUser);
  
  // Send current drawing history to new user
  socket.emit('drawingHistory', drawingHistory);
  
  // Notify all users about the new user
  io.emit('userJoined', users);

  socket.on('draw', (data) => {
    // Add to history
    drawingHistory.push(data);
    // Keep only last 1000 drawings to prevent memory issues
    if (drawingHistory.length > 1000) {
      drawingHistory = drawingHistory.slice(-500);
    }
    // Broadcast to all other users
    socket.broadcast.emit('drawing', data);
  });

  socket.on('clear', () => {
    drawingHistory = [];
    socket.broadcast.emit('clearCanvas');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    users = users.filter(user => user.id !== socket.id);
    io.emit('userLeft', users);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    users: users.length,
    drawings: drawingHistory.length 
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});