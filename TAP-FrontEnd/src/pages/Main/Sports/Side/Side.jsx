import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Side.module.css';
import { useOrder } from '../../../../store/store';
import { api } from '../../../../config/config';

export const Side = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [baseballMatches, setBaseballMatches] = useState([]);
  const [soccerMatches, setSoccerMatches] = useState([]);
  const [soccerSeatPrices, setSoccerPrices] = useState([]);
  const [baseballSeatPrices, setBaseballPrices] = useState([]);
  // 팀 정보 및 좌석 정보는 useLocation의 상태에서 가져오기

  const { setDate, setTime, setSeq, setMainData, setSeatPrices, setCompany ,seatPrices} = useOrder();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 야구 매치 데이터 가져오기
        const baseballResponse = await api.get('/matchlist/baseball');
        const baseballData = baseballResponse.data;
        const baseballMatches = Array.isArray(baseballData.matches) ? baseballData.matches : [];
        console.log('Baseball API response:', baseballResponse.data); // 야구 데이터 확인

        // 축구 매치 데이터 가져오기
        const soccerResponse = await api.get('/matchlist/soccer');
        const soccerData = soccerResponse.data;
        const soccerMatches = Array.isArray(soccerData.matches) ? soccerData.matches : [];

        // 좌석 데이터를 각각 저장
        setBaseballPrices(baseballData.baseballSeats || []);
        setSoccerPrices(soccerData.soccerSeats || []);

        // company 데이터도 병합 가능
        const allCompanies = [...(baseballData.company || []), ...(soccerData.company || [])];

        // 데이터 상태 업데이트
        setBaseballMatches(baseballMatches);
        setSoccerMatches(soccerMatches);
        setCompany(allCompanies);

      } catch (error) {
        console.error('Error fetching match data:', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  // 모든 좌석 가격을 결합
  const allSeatPrices = [...baseballSeatPrices, ...soccerSeatPrices];

  const handleTeamClick = (teamName, teamLogo) => {
    const homeMatch = baseballMatches.find(match => match.homeTeamName === teamName);
    const awayMatch = soccerMatches.find(match => match.homeTeamName === teamName);

    // 두 경기가 모두 없을 경우 경고 메시지 출력
    if (!homeMatch && !awayMatch) {
      console.warn("해당 팀의 경기가 없습니다:", teamName);
      return;
    }

    const homeGround = homeMatch?.place_name || awayMatch?.place_name || "정보 없음";

    // 선택된 경기의 place_seq
    const placeSeq = homeMatch?.place_seq || awayMatch?.place_seq;
    console.log("선택된 경기의 place_seq:", placeSeq);

    // 선택된 경기의 좌석 가격 필터링
    const seatPrices = allSeatPrices.filter(seat => seat.place_seq === placeSeq);
    console.log("필터링된 좌석 가격:", seatPrices);

    // 좌석 가격 상태 업데이트
    setSeatPrices(seatPrices); // 여기서 선택된 좌석 가격을 설정합니다.

    // 경기 필터링
    const baseballMatchesFiltered = baseballMatches.filter(
      match => match.homeTeamName === teamName || match.awayTeamName === teamName
    );

    const soccerMatchesFiltered = soccerMatches.filter(
      match => match.homeTeamName === teamName || match.awayTeamName === teamName
    );

    const allMatches = [...baseballMatchesFiltered, ...soccerMatchesFiltered];

    console.log("홈 구장:", homeGround);
    console.log("매치들:", allMatches);
    console.log("좌석 가격:", seatPrices);

    navigate('/teamPage', {
      state: { teamName, teamLogo, homeGround, matches: allMatches, seatPrices },
    });
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  const getUniqueTeams = (matches) => {
    if (!Array.isArray(matches) || matches.length === 0) return [];
    
    const teamSet = new Set();
    return matches.reduce((uniqueTeams, match) => {
      const teamName = match.homeTeamName; // 또는 match.awayTeamName
      if (!teamSet.has(teamName)) {
        teamSet.add(teamName);
        uniqueTeams.push(match); // match 객체를 푸시하여 전체 정보를 유지
      }
      return uniqueTeams;
    }, []);
  };

  return (
    <div className={styles.side}>
      <ul className={styles.menuWrap}>
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
                    match.homeTeamLogo
                  )}
                >
                  {match.homeTeamName}
                </a>
              </li>
            ))}
          </ul>
        </li>

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
                    match.homeTeamLogo
                  )}
                >
                  {match.homeTeamName}
                </a>
              </li>
            ))}
          </ul>
        </li>

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
