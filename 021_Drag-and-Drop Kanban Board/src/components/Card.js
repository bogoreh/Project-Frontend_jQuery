import React from 'react';

const Card = ({ card, onEdit, onDelete }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', card.id);
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderLeft: '4px solid #667eea',
    transition: 'all 0.3s ease',
    cursor: 'grab',
    marginBottom: '10px'
  };

  const cardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px'
  };

  const cardActionsStyle = {
    display: 'flex',
    gap: '5px'
  };

  const cardFooterStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.8rem'
  };

  const priorityStyle = {
    padding: '2px 8px',
    borderRadius: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    backgroundColor: 
      card.priority === 'high' ? '#ffebee' :
      card.priority === 'medium' ? '#fff3e0' : '#e8f5e8',
    color: 
      card.priority === 'high' ? '#c62828' :
      card.priority === 'medium' ? '#ef6c00' : '#2e7d32'
  };

  return (
    <div 
      style={cardStyle}
      draggable="true" 
      onDragStart={handleDragStart}
    >
      <div style={cardHeaderStyle}>
        <h4 style={{ margin: 0, color: '#333', marginRight: '10px', flex: 1 }}>{card.title}</h4>
        <div style={cardActionsStyle}>
          <button 
            onClick={() => onEdit(card)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px'
            }}
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(card.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px'
            }}
          >
            🗑️
          </button>
        </div>
      </div>
      <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.4', marginBottom: '10px' }}>
        {card.description}
      </p>
      <div style={cardFooterStyle}>
        <span style={priorityStyle}>
          {card.priority}
        </span>
        <span style={{ color: '#666', fontStyle: 'italic' }}>{card.assignee}</span>
      </div>
    </div>
  );
};

export default Card;