import React from 'react';

const Thumbnail = ({ image, onClick }) => {
  return (
    <div className="thumbnail" onClick={onClick}>
      <img
        src={image.thumbnail}
        alt={image.alt}
        className="thumbnail-image"
      />
      <div className="thumbnail-overlay">
        <span className="view-icon">👁️</span>
      </div>
    </div>
  );
};

export default Thumbnail;