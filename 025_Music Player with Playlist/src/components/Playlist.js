import React from 'react';
import $ from 'jquery';

const Playlist = ({ 
  playlist, 
  currentTrackIndex, 
  onTrackSelect, 
  onAddTrack, 
  onRemoveTrack 
}) => {
  
  const handleFileUpload = (e) => {
    const files = e.target.files;
    Array.from(files).forEach(file => {
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file);
        onAddTrack({
          id: Date.now() + Math.random(),
          title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
          src: url,
          file: file
        });
        
        // jQuery fade in effect for new tracks
        $(`.playlist-item:last`).hide().fadeIn(500);
      }
    });
  };

  const handleRemoveTrack = (trackId, index) => {
    // jQuery fade out effect before removal
    $(`#track-${trackId}`).fadeOut(300, () => {
      onRemoveTrack(index);
    });
  };

  return (
    <div className="playlist">
      <div className="playlist-header">
        <h3>Playlist ({playlist.length})</h3>
        <div className="playlist-actions">
          <input
            type="file"
            accept="audio/*"
            multiple
            onChange={handleFileUpload}
            id="file-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="file-upload" className="add-track-btn">
            + Add Tracks
          </label>
        </div>
      </div>
      
      <div className="playlist-tracks">
        {playlist.length === 0 ? (
          <div className="empty-playlist">
            <p>No tracks in playlist</p>
            <label htmlFor="file-upload" className="add-first-track">
              Add your first track
            </label>
          </div>
        ) : (
          playlist.map((track, index) => (
            <div 
              key={track.id}
              id={`track-${track.id}`}
              className={`playlist-item ${index === currentTrackIndex ? 'active' : ''}`}
              onClick={() => onTrackSelect(index)}
            >
              <div className="track-info">
                <span className="track-number">{index + 1}</span>
                <span className="track-title">{track.title}</span>
              </div>
              <button 
                className="remove-track"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTrack(track.id, index);
                }}
                title="Remove track"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Playlist;