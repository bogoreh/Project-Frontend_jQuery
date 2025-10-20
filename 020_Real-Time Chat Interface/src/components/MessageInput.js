import React, { useState } from 'react';
import $ from 'jquery';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      
      // jQuery input animation
      const $input = $('#message-input');
      $input.fadeOut(100).fadeIn(100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <textarea
          id="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          rows="2"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;