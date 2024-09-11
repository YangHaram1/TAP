import { useState } from 'react';
import styles from './WaitingApply.module.css';
import { CompletedApply } from './CompletedApply/CompletedApply';
import { WaitingList } from './WaitingList/WaitingList';

export const WaitingApply=()=>{
    const [tap, setTap] = useState(0);
    const [currentData, setCurrentData] = useState([]);
    const [futureData, setFutureData] =useState([]);
    const [pastData, setPastData] =useState([]);
    window.scrollTo(0,0); // 페이지 변경 시 스크롤 맨 위로 이동
    
    return(
    <div className={styles.container}>
        <div className={styles.product_table}>
        <h2>상품 신청 내역 </h2>
        <div className={styles.btns}>
            <button onClick={()=>{setTap(0)}}>승인 대기 내역 </button>
            <button onClick={()=>{setTap(1)}}>최근 승인 내역 </button>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.detail_page}>
            {
                tap === 1 ? <CompletedApply/> :
                <WaitingList/>
            }
        </div>
        </div>
    </div>
  );
}