import io from 'socket.io-client';

let socket;

export const initializeSocket = () => {
  socket = io('http://localhost:3001', {
    transports: ['websocket', 'polling']
  });
  return socket;
};

export const getSocket = () => {
  return socket;
};