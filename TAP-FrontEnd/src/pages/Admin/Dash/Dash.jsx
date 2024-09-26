import { useEffect, useState } from 'react';
import styles from './Dash.module.css'
import { api } from '../../../config/config';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
export const Dash=()=>{
    
   
    const [orderCounts, setOrderCounts] = useState([]);
    const [applyTodayCounts, setApplyTodayCounts] = useState('');
    const [saleTodayCounts, setSaleTodayCounts] = useState('');
    const [deliveryTodayCounts, setDeliveryTodayCounts] = useState('');
    // ==== Done ====
    const [doneApprovedCounts, setDoneApprovedCounts ] = useState('');
    const [doneSaleCounts, setDoneSaleCounts] = useState('');
    const [doneDeliveryCounts, setDoneDeliveryCounts] = useState('');
    // ==== total price ===
    const [totalToday, setTotalToday] = useState([])
    // ==== refund price ====
    const [refundAmount, setRefundAmount] = useState([]);

    useEffect(() => {
        // 카테고리별 주문 건수 - group by 로 하면 카테고리 별 카운트 가져올 수 있나?
        api.get('admin/dash/getordercount')
            .then((resp) => {
                setOrderCounts(resp.data); // API에서 받은 데이터를 상태에 저장
            })
            .catch((error) => console.error('Error fetching order counts:', error));
        api.get(`/admin/dash/getapply`)
            .then((resp)=>{
                setApplyTodayCounts(resp.data)
        
            })
            .catch((error) => console.error('Error fetching Today counts:', error));
        api.get(`/admin/dash/getsale`)
            .then((resp)=>{
                setSaleTodayCounts(resp.data)
           
            })
            .catch((error) => console.error('Error fetching Sale Today counts:', error));
        api.get(`/admin/dash/getdelivery`)
            .then((resp)=>{
                setDeliveryTodayCounts(resp.data)
               
            })
            .catch((error) => console.error('Error fetching Sale Today counts:', error));
        // ==============오늘 처리한 일 ===============
        api.get(`/admin/dash/getapprovedtoday`)
            .then((resp)=>{
                setDoneApprovedCounts(resp.data)
         
            })
            .catch((error) => console.error('Error fetching Sale Today counts:', error));
        api.get(`/admin/dash/getsaleapprovedtoday`)
            .then((resp)=>{
                setDoneSaleCounts(resp.data)
         
            })
            .catch((error) => console.error('Error fetching Sale Today counts:', error));
        api.get(`/admin/dash/getdeliverytoday`)
            .then((resp)=>{
                setDoneDeliveryCounts(resp.data)
          
            })
            .catch((error) => console.error('Error fetching Sale Today counts:', error));
        
        // ============= 오늘 판 총 금액 ===========
        api.get(`/admin/dash/gettotaltoday`)
            .then((resp)=>{
                setTotalToday(resp.data)
            
            })
            .catch((error) => console.error('Error fetching Sale Today counts:', error));

        // ============== 환불 금액 ===============
        api.get('/admin/dash/getrefund')
            .then((resp) => {
                setRefundAmount(resp.data); // 환불 금액 설정
            
            })
            .catch((error) => console.error('Error fetching refund amount:', error));
    }, []);

    // 카테고리별 주문 건수를 그래프로 표현하기 위한 데이터 구성
    const barChartData = {
        labels: orderCounts.map((category) => category.SUB_CATEGORY_NAME), // 카테고리 이름 배열
        datasets: [
            {
                label: '카테고리별 주문 건수',
                data: orderCounts.map((category) => category.ORDER_COUNT), // 카테고리별 주문 건수 배열
                backgroundColor: 
                [
                    'pink',  // 첫 번째 카테고리 색상
                    'yellow',  // 두 번째 카테고리 색상
                    // 'rgb(137 43 226 / 33%)',  // 세 번째 카테고리 색상
                    'rgb(204, 204, 255)',
                    'purple'   // 네 번째 카테고리 색상
                ], 
                borderColor: 'transparent',
                borderWidth: 1,
            },
        ],
    };

    // 차트 옵션 설정
    const barChartOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // X축 그리드 비활성화
                },
                ticks: {
                    color: '#000', // X축 글자 색상
                    font: {
                        size: 14, // X축 글자 크기
                    },
                },
            },
            y: {
                beginAtZero: true, // Y축 0부터 시작
                grid: {
                    color: 'transparent', // Y축 그리드 색상
                },
                ticks: {
                    color: '#000', // Y축 눈금 색상
                    callback: function(value) {
                        return orderCounts.map((category) => category.ORDER_COUNT).includes(value) ? value : null;
                    },
                },
                max: Math.max(...orderCounts.map((category) => category.ORDER_COUNT)) + 2,
            },
        },
    };
    return (
        <div className={styles.container}>
            <div className={styles.today}>
                <div className={styles.toDO}>
                    <div className={styles.title}>
                        <h3>오늘 처리할 일</h3>
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
                                    <td> {applyTodayCounts} 건</td>
                                    <td> {applyTodayCounts === 0 ? "건수 없음" : "처리 필요"}</td>
                                </tr>
                                <tr>
                                    <td>세일신청</td>
                                    <td>{saleTodayCounts} 건</td>
                                    <td> {saleTodayCounts === 0 ? "건수 없음" : "처리 필요"}</td>
                                </tr>
                                <tr>
                                    <td>배송 준비중</td>
                                    <td>{deliveryTodayCounts} 건</td>
                                    <td> {deliveryTodayCounts === 0 ? "건수 없음" : "처리 필요"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
             
                <div className={styles.todayDone}>
                    <div className={styles.title}>
                        <h3>오늘 처리한 일</h3>
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
                                    <td>상품승인</td>
                                    <td> {doneApprovedCounts} 건</td>
                                    <td>  {doneApprovedCounts=== 0 ? "건수 없음" : "처리 완료"}</td>
                                </tr>
                                <tr>
                                    <td>세일승인</td>
                                    <td>{doneSaleCounts} 건</td>
                                    <td>{doneSaleCounts=== 0 ? "건수 없음" : "처리 완료"}</td>
                                </tr>
                                <tr>
                                    <td>발송 완료</td>
                                    <td>{doneDeliveryCounts} 건</td>
                                    <td>{doneDeliveryCounts=== 0 ? "건수 없음" : "전달 완료"} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className={styles.row2}>
                <div className={styles.dollar}>
                    <h3>이번달 총 매출</h3>
                    <div className={styles.total_sum}>{Number(totalToday.total_sum)?.toLocaleString()} 원</div>
                    <div className={styles.total_count_box}>{totalToday.total_count} 건</div>
                </div>

                <div className={styles.order}>
                    <h3>카테고리별 주문 건수</h3>
                    <Bar data={barChartData} options={barChartOptions} />
                </div>
            </div>

            <div className={styles.row2}>
                <div className={styles.refund}>
                    <h3>이번달 환불 금액</h3>
                    <div className={styles.total_sum}>
                    {Number(refundAmount.REFUND_SUM || 0).toLocaleString()} 원
                    </div>
                    <div className={styles.total_count_box}>
                    {refundAmount.REFUND_COUNT || 0} 건
                    </div>
                </div>
            </div>
        </div>
    );
}