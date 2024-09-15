import { useState } from 'react';
import styles from './ProductsManage.module.css';
import { ProductsCurrent } from './ProductsCurrent/ProductsCurrent';

export const ProductsManage = () => {
    const [category, setCategory] = useState(0); // 카테고리 탭
    const [tap, setTap] = useState(0); // 상품 상태 탭

    const categories = ['뮤지컬', '콘서트', '야구', '축구'];    // 카테고리 하드코딩 변경 필요함~~~~

    // 카테고리 및 상품 상태에 따라 데이터를 표시
    const renderProducts = () => {
        return <ProductsCurrent category={categories[category]} tap={tap} />;
    };

    const handleCategoryChange = (index) => {
    setCategory(index);
    setTap(0); // 탭을 0으로 초기화
    };

    return (
        <div className={styles.container}>
            <div className={styles.product_table}>
                <h2>판매 상품 내역</h2>

                {/* 카테고리 탭 버튼들 */}
                <div className={styles.category_btns}>
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryChange(index)} 
                            className={category === index ? styles.active : ''}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* 상품 상태 탭 버튼들 */}
                <div className={styles.btns}>
                    <button
                        onClick={() => setTap(0)}
                        className={tap === 0 ? styles.active : ''}
                    >
                        현재 판매 상품
                    </button>
                    <button
                        onClick={() => setTap(2)}
                        className={tap === 2 ? styles.active : ''}
                    >
                        판매 예정 상품
                    </button>
                    <button
                        onClick={() => setTap(1)}
                        className={tap === 1 ? styles.active : ''}
                    >
                        판매 종료 상품
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
