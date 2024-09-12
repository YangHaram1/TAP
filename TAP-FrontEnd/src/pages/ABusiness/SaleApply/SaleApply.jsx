import styles from './SaleApply.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export const SaleApply =()=>{
    return(
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
                                />
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className={styles.faMagnifyingGlass}
                                />
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td>할인율</td>
                            <td>
                                <div className={styles.sale_percent}>
                                    <input type='text'/>
                                </div>
                                <div className={styles.input_price}>
                                    <div className={styles.price}>
                                        <p>db에서 가격 가져오기</p>
                                    </div>
                                    <div className={styles.arrow}>
                                        <p>`{'>'}`</p>
                                    </div>
                                    <div className={styles.price}>
                                        <p>db에서 가격 * 입력된 할인율 - 계산값 출력</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}