import React, { useState } from 'react';
import Column from './Column';
import { useLocalStorage } from '../hooks/useLocalStorage';

const KanbanBoard = () => {
  const [columns, setColumns] = useLocalStorage('kanban-columns', [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' }
  ]);

  const [cards, setCards] = useLocalStorage('kanban-cards', []);
  const [editingCard, setEditingCard] = useState(null);

  const handleCardMove = (cardId, newColumnId) => {
    setCards(prevCards => 
      prevCards.map(card =>
        card.id === cardId ? { ...card, columnId: newColumnId } : card
      )
    );
  };

  const handleAddCard = (columnId, newCard) => {
    setCards(prevCards => [...prevCards, newCard]);
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
  };

  const handleUpdateCard = (updatedCard) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === updatedCard.id ? updatedCard : card
      )
    );
    setEditingCard(null);
  };

  const handleDeleteCard = (cardId) => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
  };

  const getCardsByColumn = (columnId) => {
    return cards.filter(card => card.columnId === columnId);
  };

  return (
    <div className="kanban-board">
      {columns.map(column => (
        <Column
          key={column.id}
          column={column}
          cards={getCardsByColumn(column.id)}
          onCardMove={handleCardMove}
          onAddCard={handleAddCard}
          onEditCard={handleEditCard}
          onDeleteCard={handleDeleteCard}
        />
      ))}
      
      {editingCard && (
        <EditCardModal
          card={editingCard}
          onUpdate={handleUpdateCard}
          onCancel={() => setEditingCard(null)}
        />
      )}
    </div>
  );
};

// Modal component for editing cards
const EditCardModal = ({ card, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [priority, setPriority] = useState(card.priority);
  const [assignee, setAssignee] = useState(card.assignee);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...card,
      title,
      description,
      priority,
      assignee
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Card</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="text"
            placeholder="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KanbanBoard;