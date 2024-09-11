import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TeamHeader } from './TeamHeader/TeamHeader';
import { TeamMain } from './TeamMain/TeamMain';
import { Side } from '../Side/Side';
import styles from './TeamPage.module.css';

export const TeamPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  
  const { teamName, teamLogo, homeGround, matches } = state || {};

  if (!teamName || !teamLogo || !homeGround) {
    return <div>잘못된 접근입니다. 팀 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.teamPage}>
      <TeamHeader teamName={teamName} teamLogo={teamLogo} homeGround={homeGround} />
      <div className={styles.sideMainWrapper}>
        <div className={styles.sideWrapper}>
          <Side navigate={navigate} />
        </div>
        <TeamMain matches={matches} selectedTeam={teamName} />
      </div>
    </div>
  );
};
