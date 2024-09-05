import React, { useState, useEffect } from 'react';
import './Silder.module.css'

export const RightSilder = ({ images, interval, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(intervalId);
  }, [currentIndex, images.length, interval]);

  return (
    <div className="slider-container-right">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slide" />
      <div className="indicator-container">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${currentIndex === index ? 'active' : ''}`}
            onClick={() => onImageClick(index)}
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
};


