import React from 'react';
import Card from './Card';
import AddCard from './AddCard';

const Column = ({ column, cards, onCardMove, onAddCard, onEditCard, onDeleteCard }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    onCardMove(cardId, column.id);
  };

  // jQuery example for smooth animations - with proper check
  const handleColumnClick = (e) => {
    // Check if jQuery is available
    if (typeof window !== 'undefined' && window.jQuery) {
      const $ = window.jQuery;
      $(e.currentTarget).toggleClass('column-highlight');
      
      // Remove highlight after 1 second
      setTimeout(() => {
        $(e.currentTarget).removeClass('column-highlight');
      }, 1000);
    }
  };

  const columnStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '20px',
    minWidth: '300px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease'
  };

  const columnHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #e0e0e0'
  };

  const cardCountStyle = {
    background: '#667eea',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.9rem'
  };

  return (
    <div 
      style={columnStyle}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleColumnClick}
    >
      <div style={columnHeaderStyle}>
        <h3 style={{ color: '#333', fontSize: '1.3rem', margin: 0 }}>{column.title}</h3>
        <span style={cardCountStyle}>{cards.length}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', minHeight: '100px' }}>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onEdit={onEditCard}
            onDelete={onDeleteCard}
          />
        ))}
      </div>
      <AddCard columnId={column.id} onAddCard={onAddCard} />
    </div>
  );
};

export default Column;