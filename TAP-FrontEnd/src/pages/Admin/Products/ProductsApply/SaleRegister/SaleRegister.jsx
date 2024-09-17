
import { useEffect, useState } from 'react';
import styles from './SaleRegister.module.css';
import { api } from '../../../../../config/config';
import { RegisterByCategory } from '../ProductsRegister/RegisterByCategory/RegisterByCategory';
import { SaleByCategory } from './SaleByCategory/SaleByCategory';

export const SaleRegister=()=>{
    const [category, setCategory] = useState(0); // 카테고리 탭
    const [tap, setTap] = useState(0); // 상품 상태 탭
    const categories = [
        { name: '뮤지컬', value: 1 },
        { name: '콘서트', value: 2 },
        { name: '야구', value: 3 },
        { name: '축구', value: 4 },
    ];
    // const categories = ['뮤지컬', '콘서트', '야구', '축구'];    // 카테고리 하드코딩 변경 필요함~~~~
    const [waitingCount, setWaitingCount] = useState(0); // 신청 상품 대기 수
    const [resultCount, setResultCount] = useState(0);   // 신청 처리 상품 수
    
    // 카테고리 및 상품 상태에 따라 데이터를 표시
    const renderProducts = () => {
        // return <RegisterByCategory category={categories[category].value} categoryName={categories[category].name} tap={tap} />;
        return <SaleByCategory category={categories[category].value} categoryName={categories[category].name} tap={tap} />;
    };

    // 카테고리 및 상품 상태에 따른 대기 및 결과 상품 수 데이터 가져오기
    useEffect(() => {
        const fetchProductsCounts = async () => {
            try {
                const waitingCountRes = api.get(`/admin/products/count/sale/waiting?category=${categories[category].value}`); // 대기 상품 수
                const resultCountRes = api.get(`/admin/products/count/sale/result?category=${categories[category].value}`);   // 처리된 상품 수
                
                const [waitingCountData, resultCountData] = await Promise.all([waitingCountRes, resultCountRes]);
                
                // 응답 결과를 상태에 저장
                setWaitingCount(waitingCountData.data);
                setResultCount(resultCountData.data);
            } catch (error) {
                console.error('Error fetching product counts:', error);
            }
        };

        fetchProductsCounts(); // 컴포넌트가 마운트될 때 및 카테고리 변경될 때 데이터 가져오기
    }, [category]); // 카테고리가 변경될 때마다 다시 API 요청


    const handleCategoryChange = (index) => {
    setCategory(index);
    setTap(0); // 탭을 0으로 초기화
    };

    return (
        <div className={styles.container}>
            <div className={styles.product_table}>
                <h2>할인 상품 신청 내역</h2>

                {/* 카테고리 탭 버튼들 */}
                <div className={styles.category_btns}>
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryChange(index)} 
                            className={category === index ? styles.active : ''}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* 상품 상태 탭 버튼들 */}
                <div className={styles.btns}>
                    <button
                        onClick={() => setTap(0)}
                        className={tap === 0 ? styles.active : ''}
                    >
                        신청 상품 ({waitingCount}) {/* 대기 상품 수 출력 */}
                    </button>
                    <button
                        onClick={() => setTap(1)}
                        className={tap === 1 ? styles.active : ''}
                    >
                        신청 처리 상품 ({resultCount}) {/* 처리된 상품 수 출력 */}
                    </button>
                   
                </div>

                <div className={styles.divider}></div>

                {/* 상품 리스트 */}
                <div className={styles.detail_page}>
                    {renderProducts()}
                </div>
            </div>
        </div>
    );
};
