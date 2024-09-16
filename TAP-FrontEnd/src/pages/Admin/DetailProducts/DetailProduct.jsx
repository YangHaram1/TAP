import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../config/config';

export const DetailProduct = () => {
    const { application_seq } = useParams(); // URL에서 application_seq를 가져옴
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                // const response = await api.get(`/admin/products/${application_seq}`);
                // setProductDetails(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [application_seq]);

    if (!productDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>상품 상세 정보</h2>
            <p>상품명: {productDetails.NAME}</p>
            <p>카테고리: {productDetails.SUB_CATEGORY_NAME}</p>
            <p>연령 제한: {productDetails.AGE_LIMIT}</p>
            <p>상영 시간: {productDetails.RUNNING_TIME} 분</p>
            <p>상영 장소: {productDetails.PLACE_NAME}</p>
            <p>판매 시작: {new Date(productDetails.start_date).toLocaleDateString()}</p>
            <p>판매 종료: {new Date(productDetails.end_date).toLocaleDateString()}</p>
        </div>
    );
};
