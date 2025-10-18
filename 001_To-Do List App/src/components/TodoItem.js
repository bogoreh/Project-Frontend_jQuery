import React from 'react';
import $ from 'jquery';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleMouseEnter = () => {
    $(`#todo-${todo.id}`).addClass('hover');
  };

  const handleMouseLeave = () => {
    $(`#todo-${todo.id}`).removeClass('hover');
  };

  return (
    <div
      id={`todo-${todo.id}`}
      className={`todo-item ${todo.completed ? 'completed' : 'pending'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-checkbox"
        />
        <div className="todo-text">
          <span className={todo.completed ? 'completed-text' : ''}>
            {todo.text}
          </span>
          <small className="todo-date">{todo.createdAt}</small>
        </div>
      </div>
      <button
        className="delete-btn"
        onClick={handleDelete}
        title="Delete task"
      >
        ×
      </button>
    </div>
  );
};

export default TodoItem;