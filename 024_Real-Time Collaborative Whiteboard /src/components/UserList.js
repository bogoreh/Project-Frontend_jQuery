import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

const UserList = () => {
  const { users } = useWebSocket();

  return (
    <div className="user-list">
      <h3>Online Users ({users.length})</h3>
      {users.map((user, index) => (
        <div key={index} className="user-item">
          User {user.id}
        </div>
      ))}
    </div>
  );
};

export default UserList;