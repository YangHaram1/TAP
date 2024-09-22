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
    window.scrollTo(0,0); // 페이지 변경 시 스크롤 맨 위로 이동
    
    return(
    <div className={styles.container}>
        <div className={styles.product_table}>
        <h3>상품관리 </h3>
        <div className={styles.btns}>
            <button onClick={()=>{setTap(0)}}
                className={tap === 0 ? styles.active : ''}
                >판매중</button>
            <button onClick={()=>{setTap(1)}}
                className={tap === 1 ? styles.active : ''}
                >판매예정</button>
            <button onClick={()=>{setTap(2)}}
                className={tap === 2 ? styles.active : ''}
                >판매종료</button>
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