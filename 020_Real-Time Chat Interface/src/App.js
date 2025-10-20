import React from 'react';
import ChatRoom from './components/ChatRoom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Real-Time Chat</h1>
      </header>
      <main>
        <ChatRoom />
      </main>
    </div>
  );
}

export default App;