import React from 'react';
import KanbanBoard from './components/KanbanBoard';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Drag & Drop Kanban Board</h1>
        <p>Organize your tasks efficiently</p>
      </header>
      <main>
        <KanbanBoard />
      </main>
    </div>
  );
}

export default App;