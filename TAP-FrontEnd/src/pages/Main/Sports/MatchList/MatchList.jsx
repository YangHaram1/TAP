import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../config/config'; // API 호출을 위한 설정
import styles from './MatchList.module.css';

export const MatchList = () => {
  const [isBaseballTeamSelectOpen, setIsBaseballTeamSelectOpen] = useState(false);
  const [isSoccerTeamSelectOpen, setIsSoccerTeamSelectOpen] = useState(false);
  const [baseballMatches, setBaseballMatches] = useState([]);
  const [soccerMatches, setSoccerMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/matchlist/baseball')
      .then((response) => {
        setBaseballMatches(response.data);
      })
      .catch((error) => {
        console.error('Error fetching baseball match data:', error.response ? error.response.data : error.message);
      });

    api.get('/matchlist/soccer')
      .then((response) => {
        setSoccerMatches(response.data);
      })
      .catch((error) => {
        console.error('Error fetching soccer match data:', error.response ? error.response.data : error.message);
      });
  }, []);

  const toggleBaseballTeamSelect = () => {
    setIsBaseballTeamSelectOpen(!isBaseballTeamSelectOpen);
  };

  const toggleSoccerTeamSelect = () => {
    setIsSoccerTeamSelectOpen(!isSoccerTeamSelectOpen);
  };

  const getHomeTeams = (matches) => {
    const homeTeams = [];
    matches.forEach((match) => {
      if (!homeTeams.find(team => team.name === match.HOME_TEAM_NAME)) {
        homeTeams.push({ name: match.HOME_TEAM_NAME, logo: match.HOME_TEAM_LOGO });
      }
    });
    return homeTeams;
  };

  const handleTeamClick = (teamName, teamLogo) => {
    const homeMatch = baseballMatches.find(match => match.HOME_TEAM_NAME === teamName);
    const homeGround = homeMatch ? homeMatch.PLACE_NAME : "정보 없음";
    const matches = baseballMatches.filter(
      match => match.HOME_TEAM_NAME === teamName || match.AWAY_TEAM_NAME === teamName
    );
    navigate('/teamPage', {
      state: { teamName, teamLogo, homeGround, matches },
    });
  };

  const formatOpenDate = (openDate) => {
    const date = new Date(openDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
  };

  // 오픈 예정인지 여부 확인하는 함수
  const isOpenNow = (openDate) => {
    const today = new Date();
    const openDateObj = new Date(today.getFullYear(), openDate.split('-')[0] - 1, openDate.split('-')[1].split(' ')[0], openDate.split(' ')[1].split(':')[0], openDate.split(' ')[1].split(':')[1]);
    return openDateObj <= today;
  };

  const sortedBaseballMatches = baseballMatches
  .sort((a, b) => new Date(a.START_DATE) - new Date(b.START_DATE))
  .slice(0, 6);
const sortedSoccerMatches = soccerMatches
  .sort((a, b) => new Date(a.START_DATE) - new Date(b.START_DATE))
  .slice(0, 6);

  return (
    <div className={styles.container}>
    {/* 야구 섹션 */}
    <div className={styles.baseballSection}>
      <div className={styles.sportTitle}>
        <span className={styles.baseballText}>
          야구 <span className={styles.englishText}>| BASEBALL</span>
        </span>
        <span className={styles.selectTeamText} onClick={toggleBaseballTeamSelect}>
          구단선택
        </span>
      </div>
      <div className={`${styles.teamSelect} ${isBaseballTeamSelectOpen ? styles.slideDown : styles.slideUp}`}>
        <div className={styles.teamList}>
          {getHomeTeams(baseballMatches).map((team, index) => (
            <div key={index} className={styles.teamItem} onClick={() => handleTeamClick(team.name, team.logo)}>
              <img src={team.logo} alt={team.name} className={styles.teamLogo} />
              <span>{team.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.matchSelect}>
        <div className={styles.itemWrap}>
          {sortedBaseballMatches.map((match, index) => (
            <div key={index} className={styles.matchCard}>
              <div className={styles.matchContent}>
                <div className={styles.teamMatch}>
                  <div className={styles.team1}>
                    <img src={match.HOME_TEAM_LOGO} alt="팀 1" className={styles.teamLogo} />
                    <div className={styles.teamName}>{match.HOME_TEAM_NAME}</div>
                  </div>
                  <div className={styles.vsText}>VS</div>
                  <div className={styles.team2}>
                    <img src={match.AWAY_TEAM_LOGO} alt="팀 2" className={styles.teamLogo} />
                    <div className={styles.teamName}>{match.AWAY_TEAM_NAME}</div>
                  </div>
                </div>
                <div className={styles.matchDate}>
                  <span>{match.START_DATE}</span>
                </div>
                <div className={styles.matchLocation}>
                  <span>장소: {match.PLACE_NAME}</span>
                </div>
              </div>
              <div className={styles.matchBtn}>
                {isOpenNow(match.OPEN_DATE) ? (
                  <span>예매하기</span>
                ) : (
                  <span className={styles.openScheduled}>{formatOpenDate(match.OPEN_DATE)} 오픈 예정</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  
      {/* 축구 섹션 */}
      <div className={styles.soccerSection}>
        <div className={styles.sportsTitleFootball}>
          <span className={styles.baseballText}>
            축구 <span className={styles.englishText}>| SOCCER</span>
          </span>
          <span className={styles.selectTeamText} onClick={toggleSoccerTeamSelect}>
            구단선택
          </span>
        </div>
        <div className={`${styles.teamSelect} ${isSoccerTeamSelectOpen ? styles.slideDown : styles.slideUp}`}>
          <div className={styles.teamList}>
            {getHomeTeams(soccerMatches).map((team, index) => (
              <div key={index} className={styles.teamItem} onClick={() => handleTeamClick(team.name, team.logo)}>
                <img src={team.logo} alt={team.name} className={styles.teamLogo} />
                <span>{team.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.matchSelect}>
          <div className={styles.itemWrap}>
            {sortedSoccerMatches.map((match, index) => (
              <div key={index} className={styles.matchCard}>
                <div className={styles.matchContent}>
                  <div className={styles.teamMatch}>
                    <div className={styles.team1}>
                      <img src={match.HOME_TEAM_LOGO} alt="팀 1" className={styles.teamLogo} />
                      <div className={styles.teamName}>{match.HOME_TEAM_NAME}</div>
                    </div>
                    <div className={styles.vsText}>VS</div>
                    <div className={styles.team2}>
                      <img src={match.AWAY_TEAM_LOGO} alt="팀 2" className={styles.teamLogo} />
                      <div className={styles.teamName}>{match.AWAY_TEAM_NAME}</div>
                    </div>
                  </div>
                  <div className={styles.matchDate}>
                    <span>{match.START_DATE}</span>
                  </div>
                  <div className={styles.matchLocation}>
                    <span>장소: {match.PLACE_NAME}</span>
                  </div>
                </div>
                <div className={styles.matchBtn}>
                  {isOpenNow(match.OPEN_DATE) ? (
                    <span>예매하기</span>
                  ) : (
                    <span>{formatOpenDate(match.OPEN_DATE)} 오픈 예정</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};