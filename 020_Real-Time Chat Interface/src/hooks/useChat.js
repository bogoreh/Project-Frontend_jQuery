import { useState, useEffect, useCallback } from 'react';
import { initializeSocket, getSocket } from '../utils/socket';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = initializeSocket();

    const handleConnect = () => {
      setIsConnected(true);
      console.log('Connected to server');
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    };

    const handleMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };

    const handleUserList = (userList) => {
      setUsers(userList);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('message', handleMessage);
    socket.on('userList', handleUserList);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('message', handleMessage);
      socket.off('userList', handleUserList);
      socket.disconnect();
    };
  }, []);

  const sendMessage = useCallback((text) => {
    const socket = getSocket();
    if (socket && isConnected) {
      socket.emit('sendMessage', text);
    }
  }, [isConnected]);

  const joinRoom = useCallback((username) => {
    const socket = getSocket();
    if (socket) {
      socket.emit('join', username);
    }
  }, []);

  return {
    messages,
    users,
    sendMessage,
    joinRoom,
    isConnected
  };
};