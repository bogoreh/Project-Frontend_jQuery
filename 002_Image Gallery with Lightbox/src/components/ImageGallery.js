import React from 'react';
import Thumbnail from './Thumbnail';
import Lightbox from './Lightbox';

const ImageGallery = () => {
  // Sample images from CDN (Picsum Photos)
  const images = [
    {
      id: 1,
      thumbnail: 'https://picsum.photos/200/150?random=1',
      fullSize: 'https://picsum.photos/1200/800?random=1',
      alt: 'Nature Image 1'
    },
    {
      id: 2,
      thumbnail: 'https://picsum.photos/200/150?random=2',
      fullSize: 'https://picsum.photos/1200/800?random=2',
      alt: 'Nature Image 2'
    },
    {
      id: 3,
      thumbnail: 'https://picsum.photos/200/150?random=3',
      fullSize: 'https://picsum.photos/1200/800?random=3',
      alt: 'Nature Image 3'
    },
    {
      id: 4,
      thumbnail: 'https://picsum.photos/200/150?random=4',
      fullSize: 'https://picsum.photos/1200/800?random=4',
      alt: 'Nature Image 4'
    },
    {
      id: 5,
      thumbnail: 'https://picsum.photos/200/150?random=5',
      fullSize: 'https://picsum.photos/1200/800?random=5',
      alt: 'Nature Image 5'
    },
    {
      id: 6,
      thumbnail: 'https://picsum.photos/200/150?random=6',
      fullSize: 'https://picsum.photos/1200/800?random=6',
      alt: 'Nature Image 6'
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = React.useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setCurrentImageIndex(null);
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-gallery">
      <div className="gallery-grid">
        {images.map((image, index) => (
          <Thumbnail
            key={image.id}
            image={image}
            onClick={() => openLightbox(index)}
          />
        ))}
      </div>

      {isLightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrev={goToPrev}
        />
      )}
    </div>
  );
};

export default ImageGallery;