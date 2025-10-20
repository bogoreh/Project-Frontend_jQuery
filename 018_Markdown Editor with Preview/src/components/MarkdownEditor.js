import React, { useEffect } from 'react';
import $ from 'jquery';

const MarkdownEditor = ({ markdown, onMarkdownChange }) => {
  useEffect(() => {
    // jQuery example: Add some interactive features
    const $editor = $('.markdown-editor');
    
    // Auto-resize textarea
    const autoResize = () => {
      $editor.height('auto');
      $editor.height($editor[0].scrollHeight);
    };
    
    $editor.on('input', autoResize);
    autoResize(); // Initial resize
    
    // Add keyboard shortcuts using jQuery
    $(document).on('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        alert('Markdown saved! (This is a demo)');
      }
    });
    
    return () => {
      $editor.off('input', autoResize);
      $(document).off('keydown');
    };
  }, []);

  const handleChange = (e) => {
    onMarkdownChange(e.target.value);
  };

  return (
    <div className="editor-container">
      <h3>Editor</h3>
      <textarea
        className="markdown-editor"
        value={markdown}
        onChange={handleChange}
        placeholder="Start writing your markdown here..."
      />
    </div>
  );
};

export default MarkdownEditor;