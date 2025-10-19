import React from 'react';
import $ from 'jquery';

const Question = ({ 
  question, 
  options, 
  selectedOption, 
  onOptionSelect, 
  questionNumber,
  totalQuestions 
}) => {

  const handleOptionClick = (option) => {
    onOptionSelect(option);
    
    // jQuery animations
    $('.option').removeClass('selected');
    $(`[data-option="${option}"]`).addClass('selected');
    
    // Add bounce effect
    $(`[data-option="${option}"]`).animate(
      { scale: '1.05' }, 
      100, 
      function() {
        $(this).animate({ scale: '1' }, 100);
      }
    );
  };

  return (
    <div className="question-container">
      <div className="question-header">
        <h3>Question {questionNumber} of {totalQuestions}</h3>
      </div>
      <div className="question">
        <h2>{question}</h2>
      </div>
      <div className="options">
        {options.map((option, index) => (
          <div
            key={index}
            data-option={option}
            className={`option ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;