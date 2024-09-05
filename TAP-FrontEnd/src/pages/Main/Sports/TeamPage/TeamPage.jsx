// src/pages/TeamPage/TeamPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { TeamHeader } from './TeamHeader';
import { TeamMain } from './TeamMain';
import styles from './TeamPage.module.css'; // CSS 모듈 임포트

export const TeamPage = () => {
  const { state } = useLocation();
  const { teamName, teamLogo, homeGround } = state || {};

  // 팀별 경기 일정 데이터
  const teamMatches = {
    '두산베어스': [
      { date: '2024-09-10', opponent: '롯데 자이언츠' },
      { date: '2024-09-15', opponent: '삼성 라이온즈' },
    ],
    '키움히어로즈': [
      { date: '2024-09-12', opponent: 'LG 트윈스' },
      { date: '2024-09-20', opponent: '한화 이글스' },
    ],
    '천안시티FC': [
      { date: '2024-09-08', opponent: '서울 이랜드 FC' },
      { date: '2024-09-18', opponent: '부산 아이파크' },
    ],
    '안산그리너스FC': [
      { date: '2024-09-09', opponent: '전북 현대 모터스' },
      { date: '2024-09-16', opponent: '강원 FC' },
    ],
    '전남 드래곤즈': [
      { date: '2024-09-11', opponent: '울산 현대' },
      { date: '2024-09-21', opponent: 'FC 서울' },
    ],
  };

  // 선택된 팀의 경기 일정
  const matches = teamMatches[teamName] || [];

  return (
    <div className={styles.teamPage}>
      <TeamHeader teamName={teamName} teamLogo={teamLogo} homeGround={homeGround} />
      <TeamMain matches={matches} />
    </div>
  );
};
