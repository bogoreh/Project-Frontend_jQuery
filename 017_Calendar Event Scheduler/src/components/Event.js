import React from 'react';

const Event = ({ event, onEdit, onDelete }) => {
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(event);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(event.id);
  };

  return (
    <div className="event" data-event-id={event.id}>
      <strong>{event.title}</strong>
      <div className="event-actions">
        <button onClick={handleEdit} style={{ backgroundColor: '#ffc107', color: 'black' }}>
          Edit
        </button>
        <button onClick={handleDelete} style={{ backgroundColor: '#dc3545', color: 'white' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Event;