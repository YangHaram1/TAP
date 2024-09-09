import React, { useEffect, useState } from 'react';
import styles from './Graph.jsx.module.css';
import { useAuthStore } from './../../../store/store';
import coupon from '../../../images/coupon.png';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

const Graph = () => {
    const { grade } = useAuthStore();
    const [check, setCheck] = useState([false, false, false, false]);
    useEffect(() => {
        if (grade === 'pending') {
            setCheck((prev) => {
                return (
                    prev.map((item, index) => {
                        if (index === 1) {
                            return true;
                        }
                        return false;
                    })
                )
            })
        }
    }, [])
    return (
        <React.Fragment>
            <div className={styles.header}>
                <div className={styles.empty}>

                </div>
                <div className={`${styles.grade} ${styles.color1}`}>
                    <div className={styles.empty1}>

                    </div>
                    <div>
                        WELECOME
                    </div>
                    <div className={styles.welcome}>
                        일반회원
                    </div>
                </div>
                <div className={`${styles.grade} ${styles.color2}`}>
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
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div className={styles.empty}>

                </div>
                <div className={styles.detail}>
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
                    <div className={styles.infoTitle} style={{flex:4}}>
                        쿠폰
                    </div>
                    <div className={styles.infoTitle}>
                        지급기간
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.content}>
                        <div>
                            이미지
                        </div>
                        <div>
                            WELCOME
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
                </div>
            </div>
        </React.Fragment>
    )
}
export default Graph;