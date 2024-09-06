import { useState } from 'react';
import styles from './Casting.module.css'

export const Casting = ()=> {

    // const [color, setColor] = useState("rgba(0, 0, 0, 0)");
    const [colors, setColors] = useState(Array(7).fill("rgba(0, 0, 0, 0)"));
    const [times, setTimes] = useState(Array(10).fill("rgba(0, 0, 0, 0)"));
    const [casting, setCasting] = useState(Array(30).fill("rgba(0, 0, 0, 0)")); 

    // 요일 색깔 상태 변화
    const handleColor = (index) => {
        // 검색 조건 추가 axios 추가 필요
        setColors(prevColors =>
            prevColors.map((color, i) =>
                i === index ? (color === "rgba(0, 0, 0, 0)" ? "purple" : "rgba(0, 0, 0, 0)") : color
            )
        );
    };

    // 회차 색깔 상태 변화
    const handleTimes = (index)=>{
        // 검색 조건 추가 axios 추가 필요
        setTimes(prevTimes =>
            prevTimes.map((time, i) =>
                i === index ? (time === "rgba(0, 0, 0, 0)" ? "purple" : "rgba(0, 0, 0, 0)") : time
            )
        );
    }

    // 회차 색깔 상태 변화
    const handleCastings = (index)=>{
        // 검색 조건 추가 axios 추가 필요
        setCasting(prevCast =>
            prevCast.map((cast, i) =>
                i === index ? (cast === "rgba(0, 0, 0, 0)" ? "purple" : "rgba(0, 0, 0, 0)") : cast
            )
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <p>공연 및 선호하는 배우별 캐스팅 일정을 조회할 수 있습니다.</p>
                <p>캐스팅 일정은 배우 및 제작사의 사정에 따라 사전공지 없이 변경될 수 있습니다.</p>
                <div className={styles.box}>
                    <div className={styles.box_title}>공연요일</div>
                    <div className={styles.box_content}>
                    {["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"].map((day, index) => (
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
                    {["14:00", "14:30", "19:00", "19:30"].map((day, index) => (
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
                    {["최재림", "김준수","최재림", "김준수","최재림", "김준수","최재림", "김준수","최재림", "김준수","최재림", "김준수" ].map((day, index) => (
                        <button key={index} onClick={() => handleCastings(index)} style={{ background: casting[index] }}>
                            {day}
                        </button>
                    ))}
                    </div>
                </div>

                {/* 캐스팅 테이블 */}
                <div className={styles.casting_table}>
                    <table>
                        <thead>
                            <tr>
                                <th><span>관람일</span></th>
                                <th><span>시간</span></th>
                                <th><span>역할1</span></th>
                                <th><span>역할2</span></th>
                                <th><span>역할3</span></th>
                                <th><span>역할4</span></th>
                                <th><span>역할5</span></th>
                                <th><span>역할6</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>11/22(금)</span></td>
                                <td><span>19:30</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                            </tr>
                            <tr>
                                <td><span>11/22(금)</span></td>
                                <td><span>19:30</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                            </tr>
                            <tr>
                                <td><span>11/22(금)</span></td>
                                <td><span>19:30</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                                <td><span>출연진</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}