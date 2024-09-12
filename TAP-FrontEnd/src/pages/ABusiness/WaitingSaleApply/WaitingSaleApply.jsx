import { useState } from 'react';
import styles from './WaitingSaleApply.module.css';
import { CompletedSaleApply } from './CompletedSaleApply/CompletedSaleApply';
import { WaitingSaleList } from './WaitingSaleList/WaitingSaleList';

export const WaitingSaleApply =()=>{
    const [tap, setTap] = useState(0);
    const [currentData, setCurrentData] = useState([]);
    const [futureData, setFutureData] =useState([]);
    const [pastData, setPastData] =useState([]);
    window.scrollTo(0,0); // 페이지 변경 시 스크롤 맨 위로 이동
    
    return(
    <div className={styles.container}>
        <div className={styles.product_table}>
        <h2>상품 세일 신청 내역 </h2>
        <div className={styles.btns}>
            <button onClick={()=>{setTap(0)}}
                className={tap === 0 ? styles.active : ''}
                >승인 대기 내역 </button>
            <button onClick={()=>{setTap(1)}}
                className={tap === 1? styles.active : ''}
                >최근 승인 내역 </button>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.detail_page}>
            {
                tap === 1 ? <CompletedSaleApply/> :
                <WaitingSaleList/>
            }
        </div>
        </div>
    </div>
    );
}