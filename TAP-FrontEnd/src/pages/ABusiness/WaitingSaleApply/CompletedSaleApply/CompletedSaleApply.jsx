import { useEffect, useState } from "react";
import { Pagination } from "../../../../components/Pagination/Pagination";
import { useAuthStore } from "../../../../store/store";
import { api } from "../../../../config/config";
import styles from './CompletedSaleApply.module.css'

export const CompletedSaleApply =()=>{
    const { login, loginID, setAuth} = useAuthStore();
    const [events, setEvents] = useState([]);
    const [filtered, setFiltered] = useState(events);
 
    useEffect(()=>{
        // 할인 신청 승인완료 중 목록 - { 대기, 반려, 취소}
        api.get(`/biz/registration/sale/recent`).then((resp)=>{
            setEvents(resp.data); // 상품들 세팅하기
            setFiltered(resp.data); // 검색될때 사용할 filtered 상태
            console.log(resp.data);
        });

    },[loginID])

    // 날짜 변환 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // 원하는 포맷으로 변환 (년-월-일)
        return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short',
        });
    };

    // 페이지네이션 설정
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 5;
    const pageCount = Math.ceil(filtered.length / PER_PAGE);
    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
        window.scrollTo(0,0); // 페이지 변경 시 스크롤 맨 위로 이동
    };
    

    return(
        <div className={styles.container}>
            {filtered.length === 0 ? (
                <div className={styles.noDataMessage}>
                    최근 한 달동안 승인된 목록이 없습니다
                </div>
            ) : (
            <div className={styles.product_table}>
                <h3>최근 한 달동안 승인된 상품 목록</h3>
            <table>
                <thead>
                <tr>
                    <th>접수<br/>번호</th>
                    <th>상품정보</th>
                    <th>공연장 및 일시</th>
                    <th>할인율</th>
                    <th>상태</th>
                </tr>
                </thead>
                <tbody>
                {filtered.slice(currentPage * PER_PAGE, (currentPage +1) * PER_PAGE).map((product, index) => (
                    <tr key={index}>
                        <td className={styles.product_id}>
                            {product.APPLICATION_SEQ}
                        </td>
                    <td className={styles.product_info}>
                        <div className={styles.product_image_container} style={{paddingLeft:"40px"}}>
                        <img src={product.FILES_SYSNAME}  className={styles.product_image} />
                        </div>
                        <div className={styles.product_details }>
                            <div className={styles.product_name}>{product.NAME}</div>
                        </div>
                    </td>
                    <td className={styles.product_date}>
                        <div className={styles.product_venue}>{product.PLACE_NAME}</div>
                        {/* <br/> */}
                        {formatDate(product.start_date)}~ <br/>{formatDate(product.end_date)}
                    </td>
                    <td>
                        {product.SALE_RATE}%
                    </td>
                    <td className={styles.product_venue}>
                         <span>{product.SALE_APPROVED} </span>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
            </div>
            )}
            <div className={styles.pagination}>
            {/* 페이지네이션 */}
            {pageCount > 0 && (
                <Pagination
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                />
                )}
            </div>

        </div>
    )
}
