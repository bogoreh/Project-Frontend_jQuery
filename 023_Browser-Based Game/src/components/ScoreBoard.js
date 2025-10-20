import React from 'react';

const ScoreBoard = ({ score, timeLeft }) => {
  return (
    <div className="score-board">
      <div className="score-item">
        <span className="score-label">Score:</span>
        <span className="score-value">{score}</span>
      </div>
      <div className="score-item">
        <span className="score-label">Time Left:</span>
        <span className="time-value">{timeLeft}s</span>
      </div>
    </div>
  );
};

export default ScoreBoard;