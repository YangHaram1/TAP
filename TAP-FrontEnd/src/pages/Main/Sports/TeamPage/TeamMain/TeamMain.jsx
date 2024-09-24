import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Swal from 'sweetalert2';
import { useOrder } from '../../../../../store/store';
import { BookModal } from '../../../../../components/BookModal/BookModal';
import { useLocation } from 'react-router-dom'; // useLocation 추가
import styles from './TeamMain.module.css';

export const TeamMain = () => {
  const location = useLocation();
  const { matches, teamName: selectedTeam, seatPrices } = location.state || {};  // 전달된 state에서 데이터 가져오기
  const [maxList, setMaxList] = useState(5);
  const [bookModal, setBookModal] = useState(false);
  const { setSeatPrices, setDate, setTime, setSeq, setMainData } = useOrder();

  useEffect(() => {
    console.log('Received matches:', matches);
    console.log('Selected Team:', selectedTeam);
    console.log('Seat Prices:', seatPrices);
    console.log('setSeatPrices',setSeatPrices);
  }, [matches, selectedTeam, seatPrices,setSeatPrices]);

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

  const getOpenStatusMessage = (openDate) => {
    const today = new Date();
    const openDateObj = new Date(openDate);
    if (openDateObj > today) {
      return `${openDateObj.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })} ${openDateObj.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })} 오픈 예정`;
    }
    return null;
  };

  const isBookModalOpen = async (match) => {
    if (!match || !match.name || !match.place_name) {
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
  
    // 좌석 가격을 설정
    if (seatPrices) {
      console.log('Setting seatPrices for booking:', seatPrices);
      setSeatPrices(seatPrices);
    }
  
    // 나머지 경기 정보 설정
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
  
    setBookModal(true); // 모달 열기
  };
  const closeBookModal = () => {
    setBookModal(false);
  };

  return (
    <div className={styles.teamMain}>
      <h2>경기 일정</h2>
      <div className={styles.scheduleTable}>
        {matches
          ?.filter(match => match.homeTeamName === selectedTeam)
          .slice(0, maxList)
          .map((match, index) => (
            <div key={index} className={styles.timeSchedule}>
              <div className={styles.scheduleDateTime}>
                <div className={styles.date}>
                  {new Date(match.startDate).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })}
                  ({new Date(match.startDate).toLocaleDateString('ko-KR', { weekday: 'short' })})
                </div>
                <div className={styles.time}>
                  {match.startDate.split(' ')[1] || '18:30'}
                </div>
              </div>

              <div className={styles.teamMatch}>
                <div className={styles.team1}>
                  <a href="#" style={{ cursor: 'default' }}>
                    <img
                      src={match.homeTeamLogo || 'http://ticketimage.interpark.com/TicketImage/sports/web/small/PB004.png'}
                      onError={(e) => e.target.src = '//ticketimage.interpark.com/Play/image/small/NoImage.gif'}
                      alt={match.homeTeamName || '홈 팀'}
                    />
                  </a>
                  <a href="#" className={styles.teamName} style={{ cursor: 'default' }}>
                    {match.homeTeamName || '홈 팀'}
                  </a>
                </div>

                <div className={styles.vsText}>vs</div>

                <div className={styles.team2}>
                  <a href="#" style={{ cursor: 'default' }}>
                    <img
                      src={match.awayTeamLogo || 'http://ticketimage.interpark.com/TicketImage/sports/web/small/PB009.png'}
                      onError={(e) => e.target.src = '//ticketimage.interpark.com/Play/image/small/NoImage.gif'}
                      alt={match.awayTeamName || '상대 팀'}
                    />
                  </a>
                  <a href="#" className={styles.teamName} style={{ cursor: 'default' }}>
                    {match.awayTeamName || '상대 팀'}
                  </a>
                </div>
              </div>

              <div className={styles.ground}>
                <span>{match.place_name || '경기장'}</span>
              </div>

              <div className={styles.btns}>
                {isOpenNow(match.openDate) ? (
                  <button onClick={() => isBookModalOpen(match)}>예매하기</button>
                ) : (
                  <span className={styles.openScheduled}>{getOpenStatusMessage(match.openDate)}</span>
                )}
              </div>
            </div>
          ))}

        {matches?.filter(match => match.homeTeamName === selectedTeam).length > maxList && (
          <div className={styles.more} onClick={() => setMaxList(prev => prev + 5)}>
            더보기
          </div>
        )}
      </div>

      {/* BookModal 추가 */}
      <BookModal isOpen={bookModal} onClose={closeBookModal} />
    </div>
  );
};
