// DetailRegist 컴포넌트
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../../../../config/config';
import styles from './DetailRegist.module.css';
import Modal from '../../../../Chat/List/Modal/Modal';
import { ModalStatus } from '../ModalStatus/ModalStatus';

export const DetailRegist = () => {
    const { application_seq } = useParams(); // URL에서 application_seq를 가져옴
    const { state } = useLocation(); // location에서 state 받아옴
    const { tap } = state; // tap 값 추출
    const [productDetails, setProductDetails] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
    const [selectedProduct, setSelectedProduct] = useState(null); // 선택된 상품 관리
    const navigate = useNavigate();

    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await api.get(`/admin/products/apply`, {
                    params: { application_seq: application_seq } // 쿼리 파라미터로 전달
                });
                setProductDetails(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setIsLoading(false); // 로딩 상태 변경
            }
        };

        fetchProductDetails();
    }, [application_seq]);

    // Loading 상태 처리
    if (isLoading) {
        return <p>Loading...</p>;
    }

    // 데이터가 없을 때 처리
    if (!productDetails || productDetails.length === 0) {
        return <p>상품 정보를 불러올 수 없습니다.</p>;
    }

    const handleBack = () => {
        navigate('/products/apply');
    };

    const handleReject = () => {
        setSelectedProduct(application_seq);  // 선택한 product의 application_seq 설정
        setIsModalOpen(true);  // 모달 열기
    };

    const handleApprove = async () => {
        const confirmApprove = window.confirm("해당 상품을 승인하시겠습니까?");

        if (confirmApprove) {
            try {
                const response = await api.put(`/admin/products/apply/approve`, {
                    application_seq: application_seq
                });

                if (response.status === 200) {
                    alert("상품이 성공적으로 승인되었습니다.");
                    navigate('/products/apply');
                }
            } catch (error) {
                console.error('Error approving product:', error);
                alert("승인 중 오류가 발생했습니다.");
            }
        } else {
            alert("승인이 취소되었습니다.");
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

    return (
        <div className={styles.container}>
            <h2>
            {productDetails.length > 0 && productDetails[0].STATUS === '승인 완료'
                ? `[${productDetails[0].SUB_CATEGORY_NAME}] 승인 완료 상품`
                : productDetails[0].STATUS === '승인 반려'
                ?  `[${productDetails[0].SUB_CATEGORY_NAME}] 승인 반려 상품`
                :  `[${productDetails[0].SUB_CATEGORY_NAME}] 승인 대기 상품`}
        </h2>
            <table className={styles.detailTable}>
            {productDetails.map((product, index) => (
                <tbody key={index}>
                    <tr>
                       
                        <td>
                            <strong>신청번호:</strong> {product.APPLICATION_SEQ}
                        </td>
                        <td rowSpan="4" className={styles.imgtd}>
                            {/* 상품 이미지 */}
                            <img
                                src={product.FILES_SYSNAME || '/path/to/default-image.jpg'} // 이미지가 없으면 기본 이미지
                                alt={product.NAME}
                                className={styles.productImage}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>상품명:</strong> {product.NAME}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>신청일:</strong> {formatDate(product.created_at)}
                        </td>
                    </tr>
                    {product.STATUS === '승인 완료' && (
                    <tr>
                        <td colSpan="2">
                            <strong>승인일:</strong> {formatDate(product.updated_at)}
                        </td>
                    </tr>
                    )}
                    {product.STATUS === '승인 반려' && (
                        <tr>
                            <td colSpan="2">
                                <strong>반려일:</strong> {formatDate(product.updated_at)}
                            </td>
                        </tr>
                    )}
                       {/* 반려 이유 추가 */}
                    {product.STATUS === '승인 반려' && (
                    <tr>
                        <td colSpan="2">
                            <strong>반려 이유:</strong> {product.REJECT_REASON || ''}
                        </td>
                    </tr>
                    )}
                    <tr>
                        <td colSpan="2">
                            <strong>일자:</strong> {formatDate(product.start_date)} ~ {formatDate(product.end_date)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <strong>티켓 오픈일:</strong> {formatDate(product.open_date)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <strong>카테고리:</strong> {product.SUB_CATEGORY_NAME}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <strong>연령 제한:</strong> {product.AGE_LIMIT}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <strong>상영 시간:</strong> {product.RUNNING_TIME} 분
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <strong>상영 장소:</strong> {product.PLACE_NAME}
                        </td>
                    </tr>
                </tbody>
            ))}
        </table>

            <div className={styles.btn}>
                {tap === 0 ? (
                    <>
                        <button onClick={handleApprove}>승인</button>
                        <button onClick={handleReject}>반려</button>
                        <button onClick={handleBack}>취소</button>
                    </>
                ) : tap === 1 ? (
                    <button onClick={handleBack}>목록으로</button>
                ) : null}
            </div>
          
            {isModalOpen && (
            <ModalStatus onClose={closeModal} applicationSeq={selectedProduct} />
        )}
        
        </div>
    );
};
