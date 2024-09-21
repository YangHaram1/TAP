import styles from './FindPw.module.css'

export const ChangePw = ({
    newPassword,
    confirmPassword,
    handleChange,
    handleResetPassword,
    regexPwData,
}) => {
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
            {newPassword === '' ? (
                <span></span>
            ) : regexPwData.newPassword ? (
                <span style={{ color: '#3737ff' }}>
                    비밀번호 형식이 맞습니다.
                </span>
            ) : (
                <span>{`형식에 맞게 입력해주세요.`}</span>
            )}
            <div className={styles.inputId}>
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                />
            </div>
            {confirmPassword === '' ? (
                <span></span>
            ) : regexPwData.pwCheck ? (
                <span style={{ color: '#3737ff' }}>비밀번호 일치합니다.</span>
            ) : (
                <span>{`비밀번호가 일치하지 않습니다.`}</span>
            )}
            <div className={styles.btn}>
                <button className={styles.button} type="submit">
                    비밀번호 변경
                </button>
            </div>
        </form>
    )
}
