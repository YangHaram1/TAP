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
  const {setDate, setTime, setSeq,  setMainData, setSeatPrices, setCompany} = useOrder();
  const { token } = useAuthStore();
  const [bookModal, setBookModal] = useState(false);
  const { seq } = location.state || {}; // 전달된 state가 있으면 가져옴

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 야구 매치 데이터 가져오기
        const baseballResponse = await api.get('/matchlist/baseball');
        const baseballData = baseballResponse.data;
        const baseballMatches = Array.isArray(baseballData.matches) ? baseballData.matches : [];
        
        // 축구 매치 데이터 가져오기
        const soccerResponse = await api.get('/matchlist/soccer');
        const soccerData = soccerResponse.data;
        const soccerMatches = Array.isArray(soccerData.matches) ? soccerData.matches : [];
        
        // 야구와 축구 좌석 가격 통합 처리
        const allSeatPrices = [...(soccerData.seats || []), ...(baseballData.seats || [])];
        console.log('Baseball Seats:', baseballData.seats);
console.log('Soccer Seats:', soccerData.seats);
        // company 데이터도 병합 가능
        const allCompanies = [...(baseballData.company || []), ...(soccerData.company || [])];
  
        // 데이터 상태 업데이트
        setBaseballMatches(baseballMatches);
        setSoccerMatches(soccerMatches);
        setSeatPrices(allSeatPrices);
        setCompany(allCompanies);
  
      } catch (error) {
        console.error('Error fetching match data:', error.response ? error.response.data : error.message);
      }
    };
  
    fetchData();
  }, [seq]);
  
  // place_seq에 따른 좌석 가격 필터링 함수
  const getSeatPricesByPlaceSeq = (placeSeq) => {
    return setSeatPrices.filter(seat => seat.place_seq === placeSeq);
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
    // 야구 경기 확인
    const homeMatch = baseballMatches.find(match => match.homeTeamName === teamName);
    // 축구 경기 확인
    const homeMatchs = soccerMatches.find(match => match.homeTeamName === teamName);
    
    // 두 경기가 모두 없을 경우 경고 메시지 출력
    if (!homeMatch && !homeMatchs) {
      console.warn("해당 팀의 경기가 없습니다:", teamName);
      return; // 경기가 없을 경우 함수 종료
    }
  
    // 홈 구장 정보 설정
    const homeGround = homeMatch ? homeMatch.place_name : homeMatchs ? homeMatchs.place_name : "정보 없음"; 
  
    // 야구 경기 필터링
    const baseballMatchesFiltered = baseballMatches.filter(
      match => match.homeTeamName === teamName || match.awayTeamName === teamName
    );
  
    // 축구 경기 필터링
    const soccerMatchesFiltered = soccerMatches.filter(
      match => match.homeTeamName === teamName || match.awayTeamName === teamName
    );
  
    // 모든 경기를 통합
    const matches = [...baseballMatchesFiltered, ...soccerMatchesFiltered];
  
    console.log("홈 구장:", homeGround);
    console.log("매치들:", matches);
  
    navigate('/teamPage', {
      state: { teamName, teamLogo, homeGround, matches },
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
      document.body.style.overflow = 'hidden'; // 스크롤 비활성화
    } else {
      document.body.style.overflow = 'auto'; // 스크롤 활성화
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [bookModal]);

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
     

      setDate(formattedDate);
      setTime(formattedTime);
      setSeq(match.application_seq);

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
        sub_category_seq: match.sub_category_seq
        
      });



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
                <div className={styles.matchBtn}>
                  {isOpenNow(match.openDate) ? (
                    <button onClick={() => isBookModalOpen(match)}>예매하기</button>
                  ) : (
                    <span className={styles.openScheduled}>{formatOpenDate(match.openDate)} 오픈 예정</span>
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
          <div className={styles.matchBtn}>
            {isOpenNow(match.openDate) ? (
              <button onClick={() => isBookModalOpen(match)}>예매하기</button>
            ) : (
              <span className={styles.openScheduled}>{formatOpenDate(match.openDate)} 오픈 예정</span>
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