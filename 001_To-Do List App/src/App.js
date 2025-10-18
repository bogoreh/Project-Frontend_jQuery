import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './styles/App.css';

function App() {
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date().toLocaleString()
    };
    setTodos([...todos, newTodo]);
    
    // jQuery animation for new task
    $('.todo-item:last').hide().fadeIn(500);
  };

  const deleteTodo = (id) => {
    // jQuery animation before removal
    $(`#todo-${id}`).fadeOut(300, () => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));

    // jQuery animation for completion
    const todoElement = $(`#todo-${id}`);
    if (todoElement.hasClass('completed')) {
      todoElement.removeClass('completed').addClass('pending');
    } else {
      todoElement.removeClass('pending').addClass('completed');
    }
  };

  const clearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    
    // jQuery animation for clearing completed tasks
    completedTodos.forEach(todo => {
      $(`#todo-${todo.id}`).fadeOut(300);
    });

    setTimeout(() => {
      setTodos(todos.filter(todo => !todo.completed));
    }, 300);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Todo List App</h1>
          <p>Manage your tasks efficiently</p>
        </header>
        
        <TodoForm onAdd={addTodo} />
        
        <TodoList 
          todos={todos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
        />
        
        {todos.some(todo => todo.completed) && (
          <button 
            className="clear-completed-btn"
            onClick={clearCompleted}
          >
            Clear Completed
          </button>
        )}
        
        <div className="stats">
          <p>
            Total: {todos.length} | 
            Completed: {todos.filter(todo => todo.completed).length} | 
            Pending: {todos.filter(todo => !todo.completed).length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;