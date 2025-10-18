import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onToggle }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;