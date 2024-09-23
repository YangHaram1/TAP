import styles from './FindPw.module.css'

export const VerifyCode = ({ code, handleChange, handleVerifyCode }) => {
    return (
        <form className={styles.form} onSubmit={handleVerifyCode}>
            <div className={styles.inputId}>
                <input
                    type="text"
                    placeholder="인증번호 입력"
                    name="code"
                    value={code}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.btn}>
                <button className={styles.button} type="submit">
                    인증번호 확인
                </button>
            </div>
        </form>
    )
}


