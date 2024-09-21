import { useState, useEffect } from 'react';
import styles from './WaitingSaleApply.module.css';
import { CompletedSaleApply } from './CompletedSaleApply/CompletedSaleApply';
import { WaitingSaleList } from './WaitingSaleList/WaitingSaleList';

export const WaitingSaleApply = () => {
    // 처음에 localStorage에서 tap 값을 가져오고, 없다면 0으로 설정
    const initialTap = localStorage.getItem('tap') ? parseInt(localStorage.getItem('tap')) : 0;
    const [tap, setTap] = useState(initialTap);
    const [currentData, setCurrentData] = useState([]);
    const [futureData, setFutureData] = useState([]);
    const [pastData, setPastData] = useState([]);

    // 페이지 변경 시 스크롤 맨 위로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tap]);

    // tap 상태가 변경될 때 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('tap', tap);
    }, [tap]);

    return (
        <div className={styles.container}>
            <div className={styles.product_table}>
                <h3>상품 세일 신청 내역</h3>
                <div className={styles.btns}>
                    <button
                        onClick={() => { setTap(0); }}
                        className={tap === 0 ? styles.active : ''}
                    >
                        승인 대기 내역
                    </button>
                    <button
                        onClick={() => { setTap(1); }}
                        className={tap === 1 ? styles.active : ''}
                    >
                        최근 승인 내역
                    </button>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.detail_page}>
                    {tap === 1 ? <CompletedSaleApply /> : <WaitingSaleList />}
                </div>
            </div>
        </div>
    );
};
