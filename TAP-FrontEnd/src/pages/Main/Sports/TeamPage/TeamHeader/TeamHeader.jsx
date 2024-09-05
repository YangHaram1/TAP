// src/pages/TeamPage/TeamHeader.jsx
import React from 'react';
import styles from './TeamHeader.module.css'

export const TeamHeader = ({ teamName, teamLogo, homeGround }) => {
  return (
    <div className={styles.teamHeader}>
      <img src={teamLogo} alt={`${teamName} 로고`} className={styles.teamLogo} />
      <h1 className={styles.teamName}>{teamName}</h1>
      <p className={styles.homeGround}>홈구장: {homeGround}</p>
    </div>
  );
};
