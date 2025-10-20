import React, { useEffect, useState } from 'react';
import $ from 'jquery';

const GameBoard = ({ gameActive, onTargetClick }) => {
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    if (gameActive) {
      // Create initial targets
      const initialTargets = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        points: Math.floor(Math.random() * 10) + 5
      }));
      setTargets(initialTargets);

      // jQuery animation for targets
      setTimeout(() => {
        $('.target').each(function(index) {
          $(this).hide().delay(index * 200).fadeIn(300);
        });
      }, 100);
    } else {
      setTargets([]);
    }
  }, [gameActive]);

  const handleTargetClick = (target) => {
    if (!gameActive) return;

    // Click animation
    const $target = $(`#target-${target.id}`);
    $target.css({ transform: 'translate(-50%, -50%) scale(0.1)' });
    
    setTimeout(() => {
      $target.fadeOut(200, function() {
        setTargets(prev => prev.filter(t => t.id !== target.id));
      });
    }, 150);

    // Add new target
    setTimeout(() => {
      if (gameActive) {
        const newTarget = {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20,
          points: Math.floor(Math.random() * 10) + 5
        };
        setTargets(prev => [...prev, newTarget]);
        
        // Animate new target
        setTimeout(() => {
          $(`#target-${newTarget.id}`).hide().fadeIn(300);
        }, 50);
      }
    }, 250);

    onTargetClick(target.points);
  };

  return (
    <div className="game-board">
      {targets.map(target => (
        <div
          key={target.id}
          id={`target-${target.id}`}
          className="target"
          style={{
            left: `${target.x}%`,
            top: `${target.y}%`,
            backgroundColor: `hsl(${target.points * 20}, 70%, 50%)`
          }}
          onClick={() => handleTargetClick(target)}
        >
          +{target.points}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;