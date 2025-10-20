import React from 'react';

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      <h3>Online Users</h3>
      <div className="users-container">
        {users.map((user, index) => (
          <div key={index} className="user-item">
            <span className="status-dot"></span>
            <span className="username">{user}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;