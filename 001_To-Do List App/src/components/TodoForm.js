import React, { useState } from 'react';
import $ from 'jquery';

const TodoForm = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
      
      // jQuery animation for form submission
      $('.todo-form').animate({ marginTop: '10px' }, 100)
                     .animate({ marginTop: '20px' }, 100);
    } else {
      // jQuery shake animation for empty input
      $('.todo-input').effect('shake', { distance: 5 }, 300);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="todo-input"
          placeholder="Enter a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="add-btn">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;