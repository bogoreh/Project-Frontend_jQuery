import React from 'react';
import $ from 'jquery';

const PlayerControls = ({ 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious, 
  currentTime, 
  duration, 
  onSeek 
}) => {
  
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    onSeek(seekTime);
    
    // jQuery progress bar animation
    $('.progress-bar').css('background', 
      `linear-gradient(to right, #4CAF50 0%, #4CAF50 ${(seekTime / duration) * 100}%, #ddd ${(seekTime / duration) * 100}%, #ddd 100%)`
    );
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="player-controls">
      <div className="progress-container">
        <span className="time-current">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="progress-bar"
        />
        <span className="time-total">{formatTime(duration)}</span>
      </div>
      
      <div className="control-buttons">
        <button className="control-btn" onClick={onPrevious} title="Previous">
          ⏮
        </button>
        <button 
          className="control-btn play-pause" 
          onClick={onPlayPause}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="control-btn" onClick={onNext} title="Next">
          ⏭
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;