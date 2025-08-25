import React, { useState, useRef } from 'react';
import '../ComponentCss/imageslider.css';

// Business images
import jai from '/images/jai.webp';
import imp1 from '/images/imp1.webp';
import bt2 from '/images/bt2.avif';
// import imp1 from '/images/imp1.webp';

const ImageSlider = ({ 
  images = [], 
  height = "500px",
  className = ""
}) => {
  const [imageLoadStates, setImageLoadStates] = useState({});
  const sliderRef = useRef(null);

  const defaultImages = [
    {
      url: jai,
      alt: 'HPS Construction - Sustainable Bamboo Solutions'
    },
    {
      url: imp1,
      alt: 'HPS Construction - Professional POP Services'
    },
    {
      url: bt2,
      alt: 'HPS Construction - Modern Interior Design'
    },
    {
      url: imp1,
      alt: 'HPS Construction - Expert Consultation'
    }
  ];

  const slideImages = images.length > 0 ? images : defaultImages;
  
  // Triple repetition for seamless infinite scroll
  const infiniteSlides = [...slideImages, ...slideImages, ...slideImages];

  const handleImageLoad = (index) => {
    setImageLoadStates(prev => ({ ...prev, [index]: 'loaded' }));
  };

  const handleImageError = (index) => {
    setImageLoadStates(prev => ({ ...prev, [index]: 'error' }));
  };

  if (slideImages.length === 0) {
    return (
      <div className={`image-slider ${className}`} style={{ height }}>
        <div className="slider-container">
          <div className="no-images">
            <div className="no-images-content">
              <div className="no-images-icon">🏗️</div>
              <h3>HPS Construction Gallery</h3>
              <p>Showcasing our premium construction services</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`image-slider hps-construction-slider seamless-infinite ${className}`}
      style={{ height }}
      role="region"
      aria-label="HPS Construction Services Showcase"
      ref={sliderRef}
    >
      <div className="slider-container">
        <div className="slides-wrapper seamless-animation">
          {infiniteSlides.map((slide, index) => {
            const imageUrl = typeof slide === 'string' ? slide : slide.url;
            const imageAlt = typeof slide === 'object' ? slide.alt : `HPS Construction Service ${(index % slideImages.length) + 1}`;
            
            return (
              <div key={`seamless-slide-${index}`} className="slide">
                <div className="image-container">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className={`slide-image ${imageLoadStates[index] || 'loading'}`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                  />
                  
                  {imageLoadStates[index] === 'loading' && (
                    <div className="loading-spinner">
                      <div className="hps-spinner"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        HPS Construction Services - Image Gallery
      </div>
    </div>
  );
};

export default ImageSlider;
