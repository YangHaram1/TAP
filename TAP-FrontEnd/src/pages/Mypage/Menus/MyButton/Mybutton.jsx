import styles from './Mybutton.module.css';

const Mybutton=({handleCancel,handleConfirm})=>{
    return(
        <div className={styles.buttonDiv}>
        <div className={styles.cancel}>
            <button onClick={handleCancel}>취소</button>
        </div>
        <div className={styles.confirm}>
            <button onClick={handleConfirm}>확인</button>
        </div>
    </div>
    )
}
export default Mybutton;