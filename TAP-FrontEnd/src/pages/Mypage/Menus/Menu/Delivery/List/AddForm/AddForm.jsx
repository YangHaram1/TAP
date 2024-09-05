import styles from './AddForm.module.css';
import Mybutton from './../../../../MyButton/Mybutton';

const AddForm = ({ setCheck }) => {
    return (
        <div className={styles.container}>
            <div className={styles.contents}>
                <div className={styles.content1}>
                    배송지명
                </div>
                <div className={styles.content2}>
                    <input type="text" />
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.content1}>
                    수령인
                </div>
                <div className={styles.content2}>
                    <input type="text" />
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.content1}>
                    주소
                </div>
                <div className={styles.content2}>
                    <button>주소검색</button>
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.content1}>
                    휴대폰번호
                </div>
                <div className={styles.content2}>
                    <input type="text" placeholder='-포함 입력' />
                </div>
            </div>
            <Mybutton setcheck={setCheck} />
        </div>
    )
}
export default AddForm;