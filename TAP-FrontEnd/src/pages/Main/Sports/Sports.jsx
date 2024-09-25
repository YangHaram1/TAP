import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../config/config';
import { Silde } from './Silde/Silde';
import { MatchList } from './MatchList/MatchList';
import { Side } from './Side/Side';
import styles from './Sports.module.css';
import ssg from './Silde/Silder/images/ssg.png';
import junbuk from './Silde/Silder/images/전북.jpg';
import ulsan from './Silde/Silder/images/울산.jpg';
import daejun from './Silde/Silder/images/대전.jpg';
import doosan from './Silde/Silder/images/두산.jpg';

// 로컬 팀 로고 이미지 배열
const teamLogos = [
  doosan,
  ssg,
  junbuk,
  ulsan,
  daejun
];

export const Sports = () => {
  const [baseballMatches, setBaseballMatches] = useState([]);
  const [soccerMatches, setSoccerMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

  return (
    <div className={styles.container}>
      {/* 슬라이더 섹션 */}
      <div className={styles.sliderContainer}>
        <Silde images={teamLogos} />
      </div>

      {/* 콘텐츠 섹션 */}
      <div className={styles.contentContainer}>
        {/* 사이드 메뉴 */}
        <div className={styles.sideWrapper}>
          <Side
            baseballMatches={baseballMatches}
            soccerMatches={soccerMatches}
            navigate={navigate}
          />
        </div>

        {/* 매치 리스트 */}
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
