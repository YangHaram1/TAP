import React from 'react';
import styles from './TeamHeader.module.css';

export const TeamHeader = ({ teamName, teamLogo, homeGround }) => {
  return (
    <div className={styles.teamHeader}>
      <div className={styles.logoContainer}>
        <img src={teamLogo} alt={`${teamName} 로고`} className={styles.teamLogo} />
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.teamName}>{teamName}</h1>
        <p className={styles.homeGround}>홈구장: {homeGround}</p>
      </div>
    </div>
  );
};
