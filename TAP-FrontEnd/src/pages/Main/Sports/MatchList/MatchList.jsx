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
    // 서버에서 야구 경기 데이터 가져오기
    api.get('/matchlist/baseball')
      .then((response) => {
        setBaseballMatches(response.data);
      })
      .catch((error) => {
        console.error('Error fetching baseball match data:', error.response ? error.response.data : error.message);
      });

    // 서버에서 축구 경기 데이터 가져오기
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

  // 홈팀 필터링 함수
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
    const matches = baseballMatches.filter(match => match.HOME_TEAM_NAME === teamName || match.AWAY_TEAM_NAME === teamName);
    
    // 홈구장 정보 추출 (가장 첫 번째 경기를 사용한다고 가정)
    const homeGround = matches.length > 0 ? matches[0].PLACE_NAME : "정보 없음";
  
    navigate('/teamPage', {
      state: { teamName, teamLogo, homeGround, matches },
    });
  };
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
            {baseballMatches.map((match, index) => (
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
                  <span>예매하기</span>
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
            {soccerMatches.map((match, index) => (
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
                  <span>{match.OPEN_DATE}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
