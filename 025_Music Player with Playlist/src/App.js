import React from 'react';
import AudioPlayer from './components/AudioPlayer';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🎵 React Music Player</h1>
        <p>With jQuery Enhancements</p>
      </header>
      <main>
        <AudioPlayer />
      </main>
    </div>
  );
}

export default App;