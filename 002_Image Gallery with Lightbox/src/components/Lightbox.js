import React, { useEffect } from 'react';

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  // jQuery effects for smooth animations
  useEffect(() => {
    if (window.$) {
      // Fade in the lightbox
      window.$('.lightbox').hide().fadeIn(300);
      
      // Handle keyboard navigation
      const handleKeyPress = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
      };

      window.$(document).on('keydown', handleKeyPress);
      
      return () => {
        window.$(document).off('keydown', handleKeyPress);
      };
    }
  }, [onClose, onNext, onPrev]);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const currentImage = images[currentIndex];

  return (
    <div className="lightbox" onClick={handleBackgroundClick}>
      <div className="lightbox-content">
        <button className="lightbox-close" onClick={onClose}>
          ×
        </button>
        
        <button className="lightbox-nav lightbox-prev" onClick={onPrev}>
          ‹
        </button>
        
        <div className="lightbox-image-container">
          <img
            src={currentImage.fullSize}
            alt={currentImage.alt}
            className="lightbox-image"
          />
          <div className="lightbox-caption">
            {currentImage.alt} ({currentIndex + 1} of {images.length})
          </div>
        </div>
        
        <button className="lightbox-nav lightbox-next" onClick={onNext}>
          ›
        </button>
      </div>
    </div>
  );
};

export default Lightbox;