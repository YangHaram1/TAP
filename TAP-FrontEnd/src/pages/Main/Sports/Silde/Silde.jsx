import React, { useState, useEffect } from 'react';
import { LeftSilder } from './Silder/LeftSilder';
import { RightSilder } from './Silder/RightSilder';
import styles from './Silde.module.css';

export const Silde = ({ images = [], interval = 3000, onImageClick = () => {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, images.length]);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    onImageClick(index);
  };

  return (
    <div className={styles.silderContainer}>
      <div className={styles.sliderWrapper}>
        <div className={styles.leftSilderContainer}>
          <LeftSilder 
            images={images}
            interval={interval}
            onImageClick={handleImageClick}
            currentIndex={currentIndex}
          />
        </div>
        <div className={styles.rightSilderContainer}>
          <RightSilder 
            images={images}
            interval={interval}
            onImageClick={handleImageClick}
            currentIndex={currentIndex}
          />
        </div>
      </div>
    </div>
  );
};
