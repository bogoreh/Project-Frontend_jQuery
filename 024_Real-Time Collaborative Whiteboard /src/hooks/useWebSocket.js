import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext();

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [drawingData, setDrawingData] = useState([]);

  useEffect(() => {
    // For development without backend, we'll use a mock socket
    const newSocket = io('http://localhost:3001', {
      transports: ['websocket']
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('userJoined', (userList) => {
      setUsers(userList);
    });

    newSocket.on('userLeft', (userList) => {
      setUsers(userList);
    });

    newSocket.on('drawing', (data) => {
      setDrawingData(prev => [...prev, data]);
    });

    newSocket.on('clearCanvas', () => {
      setDrawingData([]);
    });

    newSocket.on('error', (error) => {
      console.log('WebSocket error:', error);
    });

    setSocket(newSocket);

    // Mock socket for development without backend
    if (process.env.NODE_ENV === 'development') {
      const mockSocket = {
        emit: (event, data) => {
          console.log('Mock socket emit:', event, data);
          if (event === 'draw') {
            // Simulate receiving the drawing data
            setTimeout(() => {
              setDrawingData(prev => [...prev, data]);
            }, 100);
          }
        },
        on: (event, callback) => {
          console.log('Mock socket on:', event);
        },
        disconnect: () => {}
      };
      
      // Use mock socket if real connection fails
      setTimeout(() => {
        if (!newSocket.connected) {
          console.log('Using mock socket for development');
          setSocket(mockSocket);
        }
      }, 2000);
    }

    return () => newSocket.close();
  }, []);

  const sendDrawing = (data) => {
    if (socket) {
      socket.emit('draw', data);
      // Also add to local state immediately for better responsiveness
      setDrawingData(prev => [...prev, data]);
    }
  };

  const clearCanvas = () => {
    if (socket) {
      socket.emit('clear');
    }
    setDrawingData([]);
  };

  const value = {
    socket,
    users,
    drawingData,
    sendDrawing,
    clearCanvas
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};