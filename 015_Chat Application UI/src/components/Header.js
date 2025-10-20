import React from 'react';

const Header = ({ currentUser, onlineUsers }) => {
  return (
    <div className="chat-header">
      <div className="header-content">
        <h2>Chat Application</h2>
        <div className="user-info">
          <span className="current-user">You: {currentUser}</span>
          <span className="online-count">Online: {onlineUsers}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;