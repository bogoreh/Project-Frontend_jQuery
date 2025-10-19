import React, { useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Kanban Board</h1>
        <p>Drag and drop tasks between columns</p>
      </header>
      <KanbanBoard />
    </div>
  );
}

export default App;