import React, { useEffect } from 'react';
import $ from 'jquery';

const GameControls = ({ gameActive, onStartGame }) => {
  useEffect(() => {
    // jQuery button animation without effect('shake')
    $('.start-button').hover(
      function() {
        $(this).stop().animate({ paddingLeft: '30px', paddingRight: '30px' }, 200);
      },
      function() {
        $(this).stop().animate({ paddingLeft: '20px', paddingRight: '20px' }, 200);
      }
    );
  }, []);

  const handleClick = () => {
    // Simple bounce animation without jQuery UI
    const $button = $('.start-button');
    $button.css({ transform: 'scale(0.9)' });
    setTimeout(() => {
      $button.css({ transform: 'scale(1)' });
    }, 150);
    
    onStartGame();
  };

  return (
    <div className="game-controls">
      <button 
        className="start-button"
        onClick={handleClick}
        disabled={gameActive}
      >
        {gameActive ? 'Game Running...' : 'Start Game'}
      </button>
    </div>
  );
};

export default GameControls;