import React from 'react';
import CharacterCounter from './components/CharacterCounter';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Character Counter</h1>
        <p>Track your text length in real-time!</p>
      </header>
      <main>
        <CharacterCounter />
      </main>
    </div>
  );
}

export default App;