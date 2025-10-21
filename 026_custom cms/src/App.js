import React, { useState } from 'react';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('admin');

  return (
    <div className="App">
      <header className="app-header">
        <h1>Custom CMS</h1>
        <nav>
          <button 
            className={currentView === 'admin' ? 'active' : ''}
            onClick={() => setCurrentView('admin')}
          >
            Admin Panel
          </button>
        </nav>
      </header>
      
      <main>
        {currentView === 'admin' && <AdminPanel />}
      </main>
    </div>
  );
}

export default App;