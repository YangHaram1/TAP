import styles from './Dash.module.css'

export const Dash=()=>{
    


    return (
        <div className={styles.container}>
            <div className={styles.today}>
                <div className={styles.toDO}>
                    <div className={styles.title}>
                        <h2>오늘 처리할 일</h2>
                    </div>
                    <div className={styles.table}>
                        <table>
                            <thead>
                                <tr>
                                    <td>상태</td>
                                    <td>건수</td>
                                    <td>금액</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>결제완료</td>
                                    <td> 건</td>
                                    <td> 원</td>
                                </tr>
                                <tr>
                                    <td>배송준비중</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>환불요청</td>
                                    <td>건</td>
                                    <td>원</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.todayDone}>
                    <div className={styles.title}>
                        <h2>오늘 처리한 일</h2>
                    </div>
                    <div className={styles.table}>
                        <table>
                            <thead>
                                <tr>
                                    <td>상태</td>
                                    <td>건수</td>
                                    <td>금액</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>결제완료</td>
                                    <td> 건</td>
                                    <td> 원</td>
                                </tr>
                                <tr>
                                    <td>배송준비중</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>환불요청</td>
                                    <td>건</td>
                                    <td>원</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className={styles.row2}>
                <div className={styles.dollar}>
                    <h2>오늘 총 금액 </h2>
                </div>
                <div className={styles.order}>
                    <h2>막대그래프 (카테고리별 주문 건수 )</h2>
                </div>
            </div>
        </div>
    );
}