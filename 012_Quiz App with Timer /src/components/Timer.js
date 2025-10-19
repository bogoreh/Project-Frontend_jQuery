import React, { useEffect, useState } from 'react';
import $ from 'jquery';

const Timer = ({ timeLimit, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    let timer;
    
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // jQuery animation for warning
    if (timeLeft <= 10 && timeLeft > 0) {
      $('.timer-warning').fadeIn(300).fadeOut(300).fadeIn(300);
    }

    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeUp]);

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getTimerClass = () => {
    if (timeLeft <= 10) return 'timer-warning';
    if (timeLeft <= 30) return 'timer-alert';
    return '';
  };

  return (
    <div className={`timer ${getTimerClass()}`}>
      <h3>Time Left: {formatTime(timeLeft)}</h3>
    </div>
  );
};

export default Timer;