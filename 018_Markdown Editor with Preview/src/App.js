import React, { useState } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import './styles/App.css';

function App() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

## Features
- **Live Preview**: See your markdown rendered in real-time
- **Easy Formatting**: Use markdown syntax for formatting
- **Responsive Design**: Works on all devices

### Try it out!
Write some **bold** or *italic* text.

\`\`\`javascript
// Code blocks work too!
function hello() {
  console.log("Hello, Markdown!");
}
\`\`\`

> This is a blockquote

[Visit React](https://reactjs.org)
`);

  const handleMarkdownChange = (newMarkdown) => {
    setMarkdown(newMarkdown);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Markdown Editor</h1>
        <p>Write in Markdown and see live preview</p>
      </header>
      
      <div className="app-container">
        <div className="editor-section">
          <Toolbar onInsert={handleMarkdownChange} currentMarkdown={markdown} />
          <MarkdownEditor 
            markdown={markdown} 
            onMarkdownChange={handleMarkdownChange} 
          />
        </div>
        
        <div className="preview-section">
          <Preview markdown={markdown} />
        </div>
      </div>
    </div>
  );
}

export default App;