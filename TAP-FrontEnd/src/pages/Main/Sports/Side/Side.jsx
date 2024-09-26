import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Side.module.css';
import { useOrder } from '../../../../store/store';

export const Side = ({ baseballMatches = {}, soccerMatches = {}, baseballSeats = [], soccerSeats = [] }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const { setSeatPrices } = useOrder();

  useEffect(() => {
    console.log("Baseball Seats: ", baseballSeats);
    console.log("Soccer Seats: ", soccerSeats);
  }, [baseballSeats, soccerSeats]);

  const handleTeamClick = (teamName, teamLogo) => {
    const homeMatch = baseballMatches.matches.find(match => match.homeTeamName === teamName);
    const awayMatch = soccerMatches.matches.find(match => match.homeTeamName === teamName);

    // Determine the home ground based on matches
    const homeGround = homeMatch ? homeMatch.place_name : awayMatch ? awayMatch.place_name : "정보 없음";
    
    // Filter matches for the selected team
    const baseballMatchesFiltered = baseballMatches.matches.filter(
      match => match.homeTeamName === teamName || match.awayTeamName === teamName
    );
    const soccerMatchesFiltered = soccerMatches.matches.filter(
      match => match.homeTeamName === teamName || match.awayTeamName === teamName
    );

    const matches = [...baseballMatchesFiltered, ...soccerMatchesFiltered];

    // Find seat prices for baseball and soccer
    const baseballSeatPricesFiltered = baseballSeats.filter(seat =>
      baseballMatchesFiltered.some(match => seat.place_seq === match.place_seq)
    );

    const soccerSeatPricesFiltered = soccerSeats.filter(seat =>
      soccerMatchesFiltered.some(match => seat.place_seq === match.place_seq)
    );

    // Combine both seat prices
    const combinedSeatPrices = [...baseballSeatPricesFiltered, ...soccerSeatPricesFiltered];

    // Set the combined seat prices in the global state
    setSeatPrices(combinedSeatPrices);

    // Navigate to the TeamPage with all necessary data
    navigate('/teamPage', {
      state: {
        teamName,
        teamLogo,
        homeGround,
        matches,
        seatPrices: combinedSeatPrices, // Ensure the seat prices are passed correctly
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
    if (!Array.isArray(matches)) return [];
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
            {getUniqueTeams(soccerMatches.matches || []).map((match, index) => (
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
