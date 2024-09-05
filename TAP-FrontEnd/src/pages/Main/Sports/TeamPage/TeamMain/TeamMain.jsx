// src/pages/TeamPage/TeamMain.jsx
import React from 'react';
import styles from './TeamMain.module.css'; // CSS 모듈 임포트

export const TeamMain = ({ matches }) => {
  return (
    <div className={styles.teamMain}>
      <h2>경기 일정</h2>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            {match.date} - {match.opponent}
          </li>
        ))}
      </ul>
    </div>
  );
};
