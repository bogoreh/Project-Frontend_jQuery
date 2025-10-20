import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import GameControls from './components/GameControls';
import $ from 'jquery';

function App() {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  // jQuery effects on component mount
  useEffect(() => {
    $(document).ready(function() {
      $('.app-container').hide().fadeIn(1000);
    });
  }, []);

  // Game timer
  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
      // jQuery effect when game ends
      $('.game-over').fadeIn(500);
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    $('.game-over').hide();
  };

  const addScore = (points) => {
    setScore(prev => prev + points);
    // Custom highlight animation without jQuery UI
    $('.score-value')
      .css({ color: '#4CAF50', transform: 'scale(1.2)' })
      .delay(200)
      .queue(function(next) {
        $(this).css({ color: 'white', transform: 'scale(1)' });
        next();
      });
  };

  return (
    <div className="app-container">
      <div className="game-header">
        <h1>🎯 Clicker Game</h1>
        <p>Click the targets before time runs out!</p>
      </div>
      
      <ScoreBoard score={score} timeLeft={timeLeft} />
      
      <GameBoard 
        gameActive={gameActive} 
        onTargetClick={addScore}
      />
      
      <GameControls 
        gameActive={gameActive}
        onStartGame={startGame}
      />
      
      {!gameActive && timeLeft === 0 && (
        <div className="game-over" style={{display: 'none'}}>
          <h2>Game Over!</h2>
          <p>Final Score: {score}</p>
        </div>
      )}
    </div>
  );
}

export default App;