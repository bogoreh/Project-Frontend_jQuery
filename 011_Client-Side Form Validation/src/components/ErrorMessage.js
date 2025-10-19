import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <span className="error-message">
      {message}
    </span>
  );
};

export default ErrorMessage;