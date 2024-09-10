import { useLocation } from 'react-router-dom';
import styles from './Detail.module.css'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // solid 아이콘
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // regular 아이콘
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { url } from '../../../../config/config';
import { useEffect, useState } from 'react';
import { Notice } from './Notice/Notice';
import { ProductData } from './ProductData/ProductData';
import { Casting } from './Casting/Casting';
// import { Review } from './Review/Review';
// import { Excite } from './Excite/Excite';
import { Write } from './Write/Write';
import { Calender } from '../../../../components/Calender/Calender';


export const Detail = ()=>{

    const location = useLocation();
    const { seq } = location.state || {};  // 전달된 state가 있으면 가져옴
    const [tap, setTap] = useState(0);

    // =================== 캘린더 관련 멤버 변수 =================== 
    const [selectedDate, setSelectedDate] = useState(new Date());
    // 달력 표시 범위 (지금의 경우 9월달만 있기 때문에 화살표가 비활성화 됨)
    const minDate = new Date('2024-09-05');
    const maxDate = new Date('2024-09-20');
    // 활성화 시킬 날짜 설정
    const periods = [
        { start: new Date('2024-09-05'), end: new Date('2024-09-10') },
        { start: new Date('2024-09-15'), end: new Date('2024-09-20') },
    ];

    // =================== 회차 선택 멤버 변수 ===================
    const [selectedTime, setSelectedTime] = useState('');

    const handleTime = (time) => {
        setSelectedTime(time);
    }
    

    useEffect(()=>{
        console.log("선택한 날짜 : ",selectedDate);
    },[selectedDate])

    return(
        <div className={styles.container}>
            <div className={styles.left}>
                <h2>상품명</h2>
                <div className={styles.header_data}>
                    <div className={styles.header_data_left}>
                        <img src={`${url}/31d8a1ec-913e-4808-8004-091734d77744`}></img>
                        <div className={styles.likes}>
                            {
                                'like' === 'like' 
                                ?<FontAwesomeIcon icon={regularHeart} />
                                :<FontAwesomeIcon icon={solidHeart} />

                            }
                            &nbsp; 관심등록</div>
                    </div>
                    <div className={styles.header_data_right}>
                        <div className={styles.datas}>
                            <div className={styles.data_title}>장소</div>
                            <div className={styles.data_content}>블루스퀘어홀</div>
                        </div>
                        <div className={styles.datas}>
                            <div className={styles.data_title}>공연기간</div>
                            <div className={styles.data_content}>2024.10.11 ~ 2024.10.30</div>
                        </div>
                        <div className={styles.datas}>
                            <div className={styles.data_title}>공연시간</div>
                            <div className={styles.data_content}>120분</div>
                        </div>
                        <div className={styles.datas}>
                            <div className={styles.data_title}>관람연령</div>
                            <div className={styles.data_content}>8세 이상</div>
                        </div>
                        <div className={styles.datas}>
                            <div className={styles.data_title}>가격</div>
                            <div className={styles.data_content}>
                                <div className={styles.data_sub_content}><span style={{color:"gray"}}>VIP석</span><span> &nbsp;140,000원</span></div>
                                <div className={styles.data_sub_content}><span style={{color:"gray"}}>R석</span><span> &nbsp; &nbsp; 140,000원</span></div>
                                <div className={styles.data_sub_content}><span style={{color:"gray"}}>S석</span><span> &nbsp; &nbsp; 140,000원</span></div>
                                <div className={styles.data_sub_content}><span style={{color:"gray"}}>A석</span><span> &nbsp; &nbsp; 140,000원</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            <div className={styles.btns}>
                <button onClick={()=>{setTap(0)}}>공지사항</button>
                <button onClick={()=>{setTap(1)}}>캐스팅정보</button>
                <button onClick={()=>{setTap(2)}}>판매정보</button>
                <button onClick={()=>{setTap(3)}}>관람후기 (0)</button>
                <button onClick={()=>{setTap(4)}}>기대평 (0)</button>
            </div>

            <div className={styles.detail_page}>
                {
                    tap === 1 ? <Casting/> :
                    tap === 2 ? <ProductData/> : 
                    tap === 3 ? <Write category="review"/> : 
                    tap === 4 ? <Write category="excite"/> : 
                    <Notice/>

                }
            </div>

            </div>


            {/* 예매 섹션 */}
            <div className={styles.right}>
                <div className={styles.bubble}>
                    <div className={styles.text}><span style={{color:"purple", fontWeight:600, fontSize:"20px"}}>Step 1.</span><span style={{fontWeight:600, fontSize:"19px"}}> 날짜 선택</span></div>
                    <div className={styles.calendar}>
                        <Calender minDate={minDate} maxDate={maxDate} periods = {periods} setSelectedDate = {setSelectedDate} selectedDate={selectedDate}/>
                    </div>
                    <div className={styles.text}><span style={{color:"purple", fontWeight:600, fontSize:"20px"}}>Step 2.</span><span style={{fontWeight:600, fontSize:"19px"}}> 회차 선택</span></div>
                    <div className={styles.time}>
                        <div className={`${styles.time_bubble} ${selectedTime === '12:00' ? styles.selected : ''}`} onClick={() => handleTime('12:00')}>
                            1회 12:00
                        </div>
                        <div className={`${styles.time_bubble} ${selectedTime === '17:00' ? styles.selected : ''}`} onClick={() => handleTime('17:00')}>
                            2회 19:00
                        </div>
                    </div>
                    <div className={styles.seats}> 
                        <p>
                            <span>총 좌석수 : 100 좌석&nbsp;&nbsp;|</span>
                            <span>&nbsp;&nbsp;잔여 좌석수 : 70 좌석</span>
                        </p>
                    </div>     
                    <div className={styles.book}>
                        <button>예매하기</button>
                    </div>            
                </div>
            </div>
        </div>
    );

}