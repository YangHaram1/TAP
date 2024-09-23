import React, { useState, useEffect } from 'react';
import styles from './TeamMain.module.css';

export const TeamMain = ({ matches, selectedTeam }) => {
  const [maxList, setMaxList] = useState(5);

  useEffect(() => {
    console.log(matches);
  }, [matches]);

  // 현재 날짜와 시간을 비교하는 함수
  const isOpenNow = (openDate) => {
    const today = new Date();
    const openDateObj = new Date(today.getFullYear(), openDate.split('-')[0] - 1, openDate.split('-')[1].split(' ')[0], openDate.split(' ')[1].split(':')[0], openDate.split(' ')[1].split(':')[1]);
    return openDateObj <= today;
  };

  // 오픈 예정 메시지를 반환하는 함수
  const getOpenStatusMessage = (openDate) => {
    const today = new Date();
    const openDateObj = new Date(today.getFullYear(), openDate.split('-')[0] - 1, openDate.split('-')[1].split(' ')[0], openDate.split(' ')[1].split(':')[0], openDate.split(' ')[1].split(':')[1]);

    if (openDateObj > today) {
      return `${openDateObj.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })} ${openDateObj.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })} 오픈 예정`;
    }
    return null;
  };

  return (
    <div className={styles.teamMain}>
      <h2>경기 일정</h2>
      <div className={styles.scheduleTable}>
        {matches
          .filter(match => match.HOME_TEAM_NAME === selectedTeam) // 홈 팀 경기만 필터링
          .slice(0, maxList)
          .map((match, index) => (
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
                  onClick={() => {
                    if (isOpenNow(match.OPEN_DATE)) {
                      alert('예매하기 기능 미구현');
                    } else {
                      alert(getOpenStatusMessage(match.OPEN_DATE));
                    }
                  }}
                >
                  {isOpenNow(match.OPEN_DATE) ? '예매하기' : getOpenStatusMessage(match.OPEN_DATE)}
                </a>
              </div>
            </div>
          ))}

        {matches.filter(match => match.HOME_TEAM_NAME === selectedTeam).length > maxList && (
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
