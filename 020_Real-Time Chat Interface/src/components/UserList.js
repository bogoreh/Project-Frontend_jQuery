import React, { useEffect } from 'react';
import $ from 'jquery';

const UserList = ({ users }) => {
  useEffect(() => {
    // jQuery animations for user list updates
    $('.user-item').hide().fadeIn(600);
    
    // Pulse animation for new users
    $('.user-item:last-child').css({
      'background-color': '#e8f5e8'
    }).delay(800).queue(function(next) {
      $(this).css('background-color', '');
      next();
    });
  }, [users]);

  return (
    <div className="user-list">
      <h3>Online Users ({users.length})</h3>
      <div className="users-container">
        {users.map((user, index) => (
          <div key={index} className="user-item">
            <span className="user-status"></span>
            {user}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;