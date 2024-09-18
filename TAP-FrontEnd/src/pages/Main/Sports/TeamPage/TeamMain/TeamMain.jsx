import React, { useState, useEffect } from 'react';
import styles from './TeamMain.module.css';

export const TeamMain = ({ matches, selectedTeam }) => {
  const [maxList, setMaxList] = useState(5);

  useEffect(() => {
    console.log(matches);
  }, [matches]);

  return (
    <div className={styles.teamMain}>
      <h2>경기 일정</h2>
      <div className={styles.scheduleTable}>
        {matches.slice(0, maxList).map((match, index) => (
          <div key={index} className={styles.timeSchedule}>
            <div className={styles.scheduleDateTime}>
              <div className={styles.date}>
                {new Date(match.START_DATE).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })}
                ({new Date(match.START_DATE).toLocaleDateString('ko-KR', { weekday: 'short' })})
              </div>
              <div className={styles.time}>
                {match.START_DATE.split(' ')[1] || '18:30'}
              </div>
            </div>

            <div className={styles.teamMatch}>
              <div className={styles.team1}>
                <a href="#" style={{ cursor: 'default' }}>
                  <img
                    src={match.HOME_TEAM_LOGO || 'http://ticketimage.interpark.com/TicketImage/sports/web/small/PB004.png'}
                    onError={(e) => e.target.src = '//ticketimage.interpark.com/Play/image/small/NoImage.gif'}
                    alt={selectedTeam || match.HOME_TEAM_NAME || '홈 팀'}
                  />
                </a>
                <a href="#" className={styles.teamName} style={{ cursor: 'default' }}>
                  {selectedTeam || match.HOME_TEAM_NAME || '홈 팀'}
                </a>
              </div>

              <div className={styles.vsText}>vs</div>

              <div className={styles.team2}>
                <a href="#" style={{ cursor: 'default' }}>
                  <img
                    src={match.AWAY_TEAM_LOGO || 'http://ticketimage.interpark.com/TicketImage/sports/web/small/PB009.png'}
                    onError={(e) => e.target.src = '//ticketimage.interpark.com/Play/image/small/NoImage.gif'}
                    alt={match.AWAY_TEAM_NAME || '상대 팀'}
                  />
                </a>
                <a href="#" className={styles.teamName} style={{ cursor: 'default' }}>
                  {match.AWAY_TEAM_NAME || '상대 팀'}
                </a>
              </div>
            </div>

            <div className={styles.ground}>
              <span>{match.PLACE_NAME || '경기장'}</span>
            </div>

            <div className={styles.btns}>
              <a
                href="#"
                className={`${styles.BtnColor_Y} ${styles.btn1}`}
                onClick={() => alert('예매하기 기능 미구현')}
              >
                예매하기
              </a>
            </div>
          </div>
        ))}

        {matches.length > maxList && (
          <div
            className={styles.more}
            onClick={() => setMaxList(prev => prev + 5)}
          >
            더보기
          </div>
        )}
      </div>
    </div>
  );
};
