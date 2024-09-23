import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Side.module.css'; // CSS 모듈 임포트

export const Side = ({ baseballMatches = [], soccerMatches = [] }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const handleTeamClick = (teamName, teamLogo) => {
    const homeMatch = baseballMatches.find(match => match.homeTeamName === teamName);
    
    if (!homeMatch) {
      console.warn("해당 팀의 경기가 없습니다:", teamName);
      return; // 경기가 없을 경우 함수 종료
    }

    const homeGround = homeMatch.placeName || "정보 없음"; // placeName으로 수정
    const matches = baseballMatches.filter(
      match => match.homeTeamName === teamName || match.awayTeamName === teamName
    );

    console.log("홈 구장:", homeGround);
    console.log("매치들:", matches);

    navigate('/teamPage', {
      state: { teamName, teamLogo, homeGround, matches },
    });
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  const getUniqueTeams = (matches) => {
    const teamSet = new Set();
    return matches.filter((match) => {
      const isDuplicate = teamSet.has(match.homeTeamName);
      teamSet.add(match.homeTeamName);
      return !isDuplicate;
    });
  };

  return (
    <div className={styles.side}>
      <ul className={styles.menuWrap}>
        {/* 야구 메뉴 */}
        <li className={`${styles.menuList} ${styles.childBtn}`}>
          <p>
            <a href="javascript:;" onClick={() => toggleMenu('baseball')}>
              야구
              <span className={styles.listBtn}></span>
            </a>
          </p>
          <ul className={`${styles.subMenu} ${openMenu === 'baseball' ? styles.open : ''}`} onClick={preventPropagation}>
            {getUniqueTeams(baseballMatches).map((match, index) => (
              <li key={index}>
                <a
                  href="javascript:;"
                  onClick={() => handleTeamClick(
                    match.homeTeamName,
                    match.homeTeamLogo // 로고는 match에서 가져옴
                  )}
                >
                  {match.homeTeamName}
                </a>
              </li>
            ))}
          </ul>
        </li>

        {/* 축구 메뉴 */}
        <li className={`${styles.menuList} ${styles.childBtn}`}>
          <p>
            <a href="javascript:;" onClick={() => toggleMenu('soccer')}>
              축구
              <span className={styles.listBtn}></span>
            </a>
          </p>
          <ul className={`${styles.subMenu} ${openMenu === 'soccer' ? styles.open : ''}`} onClick={preventPropagation}>
            {getUniqueTeams(soccerMatches).map((match, index) => (
              <li key={index}>
                <a
                  href="javascript:;"
                  onClick={() => handleTeamClick(
                    match.homeTeamName,
                    match.homeTeamLogo // 로고는 match에서 가져옴
                  )}
                >
                  {match.homeTeamName}
                </a>
              </li>
            ))}
          </ul>
        </li>

        {/* 스토어 메뉴 */}
        <li className={`${styles.menuList} ${styles.childBtn}`}>
          <p>
            <a href="javascript:;" onClick={() => toggleMenu('store')}>
              스토어
              <span className={styles.listBtn}></span>
            </a>
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
