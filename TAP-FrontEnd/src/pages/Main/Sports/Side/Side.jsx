import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Side.module.css'; // CSS 모듈 임포트

export const Side = ({ baseballMatches = [], soccerMatches = [] }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const handleTeamClick = (teamName, teamLogo) => {
    const homeMatches = baseballMatches.filter(match => 
      match.homeTeamName === teamName || match.awayTeamName === teamName
    );

    if (homeMatches.length === 0) {
      console.warn("해당 팀의 경기가 없습니다:", teamName);
      return; // 경기가 없을 경우 함수 종료
    }

    const homeGround = homeMatches[0].placeName || "정보 없음"; // 첫 번째 경기의 장소 정보
    console.log("홈 구장:", homeGround);
    console.log("매치들:", homeMatches);

    navigate('/teamPage', {
      state: { teamName, teamLogo, homeGround, matches: homeMatches },
    });
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  const getUniqueTeams = (matches) => {
    if (!Array.isArray(matches)) {
      console.warn("matches는 배열이 아닙니다:", matches);
      return [];
    }

    const teamSet = new Set();
    return matches.flatMap((match) => {
      const teams = [];
      if (!teamSet.has(match.homeTeamName)) {
        teamSet.add(match.homeTeamName);
        teams.push({ name: match.homeTeamName, logo: match.homeTeamLogo });
      }
      if (!teamSet.has(match.awayTeamName)) {
        teamSet.add(match.awayTeamName);
        teams.push({ name: match.awayTeamName, logo: match.awayTeamLogo });
      }
      return teams;
    });
  };

  return (
    <div className={styles.side}>
      <ul className={styles.menuWrap}>
        {/* 야구 메뉴 */}
        <li className={`${styles.menuList} ${styles.childBtn}`}>
          <p>
            <button onClick={() => toggleMenu('baseball')}>
              야구
              <span className={styles.listBtn}></span>
            </button>
          </p>
          <ul className={`${styles.subMenu} ${openMenu === 'baseball' ? styles.open : ''}`} onClick={preventPropagation}>
            {getUniqueTeams(baseballMatches).map((team, index) => (
              <li key={index}>
                <button
                  onClick={() => handleTeamClick(team.name, team.logo || "로고 정보 없음")}
                >
                  {team.name}
                </button>
              </li>
            ))}
          </ul>
        </li>

        {/* 축구 메뉴 */}
        <li className={`${styles.menuList} ${styles.childBtn}`}>
          <p>
            <button onClick={() => toggleMenu('soccer')}>
              축구
              <span className={styles.listBtn}></span>
            </button>
          </p>
          <ul className={`${styles.subMenu} ${openMenu === 'soccer' ? styles.open : ''}`} onClick={preventPropagation}>
            {getUniqueTeams(soccerMatches).map((team, index) => (
              <li key={index}>
                <button
                  onClick={() => handleTeamClick(team.name, team.logo || "로고 정보 없음")}
                >
                  {team.name}
                </button>
              </li>
            ))}
          </ul>
        </li>

        {/* 스토어 메뉴 */}
        <li className={`${styles.menuList} ${styles.childBtn}`}>
          <p>
            <button onClick={() => toggleMenu('store')}>
              스토어
              <span className={styles.listBtn}></span>
            </button>
          </p>
          <ul className={`${styles.subMenu} ${openMenu === 'store' ? styles.open : ''}`} onClick={preventPropagation}>
            <li><a href="https://interparkmdshop.com/category/%ED%82%A4%EC%9B%80%ED%9E%88%EC%96%B4%EB%A1%9C%EC%A6%88/29/">키움히어로즈샵</a></li>
            <li><a href="https://interparkmdshop.com/category/%EB%91%90%EC%82%B0%EB%B2%A0%EC%96%B4%EC%8A%A4/30/">두산베어스샵</a></li>
            <li><a href="https://interparkmdshop.com/category/LG%ED%8A%B8%EC%9C%88%EC%8A%A4/31/">LG트윈스샵</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
