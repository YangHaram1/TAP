import { useEffect, useState } from "react";
import styles from './CompletedApply.module.css';
import { api } from "../../../../config/config";
import { Pagination } from "../../../../components/Pagination/Pagination";
import { useAuthStore } from "../../../../store/store";
import { FaLightbulb } from "react-icons/fa";

export const CompletedApply =()=>{
    const { login, loginID, setAuth} = useAuthStore();
    const [events, setEvents] = useState([]);
    const [filtered, setFiltered] = useState(events);
    
  
    useEffect(()=>{
        // 신청 완료 목록 - { 판매중, 판매예정, 판매종료 }
        api.get(`/biz/registration/recent`).then((resp)=>{
            setEvents(resp.data); // 상품들 세팅하기
            setFiltered(resp.data); // 검색될때 사용할 filtered 상태
            // console.log(resp.data);
        });

    },[])

    // 신청 취소 버튼 함수
    const handleCancel = ()=>{
        const confirmClear = window.confirm(
            "상품 등록 신청을 취소하시겠습니까?"
        );
        if (confirmClear) {
            alert("apfhd");
            // console.log()
        //    api.delete(`biz/registration/${상품번호}`).then((resp)=>{
        //     console.log(resp.data);
        //    })
        }
    }

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
            <div className={styles.product_table}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>접수번호</th>
                    <th>상품정보</th>
                    <th>공연장 및 일시</th>
                    <th>신청일 / 승인일</th>
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
                        <div className={styles.product_image_container}>
                        <img src={product.FILES_SYSNAME} alt={product.FILES_ORINAME} className={styles.product_image_container} />
                        </div>
                        <div className={styles.product_details }>
                            <div className={styles.product_name}>{product.NAME}</div>
                            <div className={styles.product_sub_info}>
                                {product.SUB_CATEGORY_NAME} | {product.AGE_LIMIT} | {product.RUNNING_TIME} 분
                            </div>
                        </div>
                    </td>
                    <td className={styles.product_date}>
                        <div className={styles.product_venue}>{product.PLACE_NAME}</div>
                        {/* <br/> */}
                        {formatDate(product.start_date)}~ <br/>{formatDate(product.end_date)}
                      
                    </td>
                    <td className={styles.product_venue}>
                        신청일: {formatDate(product.created_at)} 
                        <br/> 처리일:  {formatDate(product.updated_at)}
                    </td>
                    <td className={styles.product_venue}>
                    {product.STATUS !== '승인 반려' ? (
                        <div className={`${styles.status} ${
                        product.STATUS === '승인 대기' ? styles['status-pending'] :
                        product.STATUS === '승인 완료' ? styles['status-approved'] :
                        ''
                        }`}>
                        {product.STATUS}
                        </div>
                    ) : (
                        <div className={styles.rejectReason}>
                        <span className={`${styles.tooltipIcon} ${styles['status-rejected']}`}>
                            반려 <FaLightbulb size={20} />
                        </span>
                        <div className={styles.tooltipText}>
                            반려 이유: {product.REJECT_REASON} 
                        </div>
                        </div>
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