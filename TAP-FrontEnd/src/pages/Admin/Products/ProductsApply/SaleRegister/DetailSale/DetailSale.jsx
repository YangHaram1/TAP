import { useEffect, useState } from "react";
import { api } from "../../../../../../config/config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from './DetailSale.module.css';
import { ModalStatus } from "../../ProductsRegister/ModalStatus/ModalStatus";

export const DetailSale =()=>{
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
                const response = await api.get(`/admin/products/sale/apply`, {
                    params: { application_seq: application_seq } // 쿼리 파라미터로 전달
                });
                setProductDetails(response.data);
                console.log(response.data)
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
        navigate('/products/apply/sale');
    };

    const handleReject = () => {
        setSelectedProduct(application_seq);  // 선택한 product의 application_seq 설정
        setIsModalOpen(true);  // 모달 열기
    };

    const handleApprove = async () => {
        const confirmApprove = window.confirm("해당 상품을 승인하시겠습니까?");

        if (confirmApprove) {
            try {
                const response = await api.put(`/admin/products/sale/apply/approve`, {
                    application_seq: application_seq
                });

                if (response.status === 200) {
                    alert("상품이 성공적으로 승인되었습니다.");
                    navigate('/products/apply/sale');
                }
            } catch (error) {
                console.error('Error approving product:', error);
                alert("승인 중 오류가 발생했습니다.");
            }
        } else {
            alert("승인이 취소되었습니다.");
        }
    };

    return (
        <div>
            <h2>할인 신청 상품 상세 정보</h2>
            <ul>
                {productDetails.length > 0 && (
                    <li>
                        <p>상품명: {productDetails[0].APPLICATION_SEQ}</p>
                        <p>카테고리: {productDetails[0].SUB_CATEGORY_NAME}</p>
                        <p>연령 제한: {productDetails[0].AGE_LIMIT}</p>
                        <p>상영 시간: {productDetails[0].RUNNING_TIME} 분</p>
                        <p>상영 장소: {productDetails[0].PLACE_NAME}</p>
                        <p>할인율 : {productDetails[0].SALE_RATE}%</p>
                    </li>
                )}
            </ul>

            <div className={styles.btn}>
                {tap === 0 ? (
                    <>
                        <button onClick={handleApprove}>승인</button>
                        <button onClick={handleReject}>반려</button>
                        <button onClick={handleBack}>취소</button>
                    </>
                ) : tap === 1 ? (
                    <p>승인 완료 처리</p>
                ) : null}
            </div>
          
            {isModalOpen && (
            <ModalStatus onClose={closeModal} applicationSeq={selectedProduct} />
        )}
        
        </div>
    );
};
