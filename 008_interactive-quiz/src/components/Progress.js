import React from 'react';
import $ from 'jquery';

const Progress = ({ currentQuestion, totalQuestions }) => {
  React.useEffect(() => {
    // jQuery animation for progress bar
    $('.progress-bar').animate({
      width: `${((currentQuestion + 1) / totalQuestions) * 100}%`
    }, 500);
  }, [currentQuestion, totalQuestions]);

  return (
    <div className="progress-container">
      <div className="progress-info">
        Question {currentQuestion + 1} of {totalQuestions}
      </div>
      <div className="progress-bar-background">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
};

export default Progress;