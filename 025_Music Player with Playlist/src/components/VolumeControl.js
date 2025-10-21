import React from 'react';
import $ from 'jquery';

const VolumeControl = ({ volume, onVolumeChange }) => {
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(newVolume);
    
    // jQuery animation for smooth volume change
    $('.volume-slider').css('background', 
      `linear-gradient(to right, #4CAF50 0%, #4CAF50 ${newVolume * 100}%, #ddd ${newVolume * 100}%, #ddd 100%)`
    );
  };

  const toggleMute = () => {
    const newVolume = volume === 0 ? 0.7 : 0;
    onVolumeChange(newVolume);
  };

  return (
    <div className="volume-control">
      <button 
        className="volume-btn"
        onClick={toggleMute}
        title={volume === 0 ? 'Unmute' : 'Mute'}
      >
        {volume === 0 ? '🔇' : volume < 0.5 ? '🔈' : '🔊'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
      />
    </div>
  );
};

export default VolumeControl;