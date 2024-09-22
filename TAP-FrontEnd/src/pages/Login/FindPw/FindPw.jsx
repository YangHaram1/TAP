import styles from './FindPw.module.css'
import { useEffect, useState } from 'react'
import img1 from '../../../images/logo192.png'
import Swal from 'sweetalert2'
import { api } from '../../../config/config'
import { VerifyCode } from './VerifyCode'
import { ChangePw } from './ChangePw'
import { useNavigate } from 'react-router-dom'

const FindPw = () => {
    const [step, setStep] = useState(1) // 단계 관리 상태
    const [findPw, setFindPw] = useState({
        id: '',
        email: '',
        code: '',
        newPassword: '',
        confirmPassword: '',
    })

    // 정규식 검사
    const [regexData, setRegexData] = useState({
        id: false,
        email: false,
        // userCheck: false, // 존재하는 회원인지 검사
    })

    // 새 비밀번호 정규식, 일치 검사
    const [regexPwData, setRegexPwData] = useState({
        newPassword: false, //비밀번호 정규식
        pwCheck: false, // 비밀번호 일치 검사
    })

    const [checkAll, setcheckAll] = useState(false)

    const navi = useNavigate()

    useEffect(() => {
        //(regexData.birth&&regexData.address&&regexData.detailed_address)
        const allTrue = Object.values(regexData).every(value => value === true)
        setcheckAll(allTrue)
        console.log(regexData)
    }, [regexData])

    // const handleAddChage = e => {
    //     const { name, value } = e.target
    //     setFindPw(prev => ({ ...prev, [name]: value }))

    //     if (name === 'id') {
    //         //영어 대소문자랑 숫자 조합으로 12자이내 정규식
    //         const regex = /^[A-Za-z0-9]{5,12}$/

    //         setRegexData(prev => {
    //             return { ...prev, [name]: regex.test(value) }
    //         })
    //     } else if (name === 'email') {
    //         const emailRegex =
    //             /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i
    //         setRegexData(prev => {
    //             return { ...prev, [name]: emailRegex.test(value) }
    //         })
    //         // setRegexData(prev => {
    //         //     return {
    //         //         ...prev,
    //         //         isEmailVerified: false,
    //         //         emailAvailable: false,
    //         //     }
    //         // })
    //     }
    // }
    const handleChange = e => {
        const { name, value } = e.target
        setFindPw(prev => ({ ...prev, [name]: value }))
        if (name === 'id') {
            //영어 대소문자랑 숫자 조합으로 12자이내 정규식
            const regex = /^[A-Za-z0-9]{5,12}$/

            setRegexData(prev => {
                return { ...prev, [name]: regex.test(value) }
            })
        } else if (name === 'email') {
            const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i
            setRegexData(prev => {
                return { ...prev, [name]: emailRegex.test(value) }
            })
        } else if (name === 'newPassword') {
            const regex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/

            setRegexPwData(prev => {
                return { ...prev, [name]: regex.test(value) }
            })
            // 비밀번호 확인 필드와 비교
            if (findPw.confirmPassword === value)
                setRegexPwData(prev => {
                    return { ...prev, pwCheck: true }
                })
            else {
                setRegexPwData(prev => {
                    return { ...prev, pwCheck: false }
                })
            }
        } else if (name === 'confirmPassword') {
            // 새 비밀번호와 일치하는지 확인
            if (findPw.newPassword === value)
                setRegexPwData(prev => {
                    return { ...prev, pwCheck: true }
                })
            else {
                setRegexPwData(prev => {
                    return { ...prev, pwCheck: false }
                })
            }
        }
    }

    const handleFindPw = async () => {
        const { id, email } = findPw
        try {
            // 계정 존재 확인
            const resp = await api.get(`members/findPw/${id}/${email}`)

            if (resp.data) {
                // 계정이 존재할 때 이메일 전송
                await api.post(`/members/requestPasswordReset/${email}`, { id })
                Swal.fire({
                    icon: 'success',
                    title: '이메일 전송 완료',
                    text: '이메일로 인증번호가 전송되었습니다.',
                })
                setStep(2) // 다음 단계로 이동
            } else {
                // 계정이 존재하지 않을 대
                Swal.fire({
                    icon: 'error',
                    title: '계정 없음',
                    text: '입력하신 정보와 일치하는 계정이 없습니다.',
                })
            }
        } catch (error) {
            // 요청 실패 처리
            Swal.fire({
                icon: 'error',
                title: '오류',
                text: '이메일 전송에 실패했습니다. 다시 시도해 주세요.',
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
                text: '인증번호가 확인되었습니다.',
            })
            setStep(3) // 비밀번호 변경 단계로 이동
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류',
                text: '인증번호 확인에 실패했습니다. 다시 시도해 주세요.',
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
                text: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
            })
            return
        }
        try {
            await api.post(`/members/resetPassword`, {
                id,
                email,
                code: findPw.code,
                newPassword,
            })
            Swal.fire({
                icon: 'success',
                title: '비밀번호 변경 완료',
                text: '비밀번호가 성공적으로 변경되었습니다.',
            })
            // 필요 시 다른 페이지로 이동하거나 초기화
            navi('/login')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류',
                text: '비밀번호 변경에 실패했습니다. 다시 시도해 주세요.',
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
                    {findPw.id === '' ? (
                        <span></span>
                    ) : regexData.id ? (
                        <span style={{ color: '#3737ff' }}>
                            아이디 형식이 맞습니다.
                        </span>
                    ) : (
                        <span>{`형식에 맞게 입력해주세요.`}</span>
                    )}
                    <div className={styles.inputEmail}>
                        <input
                            type="text"
                            placeholder="이메일"
                            name="email"
                            value={findPw.email}
                            onChange={handleChange}
                        />
                    </div>
                    {findPw.email === '' ? (
                        <span></span>
                    ) : regexData.email ? (
                        <span style={{ color: '#3737ff' }}>
                            이메일 형식이 맞습니다.
                        </span>
                    ) : (
                        <span>{`이메일 형식이 맞지 않습니다.`}</span>
                    )}
                    <div className={styles.btn}>
                        <button
                            className={styles.button}
                            onClick={handleFindPw}
                        >
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
                    regexPwData={regexPwData}
                />
            )}
        </div>
    )
}

export default FindPw
