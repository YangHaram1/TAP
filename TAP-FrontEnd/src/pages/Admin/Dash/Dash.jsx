import { useEffect, useState } from 'react';
import styles from './Dash.module.css'
import { api } from '../../../config/config';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
export const Dash=()=>{
    
    useEffect(()=>{
        // // 상품등록 건수 | created_at : 오늘, status: '승인 대기' 인 상품등록 건수 
        // // 상품세일 건수 | sale_approved : '승인 대기' 인 상품세일 건수 
        // // 배송 준비중 갯수 | delivery_status : '배송 준비중' 
        // api.get(`/admin/dash/getapply`)
        // api.get(`/admin/dash/getsale`)
        // api.get(`/admin/dash/getdelivery`)
        
        // // 상품 등록 갯수 | updated_at : 오늘인 상품 갯수 
        // // 상품 세일 승인 갯수 | sale_approved : '승인 완료' 갯수
        // // 주문 - 배송 | delievery_status: '발송 완료' 갯수
        // api.get(`/admin/dash/getapplytoday`)
        // api.get(`/admin/dash/getsaletoday`)
        // api.get(`/admin/dash/getdeliverytoday`)
        
        // // 주문 - 오늘 주문 | order_date : 오늘 + 총 금액
        // api.get(`/admin/dash/getorder`)
        // // 주문 | status : '환불' 인 건수 + 총 금액 
        // api.get(`/admin/dash/getrefund`)
        // // 카테고리 별 주문 건수  - group by 로 하면 카테고리 별 카운트 가져올 수 있나?
       
    })

    const [orderCounts, setOrderCounts] = useState([]);

    useEffect(() => {
        // 카테고리별 주문 건수 - group by 로 하면 카테고리 별 카운트 가져올 수 있나?
        api.get('admin/dash/getordercount')
            .then((resp) => {
                setOrderCounts(resp.data); // API에서 받은 데이터를 상태에 저장
                console.log(resp.data)
            })
            .catch((error) => console.error('Error fetching order counts:', error));
    }, []);

    // 카테고리별 주문 건수를 그래프로 표현하기 위한 데이터 구성
    const barChartData = {
        labels: orderCounts.map((category) => category.SUB_CATEGORY_NAME), // 카테고리 이름 배열
        datasets: [
            {
                label: '카테고리별 주문 건수',
                data: orderCounts.map((category) => category.ORDER_COUNT), // 카테고리별 주문 건수 배열
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // 막대 색상
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // 차트 옵션 설정
    const barChartOptions = {
        plugins: {
            legend: {
                display: false, // 범례 비활성화
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
                    color: 'rgba(0, 0, 0, 0.1)', // Y축 그리드 색상
                },
                ticks: {
                    color: '#000', // Y축 눈금 색상
                },
            },
        },
    };
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
                    <Bar data={barChartData} options={barChartOptions} />
                </div>
            </div>
        </div>
    );
}