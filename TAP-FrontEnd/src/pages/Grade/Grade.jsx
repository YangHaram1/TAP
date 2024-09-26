import styles from './Grade.module.css';
import heart from '../../images/heart.png';
import couponImg from '../../images/coupon.png'
import { useEffect, useState } from 'react';
import { api } from '../../config/config';
import { useAuthStore } from './../../store/store';
import Graph from './Graph/Graph';
import Swal from 'sweetalert2';

const Grade = () => {
    const { grade, name } = useAuthStore();
    const [coupon, setCoupon] = useState([]);
    useEffect(() => {
        api.get(`/coupon/type/members`).then((resp) => {
            setCoupon(resp.data)
        })
    }, [])

    const handleAddCoupon=()=>{
        const couponOrder=coupon[0].coupon_order;
        api.post(`/coupon/${couponOrder}`).then((resp)=>{
            if(resp.data){
                Swal.fire({
                    icon:'success',
                    title:'쿠폰',
                    text:'쿠폰 발급 되었습니다.'
                })
            }
            else{
                Swal.fire({
                    icon:'error',
                    title:'쿠폰',
                    text:'이미 발급 하셨습니다.'
                }) 
            }
           
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                우수 회원 혜택
            </div>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={heart} alt="" />
                </div>
                <div className={styles.info}>
                    <div className={styles.infoTitle}>
                        {name}님의 회원등급은 <span>{grade}</span> 입니다.
                    </div>
                    <div className={styles.infoDetail}>
                        주문 0건 | 주문금액 0원
                    </div>
                    <div className={styles.infoDate}>
                        (투어티켓 산정기간 : 2024.02.01~2024.07.31)
                    </div>
                    <div className={styles.infoBtn}>
                        <button>구매실적 상세보기</button>
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.bodyTitle}>
                    나의 혜택
                </div>
                <div className={styles.bodyDate}>
                    사용기간 : 2024.08.10~2024.09.09,매월 10일 새로운 등급과 다양한 혜택이 제공됩니다.
                </div>
            </div>
            <div className={styles.contents}>
                <div>
                    {
                        coupon.map((item, index) => {
                            return (
                                <div className={styles.content} key={index}>
                                    <div>
                                        <img src={couponImg} alt="" />
                                    </div>
                                    <div>
                                        {item.title}
                                    </div>
                                    <div>
                                       {item.contents}
                                    </div>
                                    <div>
                                        {item.discount}원 할인 쿠폰입니다.
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className={styles.bodyBtn}>
                    <button onClick={handleAddCoupon}>쿠폰 모두 받기</button>
                </div>
            </div>
            <div className={styles.coupon}>
                <div className={styles.couponTitle}>
                    <strong>쿠폰 사용 안내</strong>
                    <p>등급별 쿠폰은 <span>바로 접속</span>을 통한 경우만 적용 가능합니다.</p>
                </div>
                <div className={styles.couponDetail}>
                    투어 해외패키지 : 패키지만 이용 가능. 일부 상품, 자유여행, 땡처리 할인 항공권 사용 불가 (사용가능기간 : 발급일로부터 30일)
                </div>
                <div className={styles.couponDetail}>
                    투어 국내숙박 : 국내호텔 / 리조트 / 펜션 상품만 이용 가능 (사용가능기간 : 발급일로부터 30일)
                </div>
                <div className={styles.couponDetail}>
                    투어 해외호텔 : 전 상품 이용가능. 단, 공급업체 요금 정책에 따른 일부 객실 및 현지 호텔 사이트 결제는 제외(사용가능기간 : 발급일로부터 30일)
                </div>
                <div className={styles.couponDetail}>
                    티켓 TOPING : 1만원 회원권 상품만 혜택 적용
                </div>
            </div>
            <div className={styles.title}>
                우수회원 등급별 혜택 안내
            </div>
            <div className={styles.grade}>
                <div className={styles.gradeGraph}>
                    <Graph />
                </div>
                <div className={styles.gContents}>
                    <div className={styles.gTitle}>
                        우수회원 등급 산정 기준 안내
                    </div>
                    <div className={styles.gDetail}>
                        <p>- 인터파크 우수회원 등급은 매월 10일, 최근 6개월 구매확정 주문기준으로 선정됩니다. </p>
                        <p>  주문 건수와 주문 금액 조건을 모두 충족하여야 합니다. 단, 결제에 사용된 할인쿠폰, 배송비, 티켓예매 수수료,</p>
                        <p>  투어 렌터카 이용권, 제휴사를 통해 구매한 여행상품 등은 실적 대상에서 제 외됩니다.</p>

                    </div>
                </div>
                <div className={styles.gContents}>
                    <div className={styles.gTitle}>
                        우수회원 추가 포인트 적립 안내
                    </div>
                    <div className={styles.gDetail}>
                        <p>- <span>바로 접속</span>을 통한 주문 건만 우수회원 추가 포인트 적립 대상입니다.</p>
                        <p>  <span>바로 접속이란?</span> 가격비교 사이트(네이버쇼핑, 다나와 등)를 통하지 않고 직접 인터파크에 방문하여 상품 구매/예약하신 주문을 말합니다.</p>

                    </div>
                    <div className={styles.gDetail}>
                        - 해당 주문의 결제 당시 회원 등급에 따라 우수회원 추가 포인트가 계산되며
                        <p>  주문 내 모든 상품 구매 확정시 자동으로 적립됩니다. 단, 일부 상품은 추가 포인트 적립대상에서 제외됩니다.</p>
                    </div>
                    <div className={styles.gDetail}>
                        - 우수회원 추가 포인트는 최대 5,000P이고 유효기간은 12개월(365일)입니다.
                    </div>
                    <div className={styles.gDetail}>
                        - 약관에 위배되거나 비정상적인 거래 등의 부정거래 행위로 확인될 경우
                        <p>  당사자 동의 없이 적립취소(회수, 미적립 등) 될 수 있습니다.</p>
                    </div>
                    <div className={styles.gDetail}>
                        - 구매 등급별 혜택 종류, 혜택 규모, 지급 방식은 내부 정책에 의하여 수시로 변경될 수 있습니다.
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.fHeader}>
                    <div >서비스 구분</div>
                    <div>구매확정(주문종료)기준</div>
                    <div>구매실적 제외</div>
                    <div >우수회원 추가 포인트 적립 제외</div>
                </div>
                <div className={styles.fBody}>
                    <div className={styles.ceilT}>
                        티켓
                    </div>
                    <div className={styles.ceil}>
                        <span>공연, 스포츠 등 : 티켓 이용일+1일</span>
                        <span> 공연예매권 구매, 전시 등 상시 상품 : 예매일+7일</span>
                        <span>Toping구매 : 결제일+8일</span>
                    </div>
                    <div className={styles.ceil}>
                        <span>배송비, 예매수수료, 예매대기, 캠핑옵션추가 구매 제외.</span>
                        <span>예매권(공연/스포츠 등)포함 결제한 주문</span>
                    </div>
                    <div className={styles.ceil}>
                        <span>Toping 구매, 예매권(공연/스포츠 등)을 포함하여 결제한 경우 제외</span>
                        <span>VIP, FAMILY 등급 적립 제외</span>
                    </div>
                </div>
                <div className={styles.fBody}>
                    <div className={styles.ceilT}>
                        투어
                    </div>
                    <div className={styles.ceil}>
                        <span>해외항공 왕복 : 도착일+14일(편도:출발일+14일)</span>
                        <span>국내항공 : 출발일+14일</span>
                        <span>여행(해외/국내) : 도착일+14일</span>
                        <span>해외호텔 및 국내숙박 : 퇴실일+14일</span>
                    </div>
                    <div className={styles.ceil}>
                        <span>렌터카, 투어·티켓 구매, 제휴사를 통한 구매(홈쇼핑, 타 사이트)제외</span>
                    </div>
                    <div className={styles.ceil}>
                        <span>렌터카, 투어·티켓 구매, 제휴사를 통한 구매(홈쇼핑, 타 사이트)제외</span>
                        <span>항공 상품(해외/국내) VIP, FAMILY 등급 적립 제외</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Grade;