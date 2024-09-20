import { useEffect, useState } from 'react';
import styles from './PriceModal.module.css';
// import { url } from '../../config/config';
import { Discount } from './Discount/Discount';
import { OrderCheck } from './OrderCheck/OrderCheck';
import { useOrder } from '../../store/store';
import { format } from 'date-fns';

export const PriceModal = ({ isOpen, onClose, onBookClose})=>{

    const [tap, setTap] = useState(1);
    // 1 : step3 가격/할인정보
    // 2 : setp4 배송선택/주문지 확인
    // 3 : setp5 결재하기
    const {date, time, storageSection, storageSeats, mainData, seatPrices} = useOrder();

    useEffect(()=>{
        console.log("탭확인", tap);
        console.log("가격확인",seatPrices);
        // onBookClose();
    },[tap])

    if (!isOpen) return null;

    const handleClosePriceModal = ()=>{
        onClose();
        onBookClose();
        // setMacroModal(true);
    }

    const handlePrevModal = ()=>{
        if(tap === 1){
            onClose();
        }else{
            setTap(tap-1);
        }
    }

    const handleNextModal = ()=>{
        setTap(tap+1);
    }

    return(
        <div className={styles.overlay}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        {
                            tap === 1 ? 
                            <><div className={styles.header_title}>STEP 3</div>
                            <div className={styles.header_middle}><p style={{fontSize:"20px", fontWeight:"700"}}> 가격 / 할인 선택 </p></div></>
                            : tap === 2 ?
                            <><div className={styles.header_title}>STEP 4</div>
                            <div className={styles.header_middle}><p style={{fontSize:"20px", fontWeight:"700"}}> 배송 선택 / 주문지 확인 </p></div></>
                            : tap === 3 ? 
                            <><div className={styles.header_title}>STEP 5</div>
                            <div className={styles.header_middle}><p style={{fontSize:"20px", fontWeight:"700"}}> 결제 하기 </p></div></>
                            :
                            <></>

                        }
                        <div className={styles.header_end}>
                            <button className={styles.closeButton} onClick={handleClosePriceModal}>×</button>
                        </div>
                    </div>

                    <div className={styles.main}>
                        <div className={styles.main_left}>
                           {
                            tap === 1 ? <Discount/> 
                            : tap === 2 ? <OrderCheck/> 
                            :<></>
                           }
                        </div>
                        <div className={styles.main_right}>
                            <div className={styles.main_right_header}>
                                {/* 카테고리 별로 출력을 다르게 해야할수도 */}
                                선택한 상품
                            </div>
                            <div className={styles.main_right_detail}>
                                <div className={styles.right_detail_img}>
                                    <img src={mainData.files_sysname}/>
                                </div>
                                <div className={styles.right_detail_content}>
                                    <p style={{fontWeight:'700',fontSize:'18px'}}> {mainData.name}</p>
                                    <p> {format(new Date(mainData.start_date), 'yyyy.MM.dd')}  ~ </p>
                                    <p> {format(new Date(mainData.end_date), 'yyyy.MM.dd')} </p>
                                    <p> {mainData.place_name}</p>
                                    <p> {mainData.age_limit} {mainData.age_limit.startsWith("전") ? "" : " 이상"} 관람가능</p>
                                    <p> 관람시간 : {mainData.running_time}분</p>
                                </div>
                            </div>
                            <div className={styles.main_right_selectSeat}>
                                <h3> 선택좌석 </h3>
                                <table>
                                    <colgroup>
                                        <col className={styles.col1} style={{backgroundColor:'rgb(155, 131, 181)', width:"40%"}}/>
                                        <col className={styles.col2} style={{width:"60%"}}/>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <td>일시</td>
                                            <td>{date} {time}</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> 
                                                <p className={styles.seats_box}>선택 좌석 ({storageSeats.length}석)</p>
                                                <p className={styles.seats_box}>(등급 | 구역-행-열)</p>
                                            </td>
                                            <td>
                                                <div className={styles.seat_overflow_box}>
                                                {
                                                    storageSeats.map((seat,index)=>{
                                                        return(<p className={styles.seats_box} key={index}>{seat.grade} | {storageSection}-{seat.seatId}</p>);
                                                    })
                                                }
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>티켓 금액</td>
                                            <td>140,000원</td>
                                        </tr>
                                        <tr>
                                            <td>수수료</td>
                                            <td>2,000원</td>
                                        </tr>
                                        <tr>
                                            <td>배송료</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>할인</td>
                                            <td style={{color:"red"}}>-7,000원</td>
                                        </tr>
                                        <tr>
                                            <td>취소기한</td>
                                            <td style={{color:"red"}}>2024년 9월 10일(화) 18:00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles.next_page}>
                                <button className={styles.prev_btn} onClick={handlePrevModal}>이전페이지</button>
                                <button className={styles.next_btn} onClick={handleNextModal}>다음페이지</button>
                            </div>
                        </div>
                    </div>
                    {/* 모달 끼워넣기 */}
                </div>
        </div>
        
    );
}