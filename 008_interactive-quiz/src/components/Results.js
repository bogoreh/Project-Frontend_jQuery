import React, { useEffect } from 'react';
import $ from 'jquery';

const Results = ({ score, totalQuestions, onRestart }) => {
  useEffect(() => {
    // jQuery animations for results
    $('.results-container').hide().fadeIn(1000);
    $('.score-circle').animate({ borderWidth: 10 }, 1500);
    
    // Animate score counter
    let currentScore = 0;
    const targetScore = score;
    const duration = 2000;
    const steps = 50;
    const increment = targetScore / steps;
    const stepTime = duration / steps;
    
    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= targetScore) {
        currentScore = targetScore;
        clearInterval(timer);
      }
      $('.score-number').text(Math.round(currentScore));
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [score]);

  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = '';
  if (percentage >= 80) message = 'Excellent! 🎉';
  else if (percentage >= 60) message = 'Good job! 👍';
  else if (percentage >= 40) message = 'Not bad! 😊';
  else message = 'Keep practicing! 📚';

  return (
    <div className="results-container">
      <div className="results-card">
        <h2>Quiz Completed!</h2>
        <div className="score-display">
          <div className="score-circle">
            <span className="score-number">{score}</span>
            <span className="score-total">/{totalQuestions}</span>
          </div>
          <div className="percentage">{percentage}%</div>
        </div>
        <div className="results-message">{message}</div>
        <button className="restart-btn" onClick={onRestart}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Results;