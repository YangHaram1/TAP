import styles from './FindPw.module.css'
import { useState } from 'react'
import img1 from '../../../images/logo192.png'
import Swal from 'sweetalert2'
import { api } from '../../../config/config'
import { VerifyCode } from './VerifyCode'
import { ChangePw } from './ChangePw'

const FindPw = () => {
    const [step, setStep] = useState(1) // 단계 관리 상태
    const [findPw, setFindPw] = useState({ id: '', email: '', code: '', newPassword: '', confirmPassword: '' })

    const handleChange = e => {
        const { name, value } = e.target
        setFindPw(prev => ({ ...prev, [name]: value }))
    }

    const handleFindPw = async () => {
        const { id, email } = findPw
        try {
            await api.post(`/members/requestPasswordReset/${email}`, { id })
            Swal.fire({
                icon: 'success',
                title: '이메일 전송 완료',
                text: '이메일로 인증번호가 전송되었습니다.'
            })
            setStep(2) // 다음 단계로 이동
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류',
                text: '이메일 전송에 실패했습니다. 다시 시도해 주세요.'
            })
        }
    }

    const handleVerifyCode = async e => {
        e.preventDefault()
        const { id, email, code } = findPw
        try {
            await api.post(`/members/verifyEmail`, { id, email, code })
            Swal.fire({
                icon: 'success',
                title: '인증 완료',
                text: '인증번호가 확인되었습니다.'
            })
            setStep(3) // 비밀번호 변경 단계로 이동
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류',
                text: '인증번호 확인에 실패했습니다. 다시 시도해 주세요.'
            })
        }
    }

    const handleResetPassword = async e => {
        e.preventDefault()
        const { id, email, newPassword, confirmPassword } = findPw
        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: '오류',
                text: '비밀번호와 비밀번호 확인이 일치하지 않습니다.'
            })
            return
        }
        try {
            await api.post(`/members/resetPassword`, { id, email, code: findPw.code, newPassword })
            Swal.fire({
                icon: 'success',
                title: '비밀번호 변경 완료',
                text: '비밀번호가 성공적으로 변경되었습니다.'
            })
            // 필요 시 다른 페이지로 이동하거나 초기화
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류',
                text: '비밀번호 변경에 실패했습니다. 다시 시도해 주세요.'
            })
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <img src={img1} alt="" className={styles.logo} />
            </div>
            {step === 1 && (
                <div className={styles.form}>
                    <div className={styles.inputId}>
                        <input
                            type="text"
                            placeholder="아이디"
                            name="id"
                            value={findPw.id}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputEmail}>
                        <input
                            type="text"
                            placeholder="이메일"
                            name="email"
                            value={findPw.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.btn}>
                        <button className={styles.button} onClick={handleFindPw}>
                            비밀번호 찾기
                        </button>
                    </div>
                </div>
            )}
            {step === 2 && (
                <VerifyCode
                    code={findPw.code}
                    handleChange={handleChange}
                    handleVerifyCode={handleVerifyCode}
                />
            )}
            {step === 3 && (
                <ChangePw
                    newPassword={findPw.newPassword}
                    confirmPassword={findPw.confirmPassword}
                    handleChange={handleChange}
                    handleResetPassword={handleResetPassword}
                />
            )}
        </div>
    )
}

export default FindPw
