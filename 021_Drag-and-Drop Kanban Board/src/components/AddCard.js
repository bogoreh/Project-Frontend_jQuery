import React, { useState } from 'react';

const AddCard = ({ columnId, onAddCard }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assignee, setAssignee] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddCard(columnId, {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        priority,
        assignee: assignee.trim(),
        columnId
      });
      setTitle('');
      setDescription('');
      setPriority('medium');
      setAssignee('');
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <button 
        className="add-card-btn"
        onClick={() => setIsAdding(true)}
      >
        + Add Card
      </button>
    );
  }

  return (
    <form className="add-card-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
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
      <div className="form-actions">
        <button type="submit">Add</button>
        <button type="button" onClick={() => setIsAdding(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddCard;