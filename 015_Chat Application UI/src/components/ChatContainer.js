import React, { useState, useEffect } from 'react';
import Header from './Header';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { chatService } from '../services/chatService';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState(['John', 'Alice', 'Bob', 'You']);
  const [currentUser] = useState('You');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Load initial messages
    loadInitialMessages();
    
    // Set up message polling
    const interval = setInterval(() => {
      if (isConnected) {
        checkNewMessages();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const loadInitialMessages = async () => {
    try {
      const initialMessages = await chatService.getInitialMessages();
      setMessages(initialMessages);
    } catch (error) {
      console.error('Error loading initial messages:', error);
    }
  };

  const checkNewMessages = async () => {
    try {
      const newMessages = await chatService.getNewMessages(messages.length);
      if (newMessages.length > 0) {
        setMessages(prev => [...prev, ...newMessages]);
      }
    } catch (error) {
      console.error('Error checking new messages:', error);
    }
  };

  const handleSendMessage = async (text) => {
    const newMessage = {
      text,
      sender: currentUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Optimistic update
    setMessages(prev => [...prev, newMessage]);

    try {
      await chatService.sendMessage(newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      // You might want to show an error message to the user
    }
  };

  return (
    <div className="chat-container">
      <Header currentUser={currentUser} onlineUsers={users.length} />
      <div className="chat-content">
        <UserList users={users} />
        <div className="chat-main">
          <MessageList messages={messages} currentUser={currentUser} />
          <MessageInput onSendMessage={handleSendMessage} currentUser={currentUser} />
        </div>
      </div>
      <div className="connection-status">
        Status: <span className={isConnected ? 'connected' : 'disconnected'}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
    </div>
  );
};

export default ChatContainer;