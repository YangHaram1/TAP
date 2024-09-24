import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Side.module.css'; // CSS 모듈 임포트
import { useOrder } from '../../../../store/store'; // useOrder 임포트

export const Side = ({ baseballMatches = [], soccerMatches = [], baseballSeatPrices = [], soccerSeatPrices = [] }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  
  // useOrder 훅에서 필요한 값과 함수를 가져옴
  const { setDate, setTime, setSeq, setMainData, setSeatPrices } = useOrder();

  // useEffect로 데이터 확인
  useEffect(() => {
    console.log("baseballSeatPrices:", baseballSeatPrices);
    console.log("soccerSeatPrices:", soccerSeatPrices);
  }, [baseballSeatPrices, soccerSeatPrices]);

  const handleTeamClick = (teamName, teamLogo) => {
    // 야구 및 축구 경기 필터링
    const baseballMatchesFiltered = baseballMatches.matches?.filter(
      match => match.homeTeamName === teamName || match.awayTeamName === teamName
    ) || [];

    const soccerMatchesFiltered = soccerMatches.matches?.filter(
      match => match.homeTeamName === teamName || match.awayTeamName === teamName
    ) || [];

    // 모든 경기를 통합
    const matches = [...baseballMatchesFiltered, ...soccerMatchesFiltered];

    // 홈 구장 정보 설정
    const homeGround = baseballMatchesFiltered[0]?.place_name || soccerMatchesFiltered[0]?.place_name || "정보 없음";

    // 야구와 축구 좌석 가격을 통합 (필터링하지 않고 그대로 사용)
    const allSeatPrices = [...baseballSeatPrices, ...soccerSeatPrices];

    // 좌석 가격 로그 확인
    console.log("좌석 가격들 (allSeatPrices):", allSeatPrices);
    if (allSeatPrices === undefined) {
      console.warn("allSeatPrices가 undefined입니다. 데이터가 제대로 전달되지 않았습니다.");
    } else if (allSeatPrices.length === 0) {
      console.warn("좌석 가격 정보가 비어 있습니다.");
    } else {
      allSeatPrices.forEach((seat, index) => {
        console.log(`좌석 ${index}:`, seat);
      });
    }

    // useOrder로 불러온 함수를 사용하여 필요한 데이터를 설정
    setSeatPrices(allSeatPrices); // 모든 좌석 가격 정보를 설정

    // 메인 데이터 설정
    setMainData({
      setDate,
      setSeq,
      setTime,
      teamName,
      teamLogo,
      homeGround,
      matches,
      seatPrices: allSeatPrices, // 전체 좌석 가격 정보
    });

    // teamPage로 seatPrices를 함께 전달
    navigate('/teamPage', {
      state: {
        teamName,
        teamLogo,
        homeGround,
        matches,
        seatPrices: allSeatPrices, // 전체 좌석 가격 정보 전달
      },
    });
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  const getUniqueTeams = (matches) => {
    if (!Array.isArray(matches)) return []; // matches가 배열이 아닌 경우 빈 배열 반환
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
            {getUniqueTeams(baseballMatches.matches || []).map((match, index) => (
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
            {getUniqueTeams(soccerMatches.matches || []).map((match, index) => (
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
