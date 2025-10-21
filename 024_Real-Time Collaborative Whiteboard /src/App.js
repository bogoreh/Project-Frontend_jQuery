import React, { useState } from 'react';
import Whiteboard from './components/Whiteboard';
import Toolbar from './components/Toolbar';
import UserList from './components/UserList';
import { WebSocketProvider } from './hooks/useWebSocket';
import './App.css';

function App() {
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState('brush');

  return (
    <WebSocketProvider>
      <div className="app">
        <header className="app-header">
          <h1>Collaborative Whiteboard</h1>
        </header>
        <div className="app-container">
          <Toolbar
            color={color}
            setColor={setColor}
            brushSize={brushSize}
            setBrushSize={setBrushSize}
            tool={tool}
            setTool={setTool}
          />
          <div className="main-content">
            <Whiteboard
              color={color}
              brushSize={brushSize}
              tool={tool}
            />
            <UserList />
          </div>
        </div>
      </div>
    </WebSocketProvider>
  );
}

export default App;