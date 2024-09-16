import styles from './SaleApply.module.css';
import { useEffect, useState } from 'react';
import { api } from '../../../config/config';
import { useNavigate } from 'react-router-dom';

export const SaleApply = () => {
  const [productNameOrNumber, setProductNameOrNumber] = useState(''); // 상품명 또는 상품번호 상태
  const [productData, setProductData] = useState([]); // 중복 제거된 상품 데이터 (uniqueProducts)
  const [allProducts, setAllProducts] = useState([]); // 중복 제거하지 않은 전체 상품 데이터 (AllProducts)
  const [selectedProduct, setSelectedProduct] = useState(null); // 선택된 상품
  const [seatInfo, setSeatInfo] = useState([]); // 선택된 상품의 좌석 정보
  const [discountRate, setDiscountRate] = useState(''); // 할인율
  const [discountedPrices, setDiscountedPrices] = useState([]); // 계산된 할인 가격들
  const [searchedKeyword, setSearchedKeyword] = useState(''); // 검색된 상품명 저장
  const navi = useNavigate();

  // 서버에서 상품 데이터 가져오기
  const fetchProductData = async () => {
    try {
      const response = await api.get(`/biz/application/products?nameOrNumber=${productNameOrNumber}`);
      if (response.data) {
        setAllProducts(response.data); // 중복 제거하지 않은 전체 상품 데이터 설정

        // 중복된 APPLICATION_SEQ를 제거하여 고유한 상품만 남기기
        const uniqueProducts = response.data.reduce((acc, current) => {
          const foundProduct = acc.find(item => item.APPLICATION_SEQ === current.APPLICATION_SEQ);
          if (!foundProduct) {
            acc.push(current); // 같은 상품번호가 없으면 추가
          }
          return acc;
        }, []);

        setProductData(uniqueProducts); // 중복을 제거한 데이터로 설정
        console.log('Unique Products:', uniqueProducts);
        console.log('All Products:', response.data); // 중복 제거되지 않은 전체 데이터 출력
      }
    } catch (error) {
      console.error('products getProductByNameOrNumber 실패', error);
    }
  };

  // 검색 핸들러
  const handleSearch = () => {
    if (!productNameOrNumber.trim()) {
      setProductData([]); // 상품 데이터 초기화
      setDiscountedPrices([]); // 할인 가격 초기화
      setSearchedKeyword(''); // 검색어 초기화
      return;
    }
    setSearchedKeyword(productNameOrNumber); // 검색어 저장
    fetchProductData();
  };

  // 상품 선택 핸들러
  const handleSelectProduct = (product) => {
    setSelectedProduct(product); // 선택된 상품 설정
    // allProducts에서 선택된 uniqueProduct의 APPLICATION_SEQ에 해당하는 모든 좌석 정보를 필터링
    const filteredSeats = allProducts.filter(item => item.APPLICATION_SEQ === product.APPLICATION_SEQ);
    setSeatInfo(filteredSeats); // 좌석 정보 설정
    setDiscountedPrices([]); // 새로운 상품을 선택할 때 할인 가격 초기화
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
      console.log("작성이 취소되었습니다.");
      navi('/');
    } else {
      console.log("작성이 계속됩니다.");
    }
  };

  // 제출 핸들러
  const handleSubmit = async () => {
    try {
      const response = await api.post(`/biz/application/sale`, discountedPrices);
      alert('신청이 완료되었습니다!');
      navi('/'); // 완료 후 메인 페이지로 이동
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
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>상품명 또는 상품번호</td>
              <td>
                <input
                  type="text"
                  placeholder="상품명 또는 상품번호를 입력하세요."
                  value={productNameOrNumber}
                  onChange={(e) => setProductNameOrNumber(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>검색</td>
              <td>
                <button onClick={handleSearch}>검색</button>
                {searchedKeyword ? (
                  productData.length > 0 ? (
                    <ul>
                      {productData.map((product, index) => (
                        <li key={index} onClick={() => handleSelectProduct(product)}>
                          {product.NAME} (번호: {product.APPLICATION_SEQ})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>검색 결과가 없습니다.</p>
                  )
                ) : null}
              </td>
            </tr>
            {selectedProduct && (
              <>
                <tr>
                  <td>선택된 상품</td>
                  <td>
                    {selectedProduct.NAME} (번호: {selectedProduct.APPLICATION_SEQ})
                  </td>
                </tr>
                <tr>
                  <td>좌석 등급 및 가격</td>
                  <td>
                    <ul>
                      {seatInfo.map((seat, index) => (
                        <li key={index}>
                          {seat.PLACE_SEAT_LEVEL}: {seat.PRICE_SEAT}원
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
                            {price.place_seat_level}: {price.discountedPrice}원
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
        <div className={styles.btn_form}>
          <button className={styles.btn_submit} onClick={handleSubmit}>신청</button>
          <button className={styles.btn_cancel} onClick={handleCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};
