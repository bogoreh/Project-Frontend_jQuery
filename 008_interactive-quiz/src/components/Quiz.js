import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Progress from './Progress';
import Question from './Question';
import Results from './Results';

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // jQuery initialization
    $('.quiz-container').hide().fadeIn(500);
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    // Check if answer is correct
    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
    // Store user's answer
    setUserAnswers(prev => [...prev, {
      question: currentQuestion.question,
      userAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect
    }]);
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer('');
        setShowFeedback(false);
        
        // jQuery transition effect
        $('.question-container').fadeOut(300, () => {
          $('.question-container').fadeIn(300);
        });
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const handleRestart = () => {
    // jQuery restart animation
    $('.results-container').fadeOut(500, () => {
      setCurrentQuestionIndex(0);
      setSelectedAnswer('');
      setShowFeedback(false);
      setScore(0);
      setQuizCompleted(false);
      setUserAnswers([]);
      $('.quiz-container').fadeIn(500);
    });
  };

  if (quizCompleted) {
    return (
      <Results 
        score={score} 
        totalQuestions={questions.length} 
        onRestart={handleRestart}
        userAnswers={userAnswers}
      />
    );
  }

  return (
    <div className="quiz-container">
      <Progress 
        currentQuestion={currentQuestionIndex} 
        totalQuestions={questions.length} 
      />
      
      <Question
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={handleAnswerSelect}
        showFeedback={showFeedback}
        correctAnswer={currentQuestion.correctAnswer}
      />
    </div>
  );
};

export default Quiz;