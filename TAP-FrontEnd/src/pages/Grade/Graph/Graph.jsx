import React, { useEffect, useState } from 'react';
import styles from './Graph.jsx.module.css';
import { useAuthStore } from './../../../store/store';
import couponImg from '../../../images/coupon.png';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { api } from '../../../config/config';

const Graph = () => {
    const { grade } = useAuthStore();
    const [list, setList] = useState([]);
    const [coupon, setCoupon] = useState([]);
    // const [check, setCheck] = useState([false, false, false, false]);
    useEffect(() => {
        // if (grade === 'pending') {
        //     setCheck((prev) => {
        //         return (
        //             prev.map((item, index) => {
        //                 if (index === 1) {
        //                     return true;
        //                 }
        //                 return false;
        //             })
        //         )
        //     })
        // }
        api.get(`/grade/CouponGrade`).then((resp) => {
            setCoupon(resp.data);
        
        })
        api.get(`/grade`).then((resp) => {
            setList(resp.data);
         
        })
     
    }, [])
    const predefinedColors = [
        'gray',          // 회색
        'red',           // 빨간색
        'aquamarine',    // 아쿠아 마린
        'blueviolet',    // 블루 바이올렛
      ];
    
      const getColor = (index) => {
        if (index < predefinedColors.length) {
          return predefinedColors[index];
        }
    
        // 인덱스가 주어진 색상 배열 범위를 넘어서면, 동적으로 새로운 색상 생성 (겹치지 않게)
        const red = (index * 50) % 256;
        const green = (index * 80) % 256;
        const blue = (index * 120) % 256;
        return `rgb(${red}, ${green}, ${blue})`;
      };
    return (
        <React.Fragment>
            <div className={styles.header}>
                <div className={styles.empty}>

                </div>
                {/* {여기부터 중복} */} 
                {
                    list.map((item, index) => {
                        return (
                            <div className={`${styles.grade} ${styles.color1}`} key={index} style={{backgroundColor:getColor(index)}}>
                                <div style={{ backgroundColor: "white", flex: list.length - index * 1.1 }}>

                                </div>
                                <div>
                                    {item.name}
                                </div>
                                <div className={styles.welcome}>
                                    {`주문금액 : ${item.min_point}원 이상`}
                                </div> 
                            </div>
                        )
                    })
                }

                {/* <div className={`${styles.grade} ${styles.color2}`}>
                    <div className={styles.empty2}>

                    </div>
                    <div>
                        FAMILY
                    </div>
                    <div>
                        <p>주문건수 1건,</p>
                        <p>주문금액 3만원 이상</p>
                    </div>
                </div>
                <div className={`${styles.grade} ${styles.color3}`}>
                    <div className={styles.empty3}>

                    </div>
                    <div>
                        VIP
                    </div>
                    <div>
                        <p>주문건수 3건,</p>
                        <p>주문금액 30만원 이상</p>
                    </div>
                </div>
                <div className={`${styles.grade} ${styles.color4}`}>
                    <div className={styles.empty4}>

                    </div>
                    <div>
                        VVIP
                    </div>
                    <div>
                        <p>주문건수 20건,</p>
                        <p>주문금액 100만원 이상</p>
                    </div>
                </div> */}
            </div>
            {/* {} */}
            <div style={{ display: 'flex' }}>
                <div className={styles.empty}>

                </div>
                <div className={styles.detail} style={{ flex: list.length }}>
                    등급별 쿠폰 및 혜택은 바로 접속을 통한 경우 적립/사용 가능합니다.
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.info}>
                    <div className={styles.infoTitle}>
                        등급
                    </div>
                    <div className={styles.infoTitle}>
                        <p>포인트</p>
                        <p>추가할인</p>
                    </div>
                    <div className={styles.infoTitle} style={{ flex: list.length }}>
                        쿠폰
                    </div>
                    <div className={styles.infoTitle}>
                        지급기간
                    </div>
                </div>
                {/* {여기부터 중복} */}
                {
                    list.map((item, index) => {
                        return (
                            <div className={styles.contents} key={index}>
                                <div className={styles.content}>
                                    {/* <div>
                                        이미지
                                    </div> */}
                                    <div>
                                        {item.name}
                                    </div>
                                </div>
                                <div className={styles.point}>
                                    {item.benefits}%
                                </div>
                                <div className={styles.coupon} style={{ flex: list.length }}>
                                    {
                                        coupon.filter((temp, findex) => {
                                            if (item.grade_order >= temp.coupon_order) {
                                                return true
                                            }
                                            return false;
                                        })
                                            .map((citem, cindex) => {
                                                const point = citem.min_point;
                                                return (
                                                    <React.Fragment key={cindex}>
                                                        <div style={{ display: "flex", flex: 1, justifyContent: 'center', alignItems: 'center',flexDirection:'column' }}>
                                                            <div style={{ display: "flex", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                <img src={couponImg} alt="" />
                                                            </div>
                                                            <div style={{ display: "flex", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                {point === 0 ? `제한조건 없음` : `${point}이상 결제시`}
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })

                                    }
                                </div>
                                <div className={styles.date}>
                                    매월
                                </div>
                            </div>
                        )
                    })
                }

                {/* {  <div className={styles.contents}>
                    <div className={styles.content}>
                        <div>
                            이미지
                        </div>
                        <div>
                            FAMILY
                        </div>
                    </div>
                    <div className={styles.point}>
                        -
                    </div>
                    <div className={styles.coupon}>
                        <div>
                            <img src={coupon} alt="" />
                        </div>
                        <div>
                            30만원이상 결제시
                        </div>
                        <div>
                            <img src={coupon} alt="" />
                        </div>
                        <div>
                            10만원이상 결제시
                        </div>
                        <div>
                            <img src={coupon} alt="" />
                        </div>
                        <div>
                            제한 조건 없음
                        </div>
                    </div>
                    <div className={styles.date}>
                        매월
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.content}>
                        <div>
                            이미지
                        </div>
                        <div>
                            VIP
                        </div>
                    </div>
                    <div className={styles.point}>
                        -
                    </div>
                    <div className={styles.coupon}>
                        <div>
                            <img src={coupon} alt="" />
                        </div>
                        <div>
                            30만원이상 결제시
                        </div>
                        <div>
                            <img src={coupon} alt="" />
                        </div>
                        <div>
                            10만원이상 결제시
                        </div>
                        <div>
                            <img src={coupon} alt="" />
                        </div>
                        <div>
                            제한 조건 없음
                        </div>
                    </div>
                    <div className={styles.date}>
                        매월
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.content}>
                        <div>
                            이미지
                        </div>
                        <div>
                            VVIP
                        </div>
                    </div>
                    <div className={styles.point}>
                        -
                    </div>
                    <div className={styles.coupon}>
                        <div>
                            <img src={coupon} alt="" />
                        </div>
                        <div>
                            30만원이상 결제시
                        </div>
                        <div>
                            <img src={coupon} alt="" />
                        </div>
                        <div>
                            10만원이상 결제시
                        </div>
                        <div>
                            <img src={coupon} alt="" />
                        </div>
                        <div>
                            제한 조건 없음
                        </div>
                    </div>
                    <div className={styles.date}>
                        매월
                    </div>
                </div>} */}
            </div>
        </React.Fragment>
    )
}
export default Graph;