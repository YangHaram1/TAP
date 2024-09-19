import { useEffect, useState } from 'react';
import { api } from '../../../../../config/config';
import { Pagination } from '../../../../../components/Pagination/Pagination';
import styles from './ProducsCurrent.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

export const ProductsCurrent = ({ category, categoryName, tap }) => {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // tap 값에 따라 서버 엔드포인트 결정
                let productList = '';
                if (tap === 0) {
                    productList = `/admin/products/current?category=${category}`; // 현재 판매 중인 상품
                } else if (tap === 1) {
                    productList = `/admin/products/past?category=${category}`; // 판매 종료된 상품
                } else if (tap === 2) {
                    productList = `/admin/products/future?category=${category}`; // 판매 예정인 상품
                }

                const response = await api.get(productList);
                console.log(response.data)
                setProducts(response.data);
                setFiltered(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts(); // 컴포넌트가 마운트될 때 데이터 가져오기
    }, [category, tap]); // 카테고리와 상품 상태가 변경될 때마다 다시 API 요청

    // 나머지 로직은 동일
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short',
        });
    };
    // 시, 분
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    

    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 3;
    const pageCount = Math.ceil(filtered.length / PER_PAGE);
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo(0, 0); // 페이지 변경 시 스크롤 맨 위로 이동
    };

    // 클릭하면 해당 상품의 application_seq를 포함하여 DetailProduct로 이동
    const handleRowClick = (application_seq) => {
        navigate(`/products/${application_seq}`);
    };

    return (
        <div className={styles.container}>
            <h3>{categoryName} - {tap === 0 ? "현재 판매 중" : tap === 1 ? "판매 종료" : "판매 예정"}</h3>
                <div className={styles.product_table}>
                    
                {filtered.length > 0 ? (
                    <>
                    <table className={styles.table}>
                    <tbody>
                        {filtered
                            .slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE)
                            .map((product, index) => (
                                <tr key={index} 
                                onClick={() => handleRowClick(product.APPLICATION_SEQ)} // application_seq 전달
                                className={styles.table_row}
                                >
                                    <td>{product.APPLICATION_SEQ}</td>
                                    <td className={styles.product_info}>
                                        <div className={styles.product_image_container}>
                                            <img
                                                src={product.FILES_SYSNAME}
                                                alt={product.FILES_ORINAME}
                                                className={styles.product_image}
                                            />
                                            <span 
                                                className={`${styles.status_tag} ${tap === 0 
                                                    ? styles.status_tag_booking 
                                                    : tap === 1 
                                                    ? styles.status_tag_sold_out 
                                                    : styles.status_tag_upcoming}`}>
                                                {tap === 0 ? "예매중" : tap === 1 ? "판매 종료" : "판매 예정"}
                                            </span>
                                        </div>
                                        <div className={styles.product_details}>
                                            <div className={styles.product_name}>
                                                {product.NAME}
                                            </div>
                                            <div className={styles.product_sub_info}>
                                                {product.SUB_CATEGORY_NAME} | {product.AGE_LIMIT} |{' '}
                                                {product.RUNNING_TIME} 분
                                            </div>
                                        </div>
                                    </td>
                                    <td>오픈:<br/> {formatTime(product.open_date)}</td>
                                    <td className={styles.product_date}>
                                        {product.PLACE_NAME}<br/>
                                        {formatDate(product.start_date)}~ <br />
                                        {formatDate(product.end_date)}
                                    </td>
                                    <td>
                                        <button className={styles.manage_button}>상품상세</button>
                                    </td>
                                </tr>
                            ))}
                               </tbody>
                </table>
                    </>
                ) : (
                    <p className={styles.no_products}>해당 카테고리에 대한 상품이 없습니다.</p>
                )}
             
            </div>
            <div className={styles.pagination}>
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
