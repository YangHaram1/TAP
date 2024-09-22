import { useEffect, useState } from 'react';
import styles from './CurrentEvent.module.css'
import { api } from '../../../../config/config';
import {Pagination} from '../../../../components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

export const CurrentEvent=()=>{
    const [events, setEvents] = useState([]);
    const [filtered, setFiltered] = useState(events);
    const navigate = useNavigate();

    useEffect(()=>{
        // 신청 완료 목록 - { 판매중, 판매예정, 판매종료 }
        api.get(`/biz/registration/current`).then((resp)=>{
            setEvents(resp.data); // 상품들 세팅하기
            setFiltered(resp.data); // 검색될때 사용할 filtered 상태
            console.log(resp.data);
        });

        // 신청대기중, 

    },[])

    // 날짜 변환 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = `${date.getFullYear()}년`;
        const month = date.toLocaleString('ko-KR', { month: 'short' });
        const day = date.getDate();
        const weekday = date.toLocaleString('ko-KR', { weekday: 'short' });
        return { year, month, day, weekday };
    };

    // 페이지네이션 설정
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 3;
    const pageCount = Math.ceil(filtered.length / PER_PAGE);
    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
        window.scrollTo(0,0); // 페이지 변경 시 스크롤 맨 위로 이동
    };

    const handleSaleApplyClick = (applicationSeq) => {
        navigate(`/application/sale`, { state: { applicationSeq } });
    };
    

    return(
        <div className={styles.container}>
            <div className={styles.product_table}>
            <table>
                <thead>
                <tr>
                    <th>상품정보</th>
                    <th>판매 오픈일</th>
                    <th>공연 기간</th>
                    <th>공연장</th>
                    <th>할인신청</th>
                </tr>
                </thead>
                <tbody>
                {filtered.slice(currentPage * PER_PAGE, (currentPage +1) * PER_PAGE).map((product, index) => (
                    <tr key={index}>
                    <td className={styles.product_info}>
                        <div className={styles.product_image_container}>
                        <img src={product.FILES_SYSNAME} alt={product.FILES_ORINAME} className={styles.product_image} />
                        <span className={styles.status_tag}>예매중</span> {/* 상태 표시 */}
                        </div>
                        <div className={styles.product_details }>
                        <div className={styles.product_name}>{product.NAME}</div>
                        <div className={styles.product_sub_info}>
                            {product.SUB_CATEGORY_NAME} | {product.AGE_LIMIT} | {product.RUNNING_TIME} 분
                        </div>
                        </div>
                    </td>
                    <td>
                    <div className={styles.date_group}>                       
                        {(() => {
                            const { year, month, day, weekday } = formatDate(product.open_date);
                            return (
                                <>
                                    <span className={styles.date_year}>{year}</span>
                                    <span className={styles.date_value}>
                                        {month} {day}
                                        <span className={styles.date_weekday}>{weekday}</span>
                                    </span>
                                </>
                            );
                        })()}
                    </div>
                </td>
                <td>
                    <div className={styles.date_range}>
                        {(() => {
                            const start = formatDate(product.start_date);
                            const end = formatDate(product.end_date);
                            return (
                                <>
                                    <span className={styles.date_year}>{start.year}</span>
                                    <div className={styles.date_range_values}>
                                        <span className={styles.date_value}>
                                            {start.month} {start.day}
                                            <span className={styles.date_weekday}>{start.weekday}</span>
                                        </span>
                                        <span className={styles.date_range_separator}>~</span>
                                        <span className={styles.date_value}>
                                            {end.month} {end.day}
                                            <span className={styles.date_weekday}>{end.weekday}</span>
                                        </span>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </td>
                    <td className={styles.product_venue}>{product.PLACE_NAME} </td>
                    <td>
                        {/* SALE_APPROVED에 따른 조건부 표시 */}
                        {product.SALE_APPROVED === '승인 대기' ? (
                            <span className={styles.approval_pending}>⏳ 신청 중</span>
                        ) : product.SALE_APPROVED === '승인 완료' ? (
                            <span className={styles.approval_complete}>✅ 승인 완료</span>
                        ) : (
                            <button className={styles.manage_button}
                                onClick={() => handleSaleApplyClick(product.APPLICATION_SEQ)}
                            >할인 신청</button>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
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