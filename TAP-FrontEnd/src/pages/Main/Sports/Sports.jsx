import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import { api } from '../../../config/config';
import { Silde } from './Silde/Silde';
import { MatchList } from './MatchList/MatchList';
import { Side } from './Side/Side';
import styles from './Sports.module.css'; // CSS 모듈 임포트
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
  const [baseballMatches, setBaseballMatches] = useState([]);
  const [soccerMatches, setSoccerMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 데이터 가져오기
    const fetchData = async () => {
      try {
        const baseballResponse = await api.get('matchlist/baseball');
        const soccerResponse = await api.get('matchlist/soccer');
        setBaseballMatches(baseballResponse.data);
        setSoccerMatches(soccerResponse.data);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (index) => {
    // 각 팀에 대한 페이지로 이동
    navigate(`/team/${index}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderWrapper}>
          <Silde
            images={teamLogos}
            interval={3000}
            onImageClick={handleImageClick}
          />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.sideWrapper}>
          <Side
            baseballMatches={baseballMatches}
            soccerMatches={soccerMatches}
            navigate={navigate} // navigate 전달
          />
        </div>
        <div className={styles.matchListWrapper}>
          <MatchList
            baseballMatches={baseballMatches}
            soccerMatches={soccerMatches}
          />
        </div>
      </div>
    </div>
  );
};
