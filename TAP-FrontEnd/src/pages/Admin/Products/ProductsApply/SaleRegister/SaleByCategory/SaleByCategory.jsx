

import { useEffect, useState } from 'react';
import styles from './SaleByCategory.module.css'
import { api } from '../../../../../../config/config';
import { Pagination } from '../../../../../../components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';


export const SaleByCategory =({ category, categoryName, tap })=>{
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // 선택된 상품 관리
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProducts = async () => {
            console.log(category)
            try {
                let productList = '';
                if (tap === 0) {
                    productList = `/admin/products/sale/waiting?category=${category}`; // 상품신청대기 리스트 
                } else if (tap === 1) {
                    productList = `/admin/products/sale/result?category=${category}`; // 상품신청처리완료 리스트
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
    
    // tap 값에 따라 다른 버튼 텍스트 또는 동작을 설정
    const renderManageButton = (product) => {
        if (tap === 0) {
            return (
                <button className={styles.manage_button}>
                    대기
                </button>
            );
        } else if (tap === 1) {
            return (
                <button className={styles.manage_button}>
                    {product.SALE_APPROVED}
                </button>
            );
        } 
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short',
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
        navigate(`/products/apply/sale/${application_seq}`, { state: { tap } });
    };

    return (
        <div className={styles.container}>
            <h3>{categoryName} - {tap === 0 ? "할인 상품 등록 승인 대기 중" : tap === 1 ? "할인 상품 등록 처리 완료" : "승인 대기중"}</h3>
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
                                    <td>신청번호 {product.APPLICATION_SEQ}</td>
                                    <td> {product.COMPANY_NAME} </td>
                                    <td className={styles.product_info}>
                                        <div className={styles.product_image_container}>
                                        <img
                                                src={product.FILES_SYSNAME}
                                                className={styles.product_image_container}
                                            />
                                        </div>
                                        <div className={styles.product_details}>
                                            <div className={styles.product_name}>
                                                {product.NAME}
                                            </div>
                                            <div className={styles.product_sub_info}>
                                                {product.AGE_LIMIT} |{' '}
                                                {product.RUNNING_TIME} 분
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.product_date}>
                                        {formatDate(product.start_date)}~ <br />
                                        {formatDate(product.end_date)}
                                    </td>
                                    <td className={styles.product_venue}>
                                        {product.PLACE_NAME}
                                    </td>
                                    <td>
                                        {renderManageButton(product)}
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
