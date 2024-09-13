import { useEffect, useState } from 'react';
import { api } from '../../../../../config/config';
import { Pagination } from '../../../../../components/Pagination/Pagination';
import styles from './ProducsCurrent.module.css'

export const ProductsCurrent = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    useEffect(() => {
        // api.get(`/biz/registration/current`).then((resp)=>{
        //     setEvents(resp.data); // 상품들 세팅하기
        //     setFiltered(resp.data); // 검색될때 사용할 filtered 상태
        //     console.log(resp.data);
        // });

        const fetchProducts = async () => {
            try {
                const response = await api.get(`/admin/products/current?category=${category}`);
                setProducts(response.data);
                setFiltered(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts(); // 컴포넌트가 마운트될 때 데이터 가져오기
    }, [category]); // 카테고리가 변경될 때마다 다시 API 요청

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
    const PER_PAGE = 3;
    const pageCount = Math.ceil(filtered.length / PER_PAGE);
    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
        window.scrollTo(0,0); // 페이지 변경 시 스크롤 맨 위로 이동
    };
    return (
        <div className={styles.container}>
        <div>
            <h3>현재 판매 상품 - {category}</h3>
            {filtered.length > 0 ? (
<>
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
                <td className={styles.product_date}>{formatDate(product.start_date)}~ <br/>{formatDate(product.end_date)}</td>
                <td className={styles.product_venue}>{product.PLACE_NAME} </td>
                <td>
                    <button className={styles.manage_button}>상품관리</button>
                    <button className={styles.edit_button}>수정</button>
                </td>
                </tr>
            ))}
  </>          ) : (
                <p>해당 카테고리에 대한 상품이 없습니다.</p>
            )}
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
    );
};
