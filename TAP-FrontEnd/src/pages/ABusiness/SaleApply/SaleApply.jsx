import styles from './SaleApply.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { api } from '../../../config/config';

export const SaleApply = () => {
  const [seats, setSeats] = useState([]);
  const [sale, setSale] = useState([]);
  const [productName, setProductName] = useState('');
  const [productData, setProductData] = useState(null); // 서버에서 가져온 상품 데이터
  const [discountRate, setDiscountRate] = useState(''); // 할인율
  const [discountedPrice, setDiscountedPrice] = useState(null); // 계산된 할인 가격

  // 상품 데이터 가져오기
  const fetchProductData = async () => {
    try {
      const response = await api.get(`/biz/application/products?name=${productName}`);
      if (response.data) {
        setProductData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error('상품 데이터를 가져오는 데 실패했습니다.', error);
    }
  };

  // 상품명 입력 핸들러
  const handleSearch = () => {
    if (productName.trim()) {
      fetchProductData();
    }
  };

  // 할인율 계산
  useEffect(() => {
    if (productData && discountRate) {
      const calculatedPrice = productData.price * (1 - discountRate / 100);
      setDiscountedPrice(calculatedPrice);
    }
  }, [discountRate, productData]);

  return (
    <div className={styles.container}>
      <h2>상품 세일 등록</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>상품명</td>
              <td>
                <div className={styles.search}>
                  <input
                    type="search"
                    placeholder="상품명 또는 상품번호를 입력하세요."
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={styles.faMagnifyingGlass}
                    onClick={handleSearch}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>할인율</td>
              <td>
                <div className={styles.sale_percent}>
                  <input
                    type="number"
                    value={discountRate}
                    onChange={(e) => setDiscountRate(e.target.value)}
                    placeholder="할인율 입력"
                  />
                </div>
                <div className={styles.input_price}>
                  <div className={styles.price}>
                    <p>기존 가격: {productData ? `${productData.price}원` : '가격을 불러오세요'}</p>
                  </div>
                  <div className={styles.arrow}>
                    <p>{'>'}</p>
                  </div>
                  <div className={styles.price}>
                    <p>할인 가격: {discountedPrice ? `${discountedPrice.toFixed(2)}원` : '계산값 출력'}</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
