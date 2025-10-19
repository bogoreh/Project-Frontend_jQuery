import React from 'react';
import $ from 'jquery';

const Question = ({ 
  question, 
  options, 
  selectedAnswer, 
  onAnswerSelect, 
  showFeedback, 
  correctAnswer 
}) => {
  
  const handleAnswerClick = (option) => {
    if (selectedAnswer) return; // Prevent multiple selections
    
    onAnswerSelect(option);
    
    // jQuery animations for feedback
    const $option = $(`#option-${option.replace(/\s+/g, '-')}`);
    
    $option.addClass('selected');
    
    setTimeout(() => {
      $option.addClass(option === correctAnswer ? 'correct' : 'incorrect');
      
      // Highlight correct answer
      $(`#option-${correctAnswer.replace(/\s+/g, '-')}`).addClass('correct-highlight');
    }, 500);
  };

  return (
    <div className="question-container">
      <h2 className="question-text">{question}</h2>
      <div className="options-container">
        {options.map((option, index) => {
          const optionId = `option-${option.replace(/\s+/g, '-')}`;
          let optionClass = "option";
          
          if (showFeedback) {
            if (option === selectedAnswer) {
              optionClass += option === correctAnswer ? " correct" : " incorrect";
            }
            if (option === correctAnswer) {
              optionClass += " correct-highlight";
            }
          } else if (option === selectedAnswer) {
            optionClass += " selected";
          }
          
          return (
            <div
              key={index}
              id={optionId}
              className={optionClass}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
      
      {showFeedback && selectedAnswer && (
        <div className={`feedback ${selectedAnswer === correctAnswer ? 'correct-feedback' : 'incorrect-feedback'}`}>
          <strong>
            {selectedAnswer === correctAnswer ? '✓ Correct!' : '✗ Incorrect!'}
          </strong>
          <p>{selectedAnswer === correctAnswer ? 'Well done!' : `Correct answer: ${correctAnswer}`}</p>
          <p className="explanation">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default Question;