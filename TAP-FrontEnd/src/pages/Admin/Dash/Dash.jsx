import { useEffect } from 'react';
import styles from './Dash.module.css'
import { api } from '../../../config/config';

export const Dash=()=>{
    
    useEffect(()=>{
        // 상품등록 건수 | created_at : 오늘, status: '승인 대기' 인 상품등록 건수 
        // 상품세일 건수 | sale_approved : '승인 대기' 인 상품세일 건수 
        // 배송 준비중 갯수 | delivery_status : '배송 준비중' 
        api.get(`/admin/dash/getapply`)
        api.get(`/admin/dash/getsale`)
        api.get(`/admin/dash/getdelivery`)
        
        // 상품 등록 갯수 | updated_at : 오늘인 상품 갯수 
        // 상품 세일 승인 갯수 | sale_approved : '승인 완료' 갯수
        // 주문 - 배송 | delievery_status: '발송 완료' 갯수
        api.get(`/admin/dash/getapplytoday`)
        api.get(`/admin/dash/getsaletoday`)
        api.get(`/admin/dash/getdeliverytoday`)
        
        // 주문 - 오늘 주문 | order_date : 오늘 + 총 금액
        api.get(`/admin/dash/getorder`)
        // 주문 | status : '환불' 인 건수 + 총 금액 
        api.get(`/admin/dash/getrefund`)
        // 카테고리 별 주문 건수  - group by 로 하면 카테고리 별 카운트 가져올 수 있나?
        api.get(`admin/dash/getordercount`)
    })


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
                                    <td>비고</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>상품신청</td>
                                    <td> 건</td>
                                    <td> </td>
                                </tr>
                                <tr>
                                    <td>배송준비중</td>
                                    <td>건</td>
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
                                    <td>비고</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>결제완료</td>
                                    <td> 건</td>
                                    <td> 원</td>
                                </tr>
                                <tr>
                                    <td>발송 완료</td>
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