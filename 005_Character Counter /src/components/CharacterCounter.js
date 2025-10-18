import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import './styles/CharacterCounter.css';

const CharacterCounter = () => {
  const textareaRef = useRef(null);
  const counterRef = useRef(null);
  const [maxChars, setMaxChars] = useState(280); // Twitter-like limit

  useEffect(() => {
    // Initialize jQuery functionality after component mounts
    const $textarea = $(textareaRef.current);
    const $counter = $(counterRef.current);

    const updateCounter = () => {
      const currentLength = $textarea.val().length;
      const remainingChars = maxChars - currentLength;
      
      // Update counter text
      $counter.text(`${remainingChars} characters remaining`);
      
      // Update counter color based on remaining characters
      if (remainingChars < 0) {
        $counter.addClass('counter-error').removeClass('counter-warning counter-success');
      } else if (remainingChars < 50) {
        $counter.addClass('counter-warning').removeClass('counter-error counter-success');
      } else {
        $counter.addClass('counter-success').removeClass('counter-error counter-warning');
      }
    };

    // Bind keyup event
    $textarea.on('keyup', updateCounter);
    
    // Also update on input event for better real-time tracking
    $textarea.on('input', updateCounter);
    
    // Initial update
    updateCounter();

    // Cleanup: Remove event listeners
    return () => {
      $textarea.off('keyup', updateCounter);
      $textarea.off('input', updateCounter);
    };
  }, [maxChars]);

  const handleMaxCharsChange = (e) => {
    const newMax = parseInt(e.target.value) || 280;
    setMaxChars(newMax);
  };

  const clearTextarea = () => {
    $(textareaRef.current).val('').trigger('keyup');
  };

  return (
    <div className="character-counter-container">
      <div className="counter-controls">
        <label htmlFor="max-chars">Character Limit:</label>
        <input
          id="max-chars"
          type="number"
          value={maxChars}
          onChange={handleMaxCharsChange}
          min="1"
          max="1000"
          className="max-chars-input"
        />
      </div>
      
      <div className="textarea-container">
        <textarea
          ref={textareaRef}
          className="character-textarea"
          placeholder="Start typing here... (Try to keep it under the character limit!)"
          rows="6"
          maxLength={maxChars * 2} // Allow some overflow for demonstration
        />
      </div>
      
      <div className="counter-info">
        <div ref={counterRef} className="character-counter">
          {maxChars} characters remaining
        </div>
        <button 
          onClick={clearTextarea}
          className="clear-button"
        >
          Clear Text
        </button>
      </div>
      
      <div className="usage-info">
        <h3>How it works:</h3>
        <ul>
          <li><code>keyup()</code> - Triggers on every key release</li>
          <li><code>val().length</code> - Gets current text length</li>
          <li><code>text()</code> - Updates counter display</li>
        </ul>
      </div>
    </div>
  );
};

export default CharacterCounter;