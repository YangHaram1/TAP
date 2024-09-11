import { useEffect, useState } from 'react'
import styles from './BizManage.module.css'
import { api } from '../../../config/config';
import { FutureEvent } from './FutureEvent/FutureEvent';
import { PastEvent } from './PastEvent/PastEvent';
import { CurrentEvent } from './CurrentEvent/CurrentEvent';

export const BizManage=()=>{
    const [tap, setTap] = useState(0);
    const [currentData, setCurrentData] = useState([]);
    const [futureData, setFutureData] =useState([]);
    const [pastData, setPastData] =useState([]);

    
    return(
    <div className={styles.container}>
        <div className={styles.product_table}>
        <h2>상품관리 </h2>
        <div className={styles.btns}>
            <button onClick={()=>{setTap(0)}}>판매중</button>
            <button onClick={()=>{setTap(1)}}>판매예정</button>
            <button onClick={()=>{setTap(2)}}>판매종료</button>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.detail_page}>
            {
                tap === 1 ? <FutureEvent/> :
                tap === 2 ? <PastEvent/> : 
                <CurrentEvent/>

            }
        </div>
        </div>
    </div>
  );
};