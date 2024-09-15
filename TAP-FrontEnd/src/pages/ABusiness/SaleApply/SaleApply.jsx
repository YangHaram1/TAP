import styles from './SaleApply.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { api } from '../../../config/config';
import { useNavigate } from 'react-router-dom';

export const SaleApply = () => {
  const [productName, setProductName] = useState('');
  const [productData, setProductData] = useState([]); // 서버에서 가져온 상품 데이터
  const [discountRate, setDiscountRate] = useState(''); // 할인율
  const [discountedPrices, setDiscountedPrices] = useState([]); // 계산된 할인 가격들
  const [searchedKeyword, setSearchedKeyword] = useState(''); // 검색된 상품명 저장
  const navi = useNavigate();
 
  const fetchProductData = async () => {
    try {
      const response = await api.get(`/biz/application/products?name=${productName}`);
      if (response.data) {
        setProductData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error('products getProductByName 실패', error);
    }
  };

  // 상품명 입력 핸들러
  const handleSearch = () => {
    if (!productName.trim()) {
      setProductData([]); // 상품 데이터 초기화
      setDiscountedPrices([]); // 할인 가격 초기화
      setSearchedKeyword(''); // 검색어 초기화
      return;
    }
    setSearchedKeyword(productName); // 검색어 저장
    fetchProductData();

  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

 // 할인율 계산
  useEffect(() => {
    if (!discountRate) {
      setDiscountedPrices([]); // 할인율이 없으면 할인 가격 초기화
      return;
    }
    if (productData.length > 0 && discountRate) {
      const calculatedPrices = productData.map((item) => {
        return {
          application_seq: item.APPLICATION_SEQ,
          place_seat_level: item.PLACE_SEAT_LEVEL,
          discountedPrice: (item.PRICE_SEAT * (1 - discountRate / 100)).toFixed(0),  // 할인 가격 계산
          discountRate: discountRate
        };
      });
      setDiscountedPrices(calculatedPrices);
    }
  }, [discountRate, productData]);



  const handleCancel=()=>{
    const userConfirmed = window.confirm("작성을 취소하시겠습니까?");
    
    if (userConfirmed) {
        console.log("작성이 취소되었습니다.");
        navi('/'); 
    } else {
        console.log("작성이 계속됩니다.");
    }
  }

  const handleSubmit = async ()=>{
    try {
        
      const response = await api.post(`/biz/application/sale`, discountedPrices);
      alert('신청이 완료되었습니다!');
      navi('/'); // 완료 후 메인 페이지로 이동
    } catch (error) {
      console.error('서버에 전송 중 오류 발생:', error);
      alert('서버에 전송 실패. 다시 시도해 주세요.');
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>상품 세일 등록</h2>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <tbody>
            <tr style={{height:"150px"}}>
              <td>상품명</td>
              <td>
                <div className={styles.search}>
                  <input
                    type="search"
                    placeholder="상품명 또는 상품번호를 입력하세요."
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    onKeyDown={handleKeyPress} // 엔터 키로 검색
                  />
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={styles.faMagnifyingGlass}
                    onClick={handleSearch}
                  />
                </div>
                {searchedKeyword ? (
                  productData.length > 0 ? (
                    <div className={styles.searchresult}>
                      <p>검색 상품명 : {productData[0].NAME} </p> 
                      <p>검색 상품번호 : {productData[0].APPLICATION_SEQ}</p> 
                    </div>
                  ) : (
                    <div className={styles.searchresult}>
                      <p>검색명: {searchedKeyword}</p> 
                      <p>검색 결과가 없습니다.</p>
                    </div>
                  )
                ) : null }
              </td>
            </tr>
            <tr>
              <td>할인가 적용</td>
              <td>
                <div className={styles.sale_percent}>
                  <input
                    type="number"
                    value={discountRate}
                    onChange={(e) => setDiscountRate(e.target.value)}
                    placeholder="할인율 입력"
                  /> 
                  %
                </div>
                <div className={styles.input_price}>
                  <div className={styles.price}>
                  <table style={{height:"250px"}}>
                          <thead>
                            <tr>
                              <td>좌석 레벨</td>
                              <td>기존 가격</td>
                            </tr>
                          </thead>
                          <tbody>
                            {productData.length > 0 && 
                              productData.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.PLACE_SEAT_LEVEL}</td>
                                  <td>{item.PRICE_SEAT}원</td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                  </div>
                  <div className={styles.arrow}>
                    <p>{'>'}</p>
                  </div>
                  <div className={styles.price}>
                  <table style={{height:"250px"}}>
                          <thead>
                            <tr>
                              <td>좌석 레벨</td>
                              <td>할인 가격</td>
                            </tr>
                          </thead>
                          <tbody>
                          {discountedPrices.length > 0 ? (
                      discountedPrices.map((price, index) => (
                        <tr key={index}>
                        <td>{price.place_seat_level}</td>
                        <td>{price.discountedPrice}원</td>
                      </tr>
                      ))
                    ) : (
                      // <tr><td colSpan={2} style={{textAlign:"center"}}> 
                      //   가격을 불러오세요
                      // </td></tr>
                      ""
                    )}
                    </tbody>
                </table>
                   
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.btn_form}>
          <button className={styles.btn_submit} onClick={handleSubmit}>신청</button>
          <button className={styles.btn_submit} onClick={handleCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};
