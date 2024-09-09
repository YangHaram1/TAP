// src/pages/TeamPage/TeamPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { TeamHeader } from './TeamHeader/TeamHeader';
import { TeamMain } from './TeamMain/TeamMain';
import styles from './TeamPage.module.css';

export const TeamPage = () => {
  const location = useLocation();
  const { state } = location;
  
  const { teamName, teamLogo, homeGround, matches } = state || {};

  if (!teamName || !teamLogo || !homeGround) {
    return <div>잘못된 접근입니다. 팀 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.teamPage}>
      <TeamHeader teamName={teamName} teamLogo={teamLogo} homeGround={homeGround} />
      <TeamMain matches={matches} />
    </div>
  );
};
