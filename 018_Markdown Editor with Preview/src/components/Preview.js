import React, { useEffect } from 'react';
import $ from 'jquery';

const Preview = ({ markdown }) => {
  useEffect(() => {
    // Use jQuery to enhance the preview section
    const $preview = $('.preview-content');
    
    // Smooth scroll to bottom when content grows
    $preview.animate({ scrollTop: $preview[0].scrollHeight }, 500);
    
    // Add hover effects to links
    $preview.find('a').hover(
      function() {
        $(this).css('text-decoration', 'underline');
      },
      function() {
        $(this).css('text-decoration', 'none');
      }
    );
  }, [markdown]);

  const renderMarkdown = (text) => {
    // Simple markdown parser (for demo purposes)
    // In a real app, you might want to use a library like marked.js
    
    return text
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Lists
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      // Paragraphs
      .replace(/^\s*(\n)?(.+)/gm, function(m){
        return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|code)/.test(m) ? m : '<p>'+m+'</p>';
      })
      // Line breaks
      .replace(/\n$/gim, '<br/>');
  };

  return (
    <div className="preview-container">
      <h3>Preview</h3>
      <div 
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
      />
    </div>
  );
};

export default Preview;