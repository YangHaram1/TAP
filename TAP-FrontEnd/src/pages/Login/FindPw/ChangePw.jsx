import styles from './FindPw.module.css'

export const ChangePw = ({ newPassword, confirmPassword, handleChange, handleResetPassword }) => {
    return (
        <form className={styles.form} onSubmit={handleResetPassword}>
            <div className={styles.inputId}>
                <input
                    type="password"
                    placeholder="새 비밀번호"
                    name="newPassword"
                    value={newPassword}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.inputId}>
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.btn}>
                <button className={styles.button} type="submit">
                    비밀번호 변경
                </button>
            </div>
        </form>
    )
}

