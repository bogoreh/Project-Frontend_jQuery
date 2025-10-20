import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

const MessageList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom with jQuery animation
    const $messagesEnd = $(messagesEndRef.current);
    $messagesEnd.parent().animate({
      scrollTop: $messagesEnd[0].offsetTop
    }, 500);

    // Highlight new messages
    $('.message-item:last-child').css({
      'background-color': '#f0f8ff',
      'transition': 'background-color 1s ease'
    }).delay(1000).queue(function(next) {
      $(this).css('background-color', '');
      next();
    });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message-item ${
            message.username === currentUser ? 'own-message' : 'other-message'
          }`}
        >
          <div className="message-header">
            <strong>{message.username}</strong>
            <span className="message-time">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <div className="message-content">{message.text}</div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;