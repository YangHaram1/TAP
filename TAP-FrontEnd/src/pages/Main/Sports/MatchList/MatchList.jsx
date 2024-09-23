  import React, { useState, useEffect } from 'react';
  import { useNavigate,useLocation } from 'react-router-dom';
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
    const {setDate, setTime, setSeq, date, time,  setMainData, seatPrices, setSeatPrices,company, setCompany} = useOrder();
    const { token } = useAuthStore();
    const [bookModal, setBookModal] = useState(false);
    const { seq } = location.state || {};  // 전달된 state가 있으면 가져옴
    

    useEffect(() => {
      api.get('/matchlist/baseball')
        .then((resp) => {
          console.log(resp.data);
          setBaseballMatches(resp.data);
        })
        .catch((error) => {
          console.error('Error fetching baseball match data:', error.resp ? error.resp.data : error.message);

        });

      api.get('/matchlist/soccer')
        .then((resp) => {
          console.log(resp.data);
          setSoccerMatches(resp.data);
        })
        .catch((error) => {
          console.error('Error fetching soccer match data:', error.resp ? error.resp.data : error.message);
        });
    }, [seq]);

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
      const homeGround = homeMatch ? homeMatch.placeSeq : "정보 없음";
      const matches = baseballMatches.filter(
        match => match.homeTeamName === teamName || match.awayTeamName === teamName
      );
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
      return format(date, 'M/d HH:mm', { locale: ko });
    };

    const isOpenNow = (openDate) => {
      return new Date(openDate) <= new Date();
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
    
      // match가 null이 아니고 유효한 객체인지 확인
      if (!match || !match.name || !match.placeName) {
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
    
        // 날짜와 시간을 올바른 형식으로 설정
        const formattedDate = formatMatchDate(match.startDate); // "2024-09-16 (월)" 형식
        const formattedTime = formatMatchTime(match.startDate); // "19:00" 형식
    
        // 예매 정보 설정
        setDate(formattedDate);
        setTime(formattedTime);
        setSeq(match.application_seq);
    
        // mainData 설정
        setMainData({
          name: match.name || '정보 없음',
          place_name: match.placeName || '정보 없음',
          place_seq:match.place_seq,
          max_ticket:match.max_ticket,
          start_date:match.startDate,
          end_date:match.endDate
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
                      <span>장소: {match.placeName}</span>
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
                      <span>장소: {match.placeName}</span>
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
