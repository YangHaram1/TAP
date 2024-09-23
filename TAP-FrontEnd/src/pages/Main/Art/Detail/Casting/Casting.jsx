import { useEffect, useState } from 'react';
import styles from './Casting.module.css'
import { format } from 'date-fns';

export const Casting = ({castings, seq, days, time, castingAndDate})=> {

    //castings => 캐스팅 된 인물 이름, 역할
    //seq => 상품번호
    //days => 요일
    //time => 시간
    //castingAndDate => 날짜, 시간, 요일, 캐스팅 역할, 인물

    // 카테고리별 색깔 변화
    const [colors, setColors] = useState(Array(7).fill("rgba(0, 0, 0, 0)"));
    const [times, setTimes] = useState(Array(10).fill("rgba(0, 0, 0, 0)"));
    const [casting, setCasting] = useState(Array(30).fill("rgba(0, 0, 0, 0)")); 

    console.log("캐스팅",castings);


    //=========================요일 관련=====================================
    // 요일 색깔 상태 변화
    const handleColor = (index) => {
        // 검색 조건 추가 axios 추가 필요
        setColors(prevColors =>
            prevColors.map((color, i) =>
                i === index ? (color === "rgba(0, 0, 0, 0)" ? "purple" : "rgba(0, 0, 0, 0)") : color
            )
        );
    };


    //=========================회차 관련=====================================
    // 회차 색깔 상태 변화
    const handleTimes = (index)=>{
        // 검색 조건 추가 axios 추가 필요
        setTimes(prevTimes =>
            prevTimes.map((time, i) =>
                i === index ? (time === "rgba(0, 0, 0, 0)" ? "purple" : "rgba(0, 0, 0, 0)") : time
            )
        );
    }


     //=========================캐스팅 인물 관련=====================================
    // 캐스팅 상태 변화
    const handleCastings = (index)=>{
        // 검색 조건 추가 axios 추가 필요
        setCasting(prevCast =>
            prevCast.map((cast, i) =>
                i === index ? (cast === "rgba(0, 0, 0, 0)" ? "purple" : "rgba(0, 0, 0, 0)") : cast
            )
        );
    }

    //=========================캐스팅 표 출력=====================================

    console.log("CastingAndDate:", castingAndDate);

    // 데이터가 없을 경우 빈 객체로 초기화
    const validCastingAndDate = castingAndDate || {};
    const dates = Object.keys(castingAndDate);
    const timeSlots = new Set();

    dates.forEach(date => {
        Object.keys(castingAndDate[date]).forEach(time => {
            timeSlots.add(time);
        });
    });

    const timeList = Array.from(timeSlots);

    const rolesSet = new Set();
    dates.forEach(date => {
        if (validCastingAndDate[date]) {
            timeList.forEach(time => {
                const days = validCastingAndDate[date][time];
                if (days) {
                    Object.keys(days).forEach(day => {
                        Object.keys(days[day]).forEach(role => rolesSet.add(role));
                    });
                }
            });
        }
    });
    const rolesList = Array.from(rolesSet);

    // useEffect(()=>{
    //     console.log(daysList, rolesList);
    // },[daysList, rolesList])


    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <p>공연 및 선호하는 배우별 캐스팅 일정을 조회할 수 있습니다.</p>
                <p>캐스팅 일정은 배우 및 제작사의 사정에 따라 사전공지 없이 변경될 수 있습니다.</p>
                <hr></hr>
                <div className={styles.box}>
                    <div className={styles.box_title}>공연요일</div>
                    <div className={styles.box_content}>
                    {days.map((day, index) => (
                        <button key={index} onClick={() => handleColor(index)} style={{ background: colors[index] }}>
                            {day}
                        </button>
                    ))}
                    </div>
                </div>
                <hr></hr>
                <div className={styles.box}>
                    <div className={styles.box_title}>공연시간</div>
                    <div className={styles.box_content}>
                    {time.map((day, index) => (
                        <button key={index} onClick={() => handleTimes(index)} style={{ background: times[index] }}>
                            {day}
                        </button>
                    ))}
                    </div>
                </div>
                <hr></hr>
                <div className={styles.box}>
                    <div className={styles.box_title}>캐스팅</div>
                    <div className={`${styles.box_content} ${styles.casting_btns}`}>
                    { castings.map((cast, index) => (
                        <button key={index} onClick={() => handleCastings(index)} style={{ background: casting[index] }}>
                            {cast.casting_name}
                        </button>
                    ))}
                    </div>
                </div>
                {/* 캐스팅 테이블 */}
                <div className={styles.casting_table}>
                    <table>
                        <thead>
                            <tr>
                                <th>날짜(요일)</th>
                                <th>시간</th>
                                {rolesList.map(role => (
                                    <th key={role}>{role}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dates.map(date => (
                                Object.keys(castingAndDate[date]).map(time => (
                                    <tr key={`${date}-${time}`}>
                                        <td>{`${format(new Date(date), 'MM/dd')} (${new Date(date).toLocaleDateString('ko-KR', { weekday: 'short' })})`}</td>
                                        <td>{time}</td>
                                        {Object.keys(castingAndDate[date][time]).map(day => (
                                            Object.keys(castingAndDate[date][time][day]).map(role => (
                                                <td key={`${role}-${day}`}>
                                                    {castingAndDate[date][time][day][role] || '출연진 없음'}
                                                </td>
                                            ))
                                        ))}
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}