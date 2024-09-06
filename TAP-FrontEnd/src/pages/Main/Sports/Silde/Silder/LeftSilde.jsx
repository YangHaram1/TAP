import React, { useState, useEffect } from 'react';
import styles from './Silder.module.css';

export const LeftSilder = ({ images, interval, onImageClick }) => {
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
    <div className={styles.sliderContainerLeft}>
      <img 
        src={images[currentIndex]} 
        alt={`Slide ${currentIndex + 1}`} 
        className={styles.slide} 
      />
      <div className={styles.leftButtonContainer}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.leftButton} ${currentIndex === index ? styles.active : ''}`}
            onClick={() => onImageClick(index)}
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
};
