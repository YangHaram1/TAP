import styles from './SaleApply.module.css';
import { useEffect, useState } from 'react';
import { api } from '../../../config/config';
import { useLocation, useNavigate } from 'react-router-dom';

export const SaleApply = () => {
    const [selectedProduct, setSelectedProduct] = useState(null); // 선택된 상품
    const [seatInfo, setSeatInfo] = useState([]); // 선택된 상품의 좌석 정보
    const [discountRate, setDiscountRate] = useState(''); // 할인율
    const [discountedPrices, setDiscountedPrices] = useState([]); // 계산된 할인 가격들
    const navigate = useNavigate();
    const location = useLocation();
    const applicationSeq = location.state?.applicationSeq;

    useEffect(() => {
        if (applicationSeq) {
            // applicationSeq로 필요한 데이터를 서버에서 가져오기
            fetchProductData(applicationSeq);
        }
    }, [applicationSeq]);

    // 서버에서 상품 데이터 가져오기
    const fetchProductData = async (applicationSeq) => {
        try {
            const response = await api.get(`/biz/application/products?nameOrNumber=${applicationSeq}`);
            if (response.data) {
                const product = response.data.find(item => item.APPLICATION_SEQ === applicationSeq);
                setSelectedProduct(product);

                // 해당 상품의 좌석 정보 필터링
                const filteredSeats = response.data.filter(item => item.APPLICATION_SEQ === applicationSeq);
                setSeatInfo(filteredSeats);
            }
        } catch (error) {
            console.error('상품 데이터 가져오기 실패:', error);
        }
    };

    // 할인율 계산
    useEffect(() => {
        if (!discountRate || seatInfo.length === 0) {
            setDiscountedPrices([]); // 할인율이나 선택된 상품이 없으면 초기화
            return;
        }
        if (seatInfo.length > 0 && discountRate) {
            const calculatedPrices = seatInfo.map((item) => ({
                application_seq: item.APPLICATION_SEQ,
                place_seat_level: item.PLACE_SEAT_LEVEL,
                discountedPrice: (item.PRICE_SEAT * (1 - discountRate / 100)).toFixed(0), // 할인 가격 계산
                discountRate: discountRate,
            }));
            setDiscountedPrices(calculatedPrices);
        }
    }, [discountRate, seatInfo]);

    // 작성 취소
    const handleCancel = () => {
        const userConfirmed = window.confirm("작성을 취소하시겠습니까?");
        if (userConfirmed) {
            navigate('/');
        }
    };

    // 제출 핸들러
    const handleSubmit = async () => {
        try {
            await api.post(`/biz/application/sale`, discountedPrices);
            alert('신청이 완료되었습니다!');
            navigate('/'); // 완료 후 메인 페이지로 이동
        } catch (error) {
            console.error('서버에 전송 중 오류 발생:', error);
            alert('서버에 전송 실패. 다시 시도해 주세요.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>상품 세일 등록</h2>
            </div>
            {selectedProduct ? (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td>선택된 상품</td>
                                <td>{selectedProduct.NAME} (번호: {selectedProduct.APPLICATION_SEQ})</td>
                            </tr>
                            <tr>
                                <td>좌석 등급 및 가격</td>
                                <td>
                                    <ul>
                                        {seatInfo.map((seat, index) => (
                                            <li key={index}>
                                                {seat.PLACE_SEAT_LEVEL}: {Number(seat.PRICE_SEAT)?.toLocaleString()}원
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>할인율 적용</td>
                                <td>
                                    <input
                                        type="number"
                                        value={discountRate}
                                        onChange={(e) => setDiscountRate(e.target.value)}
                                        placeholder="할인율 입력"
                                    />
                                    %
                                </td>
                            </tr>
                            {discountedPrices.length > 0 && (
                                <tr>
                                    <td>할인 가격</td>
                                    <td>
                                        <ul>
                                            {discountedPrices.map((price, index) => (
                                                <li key={index}>
                                                    {price.place_seat_level}: {Number(price.discountedPrice)?.toLocaleString()}원
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className={styles.btn_form}>
                        <button className={styles.btn_submit} onClick={handleSubmit}>신청</button>
                        <button className={styles.btn_cancel} onClick={handleCancel}>취소</button>
                    </div>
                </div>
            ) : (
                <p>상품 정보를 불러오는 중입니다...</p>
            )}
        </div>
    );
};
