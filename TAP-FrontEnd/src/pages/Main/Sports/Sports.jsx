// src/components/Sports/Sports.jsx
import React from 'react';
import { Silde } from './Silde/Silde';
import { MatchList } from './MatchList/MatchList';
import { Side } from './Side/Side';
import styles from './Sports.module.css'; // CSS 모듈 임포트
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import doosan from './Silde/Silder/images/img1.jpg';
import kiwom from './Silde/Silder/images/img2.jpg';

const teamLogos = [
  doosan,  // 로컬 이미지 추가
  kiwom,   // 로컬 이미지 추가
  'http://ticketimage.interpark.com/TicketImage/sports/web/small/PB001.png',
  'http://ticketimage.interpark.com/TicketImage/sports/web/small/PB002.png',
  'http://ticketimage.interpark.com/TicketImage/sports/web/small/PB003.png',
  'http://ticketimage.interpark.com/TicketImage/sports/web/small/PB004.png',
];

export const Sports = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderWrapper}>
          <Silde
            images={teamLogos}
            interval={3000}
            onImageClick={(index) => console.log('Clicked image index:', index)}
          />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.sideWrapper}>
          <Side navigate={navigate} /> {/* navigate 전달 */}
        </div>
        <div className={styles.matchListWrapper}>
          <MatchList />
        </div>
      </div>
    </div>
  );
};
