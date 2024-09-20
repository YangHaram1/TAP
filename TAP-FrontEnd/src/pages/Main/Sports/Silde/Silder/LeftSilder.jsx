import React, { useState, useEffect } from 'react';
import styles from './Silder.module.css';

export const LeftSilder = ({ images, interval, onImageClick, currentIndex }) => {
  const [localIndex, setLocalIndex] = useState(currentIndex);

  useEffect(() => {
    setLocalIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLocalIndex(prevIndex => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, images.length]);

  return (
    <div className={styles.sliderContainerLeft}>
      <img 
        src={images[localIndex]} 
        alt={`Slide ${localIndex + 1}`} 
        className={styles.slide} 
      />
      <div className={styles.indicatorContainer}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.indicator} ${localIndex === index ? styles.active : ''}`}
            onClick={() => onImageClick(index)}
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
};
