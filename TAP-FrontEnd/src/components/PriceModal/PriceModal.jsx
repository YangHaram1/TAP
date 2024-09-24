import { useEffect, useState } from 'react';
import styles from './PriceModal.module.css';
// import { url } from '../../config/config';
import { Discount } from './Discount/Discount';
import { OrderCheck } from './OrderCheck/OrderCheck';
import { useOrder, useUserData } from '../../store/store';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { Pay } from './Pay/Pay';
import { Cancle } from './Cancle/Cancle';
import { api } from '../../config/config';

export const PriceModal = ({ isOpen, onClose, onBookClose})=>{

    const [tap, setTap] = useState(1);
    // 1 : step3 가격/할인정보
    // 2 : setp4 배송선택/주문지 확인
    // 3 : setp5 결재하기
    const {seq,date, time, storageSection, storageSeats, mainData, 
        seatPrices,deliveryMethod,address, setAddress,point,totalPrice ,
        setTotalPrice, payMethod, setRemoveData,setStorageSeats} = useOrder();
    const {user} = useUserData();
    const [tickets, setTickets] = useState([]);
    const [ticketTotalPrice, setTicketTotalPrice] = useState(0);
    let totalCount = storageSeats.length;
    const tax = 2000;
    const delivery_tax=3200;
    const [check, setCheck] = useState(false);

    const [inputBrith, setinputBirth] = useState("");
    const [couponList,setCouponList] = useState([]);
    const [selectedCoupon, setSelectedCoupon] = useState(null); // 선택된 쿠폰 가격
    const [couponSeq, setCouponSeq] = useState(0);

    useEffect(()=>{
        console.log("탭확인", tap);
        console.log("가격확인",seatPrices);
        console.log("쿠폰확인",selectedCoupon);
        // onBookClose();
    },[tap, selectedCoupon])

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
        // 가격할인 선택 페이지일 경우
        if(tap === 1){
            let TicketCount = tickets.reduce((acc, ticket) => acc + parseInt(ticket.count, 10), 0);
            console.log(TicketCount);
            if(totalCount !== TicketCount){
                Swal.fire(
                    { 
                      icon: 'warning',
                      title: '구매하려는 티켓 수량을 확인해주세요',
                      showConfirmButton: false,
                      timer: 1500
                    }
                );
                return;
            }
            TicketCount = 0;
            console.log("초기화",TicketCount);
        
        }else if(tap === 2){
            if(inputBrith !== user.birth){
                Swal.fire(
                    { 
                      icon: 'warning',
                      title: '생년월일을 확인해주세요',
                      showConfirmButton: false,
                      timer: 1500
                    }
                );
                return;
            }
            if(deliveryMethod === 'post' && address === null){
                Swal.fire(
                    { 
                      icon: 'warning',
                      title: '주소지를 확인해주세요',
                      showConfirmButton: false,
                      timer: 1500
                    }
                );
                return;
            }
            setinputBirth("");
        }else if(tap === 3){
            if(totalPrice>point){
                Swal.fire(
                    { 
                      icon: 'warning',
                      title: '보유 포인트가 부족합니다.',
                      showConfirmButton: false,
                      timer: 1500
                    }
                );
                return;
            }
        }else if(tap === 4){
            if(!check){
                Swal.fire(
                    { 
                      icon: 'warning',
                      title: '필수 정보 제공 동의를 확인해주세요',
                      showConfirmButton: false,
                      timer: 1500
                    }
                );
                return;
            }else if(check){
                console.log("여기 들어옴", address);

                let deliveryStatus = '';
                let deliveryMethod = '현장발매';
                let deliverySeq = null;
                
                if(address !== null){
                    deliveryStatus='미발송';  
                    deliveryMethod = '배송'; 
                    deliverySeq=address.seq;
                }

                if(payMethod === 'point'){
                    let remainPoint = point - totalPrice;
                    const orderData = 
                    { seq:seq, date:date, time:time,  // 상품번호, 날짜, 회차시간
                        storageSection:storageSection, // 섹션 정보(층수)
                        storageSeats:storageSeats, // 예약 좌석
                        totalPrice:totalPrice, // 총 금액
                        status:'완료', // 주문 완료? 주문 취소?
                        deliveryStatus:deliveryStatus, // 배송상태 (미발송)
                        pay:payMethod, // 결제방법 (포인트, 카카오)
                        deliveryMethod:deliveryMethod, // 배송방법(현장결재, 배송)
                        deliverySeq:deliverySeq, //배송지번호
                        couponSeq:couponSeq
                    }

                    // 예약 되어있는 좌석 중 동일 좌석이 있는지 한번 더 확인 
                    api.post(`/order/checkSeat`,orderData)
                    .then((resp)=>{

                        
                        console.log(resp.data);

                        if(resp.data === 0){
                            api.post(`/order/orderFinal`,orderData)
                            .then((resp)=>{
                                setRemoveData();
                                handleClosePriceModal();
                                Swal.fire(
                                    { 
                                    icon: 'success',
                                    title: '티켓 예매가 완료되었습니다.',
                                    showConfirmButton: false,
                                    timer: 1500
                                    }
                                );
                            }) 
                            .catch((err)=>{
                                console.log(err);
                            })
                        }else{
                            setRemoveData();
                            setStorageSeats([]);
                            onClose();
                            Swal.fire(
                                { 
                                icon: 'success',
                                title: '이미 예매가 완료된 좌석이 포함되어있습니다.',
                                showConfirmButton: false,
                                timer: 1500
                                }
                            );
                            

                        }
                    })

                    console.log(orderData);
                }
            }
        }
        // setAddress({});
        setTap(tap+1);
    }

