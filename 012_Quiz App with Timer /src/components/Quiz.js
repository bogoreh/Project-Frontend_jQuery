import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Question from './Question';
import Timer from './Timer';
import Score from './Score';

const Quiz = ({ questions, timeLimit = 60 }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentQuestionIndex]: option
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // jQuery slide transition
      $('.question-container').fadeOut(300, () => {
        setCurrentQuestionIndex(prev => prev + 1);
        $('.question-container').fadeIn(300);
      });
    } else {
      calculateFinalScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      $('.question-container').fadeOut(300, () => {
        setCurrentQuestionIndex(prev => prev - 1);
        $('.question-container').fadeIn(300);
      });
    }
  };

  const handleTimeUp = () => {
    setIsTimerActive(false);
    calculateFinalScore();
  };

  const calculateFinalScore = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setQuizCompleted(true);
    
    // jQuery completion animation
    $('.quiz-container').fadeOut(500, () => {
      $('.quiz-container').fadeIn(500);
    });
  };

  const handleRestart = () => {
    // Reset all states
    setCurrentQuestionIndex(0);
    setSelectedOptions({});
    setScore(0);
    setQuizCompleted(false);
    setIsTimerActive(true);
    
    // jQuery reset animation
    $('.quiz-container').hide().fadeIn(500);
  };

  if (quizCompleted) {
    return (
      <Score 
        score={score} 
        totalQuestions={questions.length}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <Timer 
          timeLimit={timeLimit}
          onTimeUp={handleTimeUp}
          isActive={isTimerActive}
        />
        <div className="progress">
          Progress: {currentQuestionIndex + 1}/{questions.length}
        </div>
      </div>

      <Question
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedOption={selectedOptions[currentQuestionIndex]}
        onOptionSelect={handleOptionSelect}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />

      <div className="navigation-buttons">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="nav-btn prev-btn"
        >
          Previous
        </button>
        
        <button 
          onClick={handleNext}
          className="nav-btn next-btn"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;