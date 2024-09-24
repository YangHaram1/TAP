import { useEffect, useState } from 'react';
import { useOrder } from '../../../store/store';
import styles from './Discount.module.css';

export const Discount = ({tickets, setTickets,couponList,setSelectedCoupon,setCouponSeq})=>{

    const {date, time, seq, storageSection, storageSeats, mainData, seatPrices} = useOrder();
    let zero = null;
    useEffect(()=>{
        setTickets([]);
    },[])

    // 좌석 가격 출력해보기
    const groupedSeats = storageSeats.reduce((acc, seat) => {
        if (!acc[seat.grade]) {
          acc[seat.grade] = [];
        }
        acc[seat.grade].push(seat);
        return acc;
      }, {});


    const getPriceByGrade = (grade) => {
        const priceObj = seatPrices.find(seat => seat.place_seat_level === grade);
        return priceObj ? priceObj.price_seat: '가격 없음'; // 가격이 없을 경우 처리
    };

    const handleTicket = (grade, count, price)=>{
        setTickets((prevTickets) => {
            // 기존 tickets에서 동일한 grade가 있는지 확인
            const existingTicket = prevTickets.find(ticket => ticket.grade === grade);
    
            if (existingTicket) {
                // grade가 동일하면 count를 덮어씌움
                return prevTickets.map(ticket =>
                    ticket.grade === grade ? { ...ticket, count: count, price:price } : ticket
                );
            } else {
                // grade가 다르면 배열에 추가
                return [...prevTickets, { grade: grade, count: count, price:price }];
            }
        });
    }

    const handleCoupon = (value, seq) => {
        console.log("Discount value:", value); // 선택된 할인 금액
        console.log("Coupon seq:", seq); // 선택된 쿠폰의 seq
        setSelectedCoupon(value); // 쿠폰 선택 상태 업데이트
        setCouponSeq(seq);
    }

    useEffect(()=>{
        console.log("티켓 가격 수량 보기", tickets);
    },[tickets])

    return(
        <div className={styles.container}>
            <div className={styles.main_left_price_box}>
                <h3>가격</h3>
                <div className={styles.price_box_header}>
                    좌석 {storageSeats.length}개를 선택하셨습니다.
                </div>
                        {Object.keys(groupedSeats).map((grade, index) => (
                            <div key={index} className={styles.price_box_content}>
                                <div className={`${styles.price_box_cotent} ${styles.content1}`}>기본가</div>
                                <div className={`${styles.price_box_cotent} ${styles.content2}`}>일반({grade})</div>
                                <div className={`${styles.price_box_cotent} ${styles.content3}`}>{getPriceByGrade(grade).toLocaleString() }원</div>
                                <div className={`${styles.price_box_cotent} ${styles.content4}`}>
                                    <select onChange={(e)=>{ handleTicket(grade, e.target.value, getPriceByGrade(grade)) }}>
                                        <option selected>0</option>
                                    {
                                        groupedSeats[grade].map((seat,index)=>{
                                            return(
                                                <option key={index} value={index+1}>{index+1}</option>
                                            );
                                        })
                                    }
                                    </select>
                                </div>
                            </div>
                        ))}
            </div>

            <div className={styles.main_left_coupon_box}>
                <h3>할인 / 쿠폰 <span>(중복 사용 불가)</span></h3>
                <div className={styles.coupon_box_content}>
                    <div className={styles.coupon_list}>
                        <input type='radio' name="coupon" value={zero}  onChange={(e) => handleCoupon(e.target.value, 0)}/> 
                        <label> 쿠폰 미사용 <span style={{color:"red"}}></span></label>
                    </div>
                    {
                        couponList.map((coupon)=>{
                            return(
                                <div className={styles.coupon_list} key={coupon.seq}>
                                    <input type='radio' name="coupon" value={coupon.discount} onChange={(e) => handleCoupon(e.target.value, coupon.seq)}/> 
                                    <label>{coupon.title} <span style={{color:"red"}}> &nbsp; -{coupon.discount.toLocaleString()}원</span></label>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );

}