import styles from './Discount.module.css';

export const Discount = ()=>{
    return(
        <div className={styles.container}>
            <div className={styles.main_left_price_box}>
                <h3>가격</h3>
                <div className={styles.price_box_header}>
                    VIP석 좌석 n개를 선택하셨습니다.
                </div>
                <div className={styles.price_box_content}>
                    <div className={`${styles.price_box_cotent} ${styles.content1}`}>기본가</div>
                    <div className={`${styles.price_box_cotent} ${styles.content2}`}>일반</div>
                    <div className={`${styles.price_box_cotent} ${styles.content3}`}>140,000원</div>
                    <div className={`${styles.price_box_cotent} ${styles.content4}`}>
                        <select>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={styles.main_left_coupon_box}>
                <h3>할인 / 쿠폰 <span>(중복 사용 불가)</span></h3>
                <div className={styles.coupon_box_content}>
                    <div className={styles.coupon_list}>
                        <input type='radio' name="coupon"/> <label>쿠폰 종류</label>
                    </div>
                    <div className={styles.coupon_list}>
                        <input type='radio' name="coupon"/> <label>쿠폰 종류</label>
                    </div>
                    <div className={styles.coupon_list}>
                        <input type='radio' name="coupon"/> <label>쿠폰 종류</label>
                    </div>
                    <div className={styles.coupon_list}>
                        <input type='radio' name="coupon" disabled/> <label className={styles.disabledText}>사용불가 쿠폰</label>
                    </div>
                </div>
            </div>
        </div>
    );

}