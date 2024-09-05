// src/components/Sports/Sports.jsx

import React from 'react';
import { Silde } from './Silde/Silde';
import { MatchList } from './MatchList/MatchList';
import { Side } from './Side/Side';
import styles from './Sports.module.css'; // CSS 모듈 임포트

export const Sports = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderWrapper}>
          <Silde
            images={['/logo192.png', '/logo192.png', '/logo512.png']}
            interval={3000}
            onImageClick={(index) => console.log('Clicked image index:', index)}
          />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.sideWrapper}>
          <Side />
        </div>
        <div className={styles.matchListWrapper}>
          <MatchList />
        </div>
      </div>
    </div>
  );
};
