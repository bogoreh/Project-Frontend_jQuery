import React from 'react';
import { jqueryValidators } from '../utils/validators';

const PasswordStrength = ({ password }) => {
  const strengthInfo = jqueryValidators.checkPasswordStrength(password);

  const getStrengthColor = (strength) => {
    const colors = ['#ff4757', '#ffa502', '#ffdd59', '#2ed573', '#1e90ff'];
    return colors[strength] || colors[0];
  };

  const getStrengthWidth = (strength) => {
    return `${(strength / 5) * 100}%`;
  };

  return (
    <div className="password-strength">
      <div className="strength-meter">
        <div 
          className="strength-bar"
          style={{
            width: getStrengthWidth(strengthInfo.strength),
            backgroundColor: getStrengthColor(strengthInfo.strength)
          }}
        ></div>
      </div>
      <div className="strength-info">
        <span>Strength: {strengthInfo.level}</span>
        {strengthInfo.messages.length > 0 && (
          <div className="strength-messages">
            {strengthInfo.messages.map((message, index) => (
              <div key={index} className="strength-message">
                • {message}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordStrength;