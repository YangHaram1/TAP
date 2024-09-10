import 'react-datepicker/dist/react-datepicker.css'
import { useEffect, useState } from 'react';
import styles from './Calender.module.css';
import './Calender.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export const Calender = ({minDate, maxDate, periods, setSelectedDate, selectedDate }) => {

  // const [selectedDate, setSelectedDate] = useState(new Date());

  // 달력 표시 범위 (지금의 경우 9월달만 있기 때문에 화살표가 비활성화 됨)
  // const minDate = new Date('2024-09-05');
  // const maxDate = new Date('2024-09-20');

  // 활성화 시킬 날짜 설정
  // const periods = [
  //   { start: new Date('2024-09-05'), end: new Date('2024-09-10') },
  //   { start: new Date('2024-09-15'), end: new Date('2024-09-20') },
  // ];

  // 위에서 설정한 날짜 병합
  const isWithinPeriod = (date) => {
    return periods.some(period => 
      date >= period.start && date <= period.end
    );
  };

  // 날짜 포멧 설정 (기본값 '00일' -> 수정값 '00')
  const formatCalendarDay = (date) => {
    const day = date.getDate();
    return `${day}`;
  };

  // 기간 외 나머지 날짜는 비활성화
  const tileDisabled = ({ date }) => {
    return !isWithinPeriod(date);
  };

  return (
    <div className={styles.container}>
      <Calendar
      onChange={setSelectedDate}  // 데이터 선택값
      calendarType="gregory" 
      locale="ko"
      value={selectedDate} 
      view="month"
      formatDay={(_locale, date) => formatCalendarDay(date)} // 날짜 포맷 설정
      prev2Label={null}
      next2Label={null}
      tileClassName={({ date, view }) => {
        if (view === 'month') {
          return isWithinPeriod(date) ? 'highlight' : null;
        }
        return null;
      }}
      tileDisabled={tileDisabled}
      maxDate={maxDate}
      minDate={minDate}
      />
    </div>
  );

}
