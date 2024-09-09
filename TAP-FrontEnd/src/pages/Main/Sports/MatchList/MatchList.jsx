import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
import styles from './MatchList.module.css';

// 야구 경기 데이터
const baseballMatchData = [
  {
    team1: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB004.png",
    team2: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB009.png",
    date: "2024.09.13 18:30",
    location: "잠실야구장",
    teams: "두산 베어스 VS NC 다이노스",
    status: "판매예정",
    openDate: "09월 06일 11시 오픈",
  },
  {
    team1: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB003.png",
    team2: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB004.png",
    date: "2024.09.10 18:30",
    location: "고척스카이돔",
    teams: "키움 히어로즈 VS 두산 베어스",
    status: "예매하기",
    openDate: "",
  },
  {
    team1: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB004.png",
    team2: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB025.png",
    date: "2024.09.25 18:30",
    location: "잠실야구장",
    teams: "두산 베어스 VS 삼성 라이온즈",
    status: "판매예정",
    openDate: "09월 16일 11시 오픈",
  },
];

// 축구 경기 데이터
const soccerMatchData = [
  {
    team1: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB001.png",
    team2: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB002.png",
    date: "2024.09.20 17:00",
    location: "서울월드컵경기장",
    teams: "FC 서울 VS 인천 유나이티드",
    status: "예매하기",
    openDate: "",
  },
  {
    team1: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB010.png",
    team2: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB011.png",
    date: "2024.09.17 19:00",
    location: "수원월드컵경기장",
    teams: "수원 삼성 VS 전북 현대",
    status: "예매하기",
    openDate: "",
  },
  {
    team1: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB012.png",
    team2: "http://ticketimage.interpark.com/TicketImage/sports/web/small/PB013.png",
    date: "2024.09.25 18:00",
    location: "인천축구전용경기장",
    teams: "인천 유나이티드 VS 제주 유나이티드",
    status: "예매하기",
    openDate: "",
  },
];

// 구단 목록 (야구 및 축구 구단 리스트)
const baseballTeamList = [
  { name: '두산 베어스', logo: 'http://ticketimage.interpark.com/TicketImage/sports/web/small/PB004.png', homeGround: '잠실야구장' },
  { name: '키움 히어로즈', logo: 'http://ticketimage.interpark.com/TicketImage/sports/web/small/PB003.png', homeGround: '고척스카이돔' },
  { name: 'NC 다이노스', logo: 'http://ticketimage.interpark.com/TicketImage/sports/web/small/PB009.png', homeGround: '창원NC파크' }
];

const soccerTeamList = [
  { name: 'FC 서울', logo: 'http://ticketimage.interpark.com/TicketImage/sports/web/small/PB001.png', homeGround: '서울월드컵경기장' },
  { name: '수원 삼성', logo: 'http://ticketimage.interpark.com/TicketImage/sports/web/small/PB010.png', homeGround: '수원월드컵경기장' },
  { name: '인천 유나이티드', logo: 'http://ticketimage.interpark.com/TicketImage/sports/web/small/PB012.png', homeGround: '인천축구전용경기장' }
];

export const MatchList = () => {
  const [isBaseballTeamSelectOpen, setIsBaseballTeamSelectOpen] = useState(false); // 야구 구단 선택 슬라이드 상태
  const [isSoccerTeamSelectOpen, setIsSoccerTeamSelectOpen] = useState(false); // 축구 구단 선택 슬라이드 상태
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 각 팀에 해당하는 경기 일정
  const teamMatches = {
    '두산 베어스': [
      { date: '2024-09-10', opponent: '롯데 자이언츠' },
      { date: '2024-09-15', opponent: '삼성 라이온즈' },
    ],
    '키움 히어로즈': [
      { date: '2024-09-12', opponent: 'LG 트윈스' },
      { date: '2024-09-20', opponent: '한화 이글스' },
    ],
    'NC 다이노스': [
      { date: '2024-09-22', opponent: 'SK 와이번스' },
      { date: '2024-09-25', opponent: '두산 베어스' },
    ],
    'FC 서울': [
      { date: '2024-09-08', opponent: '인천 유나이티드' },
      { date: '2024-09-18', opponent: '수원 삼성' },
    ],
    '수원 삼성': [
      { date: '2024-09-09', opponent: 'FC 서울' },
      { date: '2024-09-16', opponent: '전북 현대' },
    ],
    '인천 유나이티드': [
      { date: '2024-09-11', opponent: '제주 유나이티드' },
      { date: '2024-09-21', opponent: '포항 스틸러스' },
    ],
  };

  // 야구 구단 선택 슬라이드 열기/닫기
  const toggleBaseballTeamSelect = () => {
    setIsBaseballTeamSelectOpen(!isBaseballTeamSelectOpen);
  };

  // 축구 구단 선택 슬라이드 열기/닫기
  const toggleSoccerTeamSelect = () => {
    setIsSoccerTeamSelectOpen(!isSoccerTeamSelectOpen);
  };

  // 구단 클릭 시 팀 페이지로 이동 (경기 일정 포함)
  const handleTeamClick = (teamName, teamLogo, homeGround) => {
    const matches = teamMatches[teamName] || [];
    navigate('/teamPage', {
      state: { teamName, teamLogo, homeGround, matches },
    });
  };

  return (
    <div className={styles.container}>
      {/* 야구 섹션 */}
      <div className={styles.baseballSection}>
        <div className={styles.sportTitle}>
          <a href="javascript:;" onClick={toggleBaseballTeamSelect}>
            야구 구단선택
          </a>
        </div>

        {/* 야구 구단 선택 슬라이드 패널 */}
        <div className={`${styles.teamSelect} ${isBaseballTeamSelectOpen ? styles.slideDown : styles.slideUp}`}>
          <div className={styles.teamList}>
            <div className={styles.itemWrap}>
              {baseballTeamList.map((team, index) => (
                <div key={index} className={styles.items}>
                  <a
                    href="javascript:;"
                    onClick={() => handleTeamClick(team.name, team.logo, team.homeGround)}
                  >
                    <span className={styles.teamLogo}>
                      <img src={team.logo} alt={team.name} />
                      <span className={styles.teamName}>{team.name}</span> {/* 추가된 클래스 */}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 야구 경기 리스트 */}
        <div className={styles.matchSelect}>
          <div className={styles.itemWrap}>
            {baseballMatchData.map((match, index) => (
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
    <span>{match.status}</span><br></br>
    {match.openDate && <span className={styles.matchStatus}>{match.openDate}</span>}
  </a>
</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 축구 섹션 */}
      <div className={styles.soccerSection}>
        <div className={styles.sportTitle}>
          <a href="javascript:;" onClick={toggleSoccerTeamSelect}>
            축구 구단선택
          </a>
        </div>

        {/* 축구 구단 선택 슬라이드 패널 */}
        <div className={`${styles.teamSelect} ${isSoccerTeamSelectOpen ? styles.slideDown : styles.slideUp}`}>
          <div className={styles.teamList}>
            <div className={styles.itemWrap}>
              {soccerTeamList.map((team, index) => (
                <div key={index} className={styles.items}>
                  <a
                    href="javascript:;"
                    onClick={() => handleTeamClick(team.name, team.logo, team.homeGround)}
                  >
                    <span className={styles.teamLogo}>
                      <img src={team.logo} alt={team.name} />
                    </span>
                    <span>{team.name}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 축구 경기 리스트 */}
        <div className={styles.matchSelect}>
          <div className={styles.itemWrap}>
            {soccerMatchData.map((match, index) => (
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
                  <a href="#">{match.status}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
