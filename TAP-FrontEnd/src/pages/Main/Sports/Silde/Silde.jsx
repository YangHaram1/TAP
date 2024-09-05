// src/components/Silde/Silde.jsx

import React, { useState } from 'react';
import { LeftSilder } from './Silder/LeftSilde';
import { RightSilder } from './Silder/RightSilder';
import styles from './Silde.module.css'; // 최상위 CSS 모듈 import

export const Silde = ({ images = [], interval = 3000, onImageClick = () => {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    onImageClick(index);
  };

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <LeftSilder 
        images={images}
        interval={interval}
        onImageClick={handleImageClick}
        currentIndex={currentIndex}
      />
      <RightSilder 
        images={images}
        interval={interval}
        onImageClick={handleImageClick}
        currentIndex={currentIndex}
      />
    </div>
  );
};
