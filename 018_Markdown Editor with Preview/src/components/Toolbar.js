import React from 'react';
import $ from 'jquery';

const Toolbar = ({ onInsert, currentMarkdown }) => {
  const handleFormat = (format) => {
    const textarea = $('.markdown-editor');
    const start = textarea[0].selectionStart;
    const end = textarea[0].selectionEnd;
    const selectedText = currentMarkdown.substring(start, end);
    
    let newText = '';
    let newCursorPos = 0;

    switch (format) {
      case 'bold':
        newText = `**${selectedText}**`;
        newCursorPos = start + 2;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        newCursorPos = start + 1;
        break;
      case 'heading':
        newText = `# ${selectedText}`;
        newCursorPos = start + 2;
        break;
      case 'link':
        newText = `[${selectedText}](https://)`;
        newCursorPos = start + selectedText.length + 3;
        break;
      case 'code':
        newText = `\`${selectedText}\``;
        newCursorPos = start + 1;
        break;
      case 'codeblock':
        newText = `\`\`\`\n${selectedText}\n\`\`\``;
        newCursorPos = start + 4;
        break;
      case 'quote':
        newText = `> ${selectedText}`;
        newCursorPos = start + 2;
        break;
      case 'list':
        newText = `- ${selectedText}`;
        newCursorPos = start + 2;
        break;
      default:
        return;
    }

    const newMarkdown = 
      currentMarkdown.substring(0, start) + 
      newText + 
      currentMarkdown.substring(end);
    
    onInsert(newMarkdown);
    
    // Set cursor position after update
    setTimeout(() => {
      textarea[0].setSelectionRange(newCursorPos, newCursorPos);
      textarea[0].focus();
    }, 0);
  };

  return (
    <div className="toolbar">
      <button onClick={() => handleFormat('bold')} title="Bold">
        <strong>B</strong>
      </button>
      <button onClick={() => handleFormat('italic')} title="Italic">
        <em>I</em>
      </button>
      <button onClick={() => handleFormat('heading')} title="Heading">
        H
      </button>
      <button onClick={() => handleFormat('link')} title="Link">
        🔗
      </button>
      <button onClick={() => handleFormat('code')} title="Inline Code">
        {'</>'}
      </button>
      <button onClick={() => handleFormat('codeblock')} title="Code Block">
        ⛁
      </button>
      <button onClick={() => handleFormat('quote')} title="Blockquote">
        ❝
      </button>
      <button onClick={() => handleFormat('list')} title="List">
        •
      </button>
    </div>
  );
};

export default Toolbar;