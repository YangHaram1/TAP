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
    const formatTime = (dateString) => {
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
            <table  className={styles.table}>
               
                <tbody>
                {filtered.slice(currentPage * PER_PAGE, (currentPage +1) * PER_PAGE).map((product, index) => (
                    <tr key={index}>
                        <td>{product.APPLICATION_SEQ}</td>
                        <td className={styles.product_info}>
                            <div className={styles.product_image_container}>
                                <img src={product.FILES_SYSNAME} alt={product.FILES_ORINAME} className={styles.product_image_container} />
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
                       
                               <span className={styles.date_year}> {product.PLACE_NAME} </span>
                               <br/>
                              {formatTime(product.start_date)} ~ <br/>
                              {formatTime(product.end_date)} 

                    
                    </div>
                </td>
                    {/* <td className={styles.product_venue}>{product.PLACE_NAME} </td> */}
                    <td style={{textAlign:"center"}}>
                        {/* SALE_APPROVED에 따른 조건부 표시 */}
                        {product.SALE_APPROVED === '승인 대기' ? (
                            <span className={styles.approval_pending}>⏳ 신청 중</span>
                        ) : product.SALE_APPROVED === '승인 완료' ? (
                            <span className={styles.approval_complete} >✅ 승인 완료</span>
                        ) : (
                            <button className={styles.manage_button}
                                onClick={() => handleSaleApplyClick(product.APPLICATION_SEQ)}
                            > <span className={styles.approval_sale}> 💰 할인 신청</span>
                            </button>
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