//================================= 가격/ 할인 선택============================

    useEffect(()=>{
        api.get(`/order/type/members`)
        .then((resp)=>{
            console.log(resp);
            console.log("쿠폰 데이터 확인 필요~~~~~",resp.data);
            setCouponList(resp.data);
        })
        .catch((err)=>{console.log(err)})
    },[seq, storageSeats])

    useEffect(()=>{
        const complexCount = tickets.reduce((acc, ticket) => acc + (parseInt(ticket.count, 10) * parseInt(ticket.price, 10)), 0);
        console.log(complexCount);
        setTicketTotalPrice(complexCount);
    },[tickets])

    let insertDelivery = 0;
    if(deliveryMethod === 'post'){
        insertDelivery = 3200;
    }else{
        insertDelivery = 0;
    }

    useEffect(()=>{
        let sum = ticketTotalPrice + tax + insertDelivery - selectedCoupon;
        setTotalPrice(sum);
        console.log(sum);
    },[ticketTotalPrice])

//================================= 취소 수수료 필수 선택============================

    if (!isOpen) return null;

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
                            : tap === 4 ? 
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
                            tap === 1 ? <Discount tickets={tickets} setTickets={setTickets} couponList={couponList} setSelectedCoupon={setSelectedCoupon} setCouponSeq= {setCouponSeq}/> 
                            : tap === 2 ? <OrderCheck inputBrith={inputBrith} setinputBirth={setinputBirth} delivery_tax={delivery_tax}/> 
                            : tap === 3 ? <Pay/> 
                            : tap === 4 ? <Cancle setCheck={setCheck}/> 
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
                                            <td>{ticketTotalPrice.toLocaleString()}원</td>
                                        </tr>
                                        <tr>
                                            <td>수수료</td>
                                            <td>{tax.toLocaleString()}원</td>
                                        </tr>
                                        <tr>
                                            <td>배송료</td>
                                            <td>{ deliveryMethod === 'post' ? delivery_tax.toLocaleString():"0"}원</td>
                                        </tr>
                                        <tr>
                                            <td>할인</td>
                                            <td style={{color:"red", width:"150px"}}>{selectedCoupon === null ? "0원" : selectedCoupon === '0' ? "0원": <p> - {selectedCoupon.toLocaleString()}원</p>}</td>
                                        </tr>
                                        <tr>
                                            <td>취소기한</td>
                                            <td style={{color:"red"}}>{/*2024년 9월 10일(화) 18:00*/}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles.next_page}>
                                <button className={styles.prev_btn} onClick={handlePrevModal}>이전페이지</button>
                                <button className={styles.next_btn} onClick={handleNextModal}>{tap === 4 ? "결제하기":"다음페이지"}</button>
                            </div>
                        </div>
                    </div>
                    {/* 모달 끼워넣기 */}
                </div>
        </div>
        
    );
}