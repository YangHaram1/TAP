import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../config/config';
import styles from './DetailProducts.module.css'
export const DetailProduct = () => {
    const { application_seq } = useParams(); // URL에서 application_seq를 가져옴
    const [productDetails, setProductDetails] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await api.get(`/admin/products`, {
                    params: { application_seq: application_seq } // 쿼리 파라미터로 전달
                });
                console.log(response.data)
                setProductDetails(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [application_seq]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short',
        });
    };

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

    if (!productDetails) {
        return <p>Loading...</p>;
    }

    const handleBack = () => {
        navigate(-1);
        
    };

    return (
        <div className={styles.container}>
        <h2> [{productDetails[0].SUB_CATEGORY_NAME}] 상품 상세</h2>
    
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

        <div className={styles.tolist}>
            <button onClick={handleBack}>목록으로</button>
        </div>
       
      
    
        </div>
    );
};
