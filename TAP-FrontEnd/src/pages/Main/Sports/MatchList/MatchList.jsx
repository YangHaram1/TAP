import React from 'react';
import styles from './MatchList.module.css';

// 경기 데이터
const matchData = [
  {
    team1: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB004.png",
    team2: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB009.png",
    date: "2024.09.13 18:30",
    location: "잠실야구장",
    teams: "두산 베어스 VS NC 다이노스",
    status: "판매예정",
    openDate: "09월 06일 11시  오픈",
    goodsInfo: "야구|두산 베어스 VS NC 다이노스|2024.09.13 00:00"
  },
  {
    team1: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB003.png",
    team2: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB004.png",
    date: "2024.09.10 18:30",
    location: "고척스카이돔",
    teams: "키움 히어로즈 VS 두산 베어스",
    status: "예매하기",
    openDate: "",
    goodsInfo: "야구|키움 히어로즈 VS 두산 베어스|2024.09.10 00:00"
  },
  {
    team1: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB004.png",
    team2: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB025.png",
    date: "2024.09.25 18:30",
    location: "잠실야구장",
    teams: "두산 베어스 VS 삼성 라이온즈",
    status: "판매예정",
    openDate: "09월 16일 11시  오픈",
    goodsInfo: "야구|두산 베어스 VS 삼성 라이온즈|2024.09.25 00:00"
  }
];

export const MatchList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sportWrap}>
        <div className={styles.sportTitle}>
          <div className={styles.selectContainer}>
            <div className={styles.selectedOption}>
              <span>구단선택</span>
            </div>
          </div>
        </div>
        <div className={styles.matchSelect}>
          <div className={styles.itemWrap}>
            {matchData.map((match, index) => (
              <div key={index} className={styles.matchCard}>
                <div className={styles.matchContent}>
                  <div className={styles.teamMatch}>
                    <div className={styles.team1}>
                      <img src={match.team1} alt="팀 1" className={styles.teamLogo} />
                    </div>
                    <div className={styles.team2}>
                      <img src={match.team2} alt="팀 2" className={styles.teamLogo} />
                    </div>
                  </div>
                  <div className={styles.matchDate}>
                    <a href="#">{match.date}</a>
                  </div>
                  <div className={styles.matchLocation}>
                    <a href="#">{match.location}</a>
                  </div>
                  <div className={styles.matchTeam}>
                    <a href="#">{match.teams}</a>
                  </div>
                </div>
                <div className={styles.matchBtn}>
                  <a href="#">
                    {match.status}
                    {match.openDate && <span>{match.openDate}</span>}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
