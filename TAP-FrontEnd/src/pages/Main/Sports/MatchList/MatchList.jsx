import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../../../config/config'; // API 호출을 위한 설정
import styles from './MatchList.module.css';
import { useOrder } from '../../../../store/store';
import { BookModal } from '../../../../components/BookModal/BookModal';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useAuthStore } from '../../../../store/store';
import Swal from 'sweetalert2';

export const MatchList = () => {
  const [isBaseballTeamSelectOpen, setIsBaseballTeamSelectOpen] = useState(false);
  const [isSoccerTeamSelectOpen, setIsSoccerTeamSelectOpen] = useState(false);
  const [baseballMatches, setBaseballMatches] = useState([]);
  const [soccerMatches, setSoccerMatches] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { setDate, setTime, setSeq, setMainData, setSeatPrices, setCompany ,seatPrices} = useOrder();
  const { token } = useAuthStore();
  const [bookModal, setBookModal] = useState(false);
  const { seq } = location.state || {}; // 전달된 state가 있으면 가져옴
  const [soccerSeatPrices, setSoccerPrices] = useState([]);
  const [baseballSeatPrices, setBaseballPrices] = useState([]);

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
  }, [seq]);

  const getSeatPricesByPlaceSeq = (placeSeq, sport) => {
    let filteredSeats = [];

    if (sport === 'baseball') {
      filteredSeats = baseballSeatPrices.filter(seat => seat.place_seq === placeSeq);
    } else if (sport === 'soccer') {
      filteredSeats = soccerSeatPrices.filter(seat => seat.place_seq === placeSeq);
    }

    console.log("placeSeq:", placeSeq);  // placeSeq 값 확인
    console.log("filteredSeats:", filteredSeats);  // 필터링된 좌석 정보 확인

    setSeatPrices(filteredSeats); // 좌석 정보를 상태로 설정 (useOrder의 setSeatPrices)
    // setSeatPricesState(filteredSeats); // 로컬 seatPrices 상태 업데이트
    return filteredSeats;
  };

  const toggleBaseballTeamSelect = () => {
    setIsBaseballTeamSelectOpen(!isBaseballTeamSelectOpen);
  };

  const toggleSoccerTeamSelect = () => {
    setIsSoccerTeamSelectOpen(!isSoccerTeamSelectOpen);
  };

  const getHomeTeams = (matches) => {
    if (!matches || !Array.isArray(matches)) {
      console.warn('Matches is undefined or not an array:', matches);
      return [];
    }

    const homeTeams = [];
    matches.forEach((match) => {
      if (match.homeTeamName && !homeTeams.find(team => team.name === match.homeTeamName)) {
        homeTeams.push({ name: match.homeTeamName, logo: match.homeTeamLogo });
      }
    });
    return homeTeams;
  };

  const handleTeamClick = (teamName, teamLogo) => {
    const homeMatch = baseballMatches.find(match => match.homeTeamName === teamName);
    const homeMatchs = soccerMatches.find(match => match.homeTeamName === teamName);

    if (!homeMatch && !homeMatchs) {
      console.warn("해당 팀의 경기가 없습니다:", teamName);
      return;
    }

    const homeGround = homeMatch ? homeMatch.place_name : homeMatchs ? homeMatchs.place_name : "정보 없음";
    const baseballMatchesFiltered = baseballMatches.filter(
      match => match.homeTeamName === teamName || match.awayTeamName === teamName
    );

    const soccerMatchesFiltered = soccerMatches.filter(
      match => match.homeTeamName === teamName || match.awayTeamName === teamName
    );

    const matches = [...baseballMatchesFiltered, ...soccerMatchesFiltered];

    const seatPrices = baseballMatchesFiltered.length > 0 
      ? baseballSeatPrices.filter(seat => baseballMatchesFiltered.some(match => seat.place_seq === match.place_seq))
      : soccerSeatPrices.filter(seat => soccerMatchesFiltered.some(match => seat.place_seq === match.place_seq));

    console.log("Filtered seat prices for selected team:", seatPrices);

    navigate('/teamPage', {
      state: {
        teamName,
        teamLogo,
        homeGround,
        matches,
        seatPrices  // 좌석 가격 정보만 전달
      },
    });
  };

  const formatMatchDate = (startDate) => {
    const date = parseISO(startDate);
    return format(date, 'yyyy-MM-dd (eee)', { locale: ko });
  };

  const formatMatchTime = (startDate) => {
    const date = parseISO(startDate);
    return format(date, 'HH:mm', { locale: ko });
  };

  const formatOpenDate = (openDate) => {
    const date = parseISO(openDate);
    return format(date, 'yyyy-MM-dd (eee)', { locale: ko });
  };

  const isOpenNow = (openDate) => {
    const now = new Date();
    return new Date(openDate) <= now;
  };

  const sortedBaseballMatches = baseballMatches
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 6);

  const sortedSoccerMatches = soccerMatches
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 6);

  useEffect(() => {
    if (bookModal) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto'; 
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [bookModal]);

 // 매치 종류에 상관없이 좌석 가격을 통합하여 설정
const isBookModalOpen = async (match) => {
  console.log("isBookModalOpen 호출됨", match);

  if (!match || !match.name || !match.place_name) {
    await Swal.fire({
      icon: 'warning',
      title: '경기 정보를 불러올 수 없습니다.',
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  if (token !== null) {
    console.log("Token is valid");

    if (!match.startDate || !match.openDate) {
      await Swal.fire({
        icon: 'warning',
        title: '경기 정보를 불러올 수 없습니다.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const formattedDate = formatMatchDate(match.startDate);
    const formattedTime = formatMatchTime(match.startDate);

    // 경기 정보 저장
    setDate(formattedDate);
    setTime(formattedTime);
    setSeq(match.application_seq);

    // 야구와 축구의 좌석 가격 데이터를 통합
    const allSeatPrices = [...baseballSeatPrices, ...soccerSeatPrices];
    const seatPricesToSet = allSeatPrices.filter(seat => seat.place_seq === match.place_seq);

    console.log('Setting seatPrices for match:', seatPricesToSet);

    // 경기 정보와 좌석 데이터를 함께 저장
    setMainData({
      name: match.name || '정보 없음',
      place_name: match.place_name || '정보 없음',
      place_seq: match.place_seq,
      max_ticket: match.max_ticket,
      start_date: match.startDate,
      end_date: match.endDate,
      age_limit: match.age_limit,
      id: match.id,
      status: match.status,
      sub_category_seq: match.sub_category_seq,
      setSeatPrices: seatPricesToSet  // 통합된 좌석 가격 데이터를 넘김
    });

    // 좌석 가격 데이터를 setSeatPrices로 설정
    setSeatPrices(seatPricesToSet);

    // 예매 모달 열기
    setBookModal(true);
  } else {
    await Swal.fire({
      icon: 'warning',
      title: '로그인 후 예매가 가능합니다.',
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/login');
  }
};

  

  const closeBookModal = () => {
    setBookModal(false);
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
            {sortedBaseballMatches.map((match, index) => (
              <div key={index} className={styles.matchCard}>
                <div className={styles.matchContent}>
                  <div className={styles.teamMatch}>
                    <div className={styles.team1}>
                      <img src={match.homeTeamLogo} alt="팀 1" className={styles.teamLogo} />
                      <div className={styles.teamName}>{match.homeTeamName}</div>
                    </div>
                    <div className={styles.vsText}>VS</div>
                    <div className={styles.team2}>
                      <img src={match.awayTeamLogo} alt="팀 2" className={styles.teamLogo} />
                      <div className={styles.teamName}>{match.awayTeamName}</div>
                    </div>
                  </div>
                  <div className={styles.matchDate}>
                    <span>{formatMatchDate(match.startDate)}</span>
                    <span className={styles.matchTime}>{formatMatchTime(match.startDate)}</span>
                  </div>
                  <div className={styles.matchLocation}>
                    <span>장소: {match.place_name}</span>
                  </div>
                </div>
                <div className={styles.matchBtns}>
  {isOpenNow(match.openDate) ? (
    <button className={styles.matchBtn} onClick={() => isBookModalOpen(match)}>
      예매하기
    </button>
  ) : (
    <span className={styles.matchBtn}>{formatOpenDate(match.openDate)} 오픈 예정</span>
  )}
</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 축구 섹션 */}
      <div className={styles.soccerSection}>
        <div className={styles.sportTitle}>
          <span className={styles.soccerText}>
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
                      <img src={match.homeTeamLogo} alt="팀 1" className={styles.teamLogo} />
                      <div className={styles.teamName}>{match.homeTeamName}</div>
                    </div>
                    <div className={styles.vsText}>VS</div>
                    <div className={styles.team2}>
                      <img src={match.awayTeamLogo} alt="팀 2" className={styles.teamLogo} />
                      <div className={styles.teamName}>{match.awayTeamName}</div>
                    </div>
                  </div>
                  <div className={styles.matchDate}>
                    <span>{formatMatchDate(match.startDate)}</span>
                    <span className={styles.matchTime}>{formatMatchTime(match.startDate)}</span>
                  </div>
                  <div className={styles.matchLocation}>
                    <span>장소: {match.place_name}</span>
                  </div>
                </div>
                   <div className={styles.matchBtns}>
  {isOpenNow(match.openDate) ? (
    <button className={styles.matchBtn} onClick={() => isBookModalOpen(match)}>
      예매하기
    </button>
  ) : (
    <span className={styles.matchBtn}>{formatOpenDate(match.openDate)} 오픈 예정</span>
  )}
</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 예매 모달 */}
      <BookModal isOpen={bookModal} onClose={closeBookModal} />
    </div>
  );
};