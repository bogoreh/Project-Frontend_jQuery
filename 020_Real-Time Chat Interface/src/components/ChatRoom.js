import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import { useChat } from '../hooks/useChat';
import '../styles/Chat.css';

const ChatRoom = () => {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const {
    messages,
    users,
    sendMessage,
    isConnected,
    joinRoom
  } = useChat();

  useEffect(() => {
    // jQuery animations for connection status
    const $status = $('#connection-status');
    if (isConnected) {
      $status.fadeIn().text('Connected').css('color', 'green');
    } else {
      $status.fadeIn().text('Disconnected').css('color', 'red');
    }
  }, [isConnected]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      joinRoom(username);
      setJoined(true);
      
      // jQuery animation for join effect
      $('.join-form').fadeOut(400, () => {
        $('.chat-container').fadeIn(400);
      });
    }
  };

  if (!joined) {
    return (
      <div className="join-form">
        <form onSubmit={handleJoin}>
          <h2>Join Chat Room</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Join Chat</button>
        </form>
      </div>
    );
  }

  return (
    <div className="chat-room">
      <div className="chat-header">
        <h2>Chat Room</h2>
        <div id="connection-status" className="connection-status"></div>
        <div className="user-info">Welcome, {username}!</div>
      </div>
      
      <div className="chat-container" style={{display: 'none'}}>
        <div className="chat-sidebar">
          <UserList users={users} />
        </div>
        
        <div className="chat-main">
          <MessageList messages={messages} currentUser={username} />
          <MessageInput onSendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;