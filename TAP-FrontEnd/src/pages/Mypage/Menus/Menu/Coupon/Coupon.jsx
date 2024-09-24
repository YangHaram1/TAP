import styles from './Coupon.module.css';

import { useState } from 'react';
import List from './List/List';
import Apply from './Apply/Apply';

const Coupon =()=>{
    const [check,setCheck]= useState(true);
    const hanldeCheck=(value)=>{
        setCheck(value);
    }
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                쿠폰 및 예매 관리
            </div>
            <div className={styles.body}>
                <div className={styles.contents}>
                    <div className={check?styles.content:styles.contentReverse} onClick={()=>{hanldeCheck(true)}}>
                        내 쿠폰 내역
                    </div>
                    <div className={!check?styles.content:styles.contentReverse} onClick={()=>{hanldeCheck(false)}}>
                        {/* 배송지 설정 */} 내 예매 내역
                    </div>
                </div>
                <div>
                    {check?<List/>:<Apply/>}
                </div>
            </div>
        </div>
    )
}
export default Coupon;