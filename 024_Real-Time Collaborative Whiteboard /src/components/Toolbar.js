import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

const Toolbar = ({ color, setColor, brushSize, setBrushSize, tool, setTool }) => {
  const { clearCanvas } = useWebSocket();

  const tools = [
    { id: 'brush', label: 'Brush' },
    { id: 'eraser', label: 'Eraser' }
  ];

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'
  ];

  return (
    <div className="toolbar">
      <div className="tool-group">
        <h3>Tools</h3>
        {tools.map(t => (
          <button
            key={t.id}
            className={`tool-button ${tool === t.id ? 'active' : ''}`}
            onClick={() => setTool(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="tool-group">
        <h3>Color</h3>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="color-picker"
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
          {colors.map((col) => (
            <div
              key={col}
              onClick={() => setColor(col)}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: col,
                border: color === col ? '3px solid #3498db' : '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </div>

      <div className="tool-group">
        <h3>Brush Size: {brushSize}px</h3>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="brush-size"
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#bdc3c7'
        }}>
          <span>Small</span>
          <span>Large</span>
        </div>
      </div>

      <div className="tool-group">
        <button
          className="tool-button"
          onClick={clearCanvas}
          style={{ 
            backgroundColor: '#e74c3c',
            marginTop: '20px'
          }}
        >
          Clear Canvas
        </button>
      </div>

      <div className="tool-group">
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#2c3e50', 
          borderRadius: '4px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          <strong>Current Tool:</strong> {tool === 'eraser' ? 'Eraser' : 'Brush'}
          <br />
          <strong>Size:</strong> {brushSize}px
          <br />
          <strong>Color:</strong> 
          <div 
            style={{
              display: 'inline-block',
              width: '15px',
              height: '15px',
              backgroundColor: color,
              marginLeft: '5px',
              verticalAlign: 'middle',
              border: '1px solid #ccc'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;