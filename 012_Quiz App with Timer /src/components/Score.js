import React from 'react';
import $ from 'jquery';

const Score = ({ score, totalQuestions, onRestart }) => {
  
  const calculatePercentage = () => {
    return Math.round((score / totalQuestions) * 100);
  };

  const getScoreMessage = () => {
    const percentage = calculatePercentage();
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 60) return "Good job! 👍";
    if (percentage >= 40) return "Not bad! 😊";
    return "Keep practicing! 📚";
  };

  React.useEffect(() => {
    // jQuery animations on score display
    $('.score-container').hide().fadeIn(1000);
    $('.score-percentage').animate({ width: `${calculatePercentage()}%` }, 1500);
  }, []);

  const handleRestart = () => {
    // jQuery fade out effect before restart
    $('.score-container').fadeOut(500, () => {
      onRestart();
    });
  };

  return (
    <div className="score-container">
      <div className="score-card">
        <h2>Quiz Completed!</h2>
        <div className="score-display">
          <div className="score-circle">
            <span className="score-number">{score}</span>
            <span className="score-total">/{totalQuestions}</span>
          </div>
          <div className="score-percentage-bar">
            <div className="score-percentage"></div>
          </div>
          <p className="score-percentage-text">{calculatePercentage()}%</p>
        </div>
        <p className="score-message">{getScoreMessage()}</p>
        <button className="restart-btn" onClick={handleRestart}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default Score;