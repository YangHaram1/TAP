import styles from './Password.module.css';
import React from 'react';
const Password = ({ setCheckPw }) => {
    const handleCancel = () => {

    }
    const handleConfirm = () => {

    }
    return (
        <React.Fragment>
            <div className={styles.title}>
                제목
            </div>
            <div className={styles.contents}>
                내용
            </div>
            <div className={styles.button}>
                <div className={styles.cancel}>
                    <button onClick={handleCancel}>취소</button>
                </div>
                <div className={styles.confirm}>
                    <button  onClick={handleConfirm}>확인</button>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Password;