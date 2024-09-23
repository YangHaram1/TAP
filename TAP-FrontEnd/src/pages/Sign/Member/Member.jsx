import styles from './Member.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../config/config'
import Swal from 'sweetalert2'

const Member = () => {
    const [member, setMember] = useState({
        id: '',
        pw: '',
        rePw: '',
        name: '',
        email: '',
        birth: '',
        gender: '',
        phone: '',
        zipcode: '',
        address: '',
        detailed_address: '',
    })

    const [verificationCode, setVerificationCode] = useState('')

    const navi = useNavigate()

    // 정규식, 중복 검사 state
    const [regexData, setRegexData] = useState({
        idAvailable: false, // 아이디 중복 검사
        id: false, // 아이디 정규식

        pwCheck: false, // 비밀번호 일치 검사
        pw: false, // 비밀번호 정규식

        name: false, // 이름 정규식

        emailAvailable: false, // 중복검사
        isEmailVerified: false, // 이메일 인증
        email: false, // 이메일 정규식

        birth: false,
        gender: false,
        phone: false,
        address: false,
        detailed_address: false,
        zipcode: false,
    })
    const [checkAll, setcheckAll] = useState(false)

    useEffect(() => {
        //(regexData.birth&&regexData.address&&regexData.detailed_address)
        const allTrue = Object.values(regexData).every(value => value === true)
        setcheckAll(allTrue)
        console.log(regexData)
    }, [regexData])

    const handleAddChange = e => {
        const { name, value } = e.target
        setMember(prev => ({ ...prev, [name]: value }))

        if (name === 'email') {
            const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i
            setRegexData(prev => {
                return { ...prev, [name]: emailRegex.test(value) }
            })
            setRegexData(prev => {
                return {
                    ...prev,
                    isEmailVerified: false,
                    emailAvailable: false,
                }
            })
        } else if (name === 'phone') {
            //010-1111-1111
            const phoneRegex = /^010-\d{4}-\d{4}$/
            setRegexData(prev => {
                return { ...prev, [name]: phoneRegex.test(value) }
            })
        } else if (name === 'id') {
            //영어 대소문자랑 숫자 조합으로 12자이내 정규식
            const regex = /^[A-Za-z0-9]{5,12}$/

            setRegexData(prev => {
                return { ...prev, [name]: regex.test(value) }
            })
        } else if (name === 'pw') {
            //영어 대소문자 특수문자 숫자 각 1개이상 포함하고 8자 이상 정규식
            const regex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/
            setRegexData(prev => {
                return { ...prev, [name]: regex.test(value) }
            })
            if (member.rePw === value)
                setRegexData(prev => {
                    return { ...prev, pwCheck: true }
                })
            else {
                setRegexData(prev => {
                    return { ...prev, pwCheck: false }
                })
            }
        } else if (name === 'name') {
            //한글 2-5글자 사이 정규식
            const regex = /^[가-힣]{2,5}$/
            setRegexData(prev => {
                return { ...prev, [name]: regex.test(value) }
            })
        } else if (name === 'birth') {
            //960704
            const regex = /^(?:[0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/

            setRegexData(prev => {
                return { ...prev, [name]: regex.test(value) }
            })
        } else if (name === 'detailed_address') {
            //960704

            if (value !== '')
                setRegexData(prev => {
                    return { ...prev, [name]: true }
                })
            else {
                setRegexData(prev => {
                    return { ...prev, [name]: false }
                })
            }
        } else if (name === 'rePw') {
            //960704

            if (member.pw === value)
                setRegexData(prev => {
                    return { ...prev, pwCheck: true }
                })
            else {
                setRegexData(prev => {
                    return { ...prev, pwCheck: false }
                })
            }
        } else if (name === 'gender') {
            //960704

            setRegexData(prev => {
                return { ...prev, [name]: true }
            })
        }
    }

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setMember(prev => ({
                    ...prev,
                    zipcode: data.zonecode,
                    address: data.address,
                }))
                setRegexData(prev => {
                    return { ...prev, zipcode: true, address: true }
                })
            },
        }).open()
    }

    const handleIdCheck = async () => {
        const id = member.id
        try {
            const resp = await api.get(`/members/id/${id}`)
            if (resp.data === 0) {
                Swal.fire({
                    icon: 'success',
                    title: '회원가입',
                    text: '사용 가능한 아이디입니다.',
                })
                setRegexData(prev => {
                    return { ...prev, idAvailable: true }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '회원가입',
                    text: '사용 불가능한 아이디입니다.',
                })
                setRegexData(prev => {
                    return { ...prev, idAvailable: false }
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '회원가입',
                text: '아이디 중복 검사 중 오류가 발생했습니다.',
            })
            setRegexData(prev => {
                return { ...prev, idAvailable: false }
            })
        }
    }

    const handleRequestEmailVerification = async () => {
        const email = member.email
        try {
            const resp = await api.get(`/members/email/${email}`)
            if (resp.data === 0) {
                // 이메일이 사용 가능할 때
                await api.post(`/members/requestEmailVerification/${email}`)
                Swal.fire({
                    icon: 'info',
                    title: '이메일 인증',
                    text: '인증 코드가 이메일로 전송되었습니다.',
                })
                setRegexData(prev => {
                    return { ...prev, emailAvailable: true }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '이메일 인증',
                    text: '이미 등록된 이메일입니다.',
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '이메일 인증',
                text: '이메일 인증 요청 중 오류가 발생했습니다.',
            })
        }
    }

    const handleVerificationCodeChange = e => {
        setVerificationCode(e.target.value)
    }

    const handleVerifyEmail = async () => {
        try {
            const resp = await api.post(`/members/verifyEmail`, {
                email: member.email,
                code: verificationCode,
            })
            if (resp.data === 'verified') {
                Swal.fire({
                    icon: 'success',
                    title: '이메일 인증',
                    text: '이메일 인증이 완료되었습니다.',
                })
                setRegexData(prev => {
                    return { ...prev, isEmailVerified: true }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '이메일 인증',
                    text: '유효하지 않은 인증 코드입니다.',
                })
                setRegexData(prev => {
                    return { ...prev, isEmailVerified: false }
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '이메일 인증',
                text: '이메일 인증 검증 중 오류가 발생했습니다.',
            })
            setRegexData(prev => {
                return { ...prev, isEmailVerified: false }
            })
        }
    }

    const handleAdd = async () => {
        try {
            await api.post(`/members/registerUser`, member)
            Swal.fire({
                icon: 'success',
                title: '회원가입',
                text: '회원가입이 완료되었습니다.',
            })
            navi('/login')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '회원가입',
                text: '회원가입 중 오류가 발생했습니다.',
            })
        }
    }

    const handleSubmit = async e => {
        e.preventDefault() // 기본 폼 제출 동작을 막음

        // if (!idAvailable) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: '회원가입',
        //         text: '아이디 중복 체크를 해주세요.',
        //     })
        //     return
        // }

        // if (!isEmailVerified) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: '회원가입',
        //         text: '이메일 인증을 해주세요.',
        //     })
        //     return
        // }

        // if (!isEmailVerified) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: '회원가입',
        //         text: '이메일 인증을 완료해 주세요.',
        //     })
        //     return
        // }

        // if (member.pw !== member.rePw) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: '회원가입',
        //         text: '비밀번호가 일치하지 않습니다.',
        //     })
        //     return
        // }

        await handleAdd()
    }

    return (
        <div className={styles.container}>
            <div className={styles.signConts}>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        아이디 <span>*</span>
                        <button
                            type="button"
                            onClick={handleIdCheck}
                            className={
                                regexData.id
                                    ? styles.checkPassBtn
                                    : styles.checkBtn
                            }
                        >
                            아이디 중복 검사
                        </button>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="대문자 또는 소문자 숫자 5~12자 이내"
                            name="id"
                            onChange={handleAddChange}
                            value={member.id}
                        />
                        {member.id === '' ? (
                            <span></span>
                        ) : regexData.id ? (
                            <span style={{ color: '#3737ff' }}>
                                아이디 형식이 맞습니다.
                            </span>
                        ) : (
                            <span>{`형식에 맞게 입력해주세요.`}</span>
                        )}
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        비밀번호 <span>*</span>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="password"
                            placeholder="영어 대소문자 특수문자 숫자 각 1개이상 포함하고
                                8자 이상"
                            name="pw"
                            onChange={handleAddChange}
                            value={member.pw}
                        />
                        {member.pw === '' ? (
                            <span></span>
                        ) : regexData.pw ? (
                            <span style={{ color: '#3737ff' }}>
                                비밀번호 형식이 맞습니다.
                            </span>
                        ) : (
                            <span>{`형식에 맞게 입력해주세요.`}</span>
                        )}
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        비밀번호 확인 <span>*</span>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="password"
                            placeholder="비밀번호를 다시 입력하세요"
                            name="rePw"
                            onChange={handleAddChange}
                            value={member.rePw}
                        />
                        {member.rePw === '' ? (
                            <span></span>
                        ) : regexData.pwCheck ? (
                            <span style={{ color: '#3737ff' }}>
                                비밀번호 일치합니다.
                            </span>
                        ) : (
                            <span>{`비밀번호가 일치하지 않습니다.`}</span>
                        )}
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        이름 <span>*</span>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="한글 2-5글자 사이"
                            name="name"
                            onChange={handleAddChange}
                            value={member.name}
                        />
                        {member.name === '' ? (
                            <span></span>
                        ) : regexData.name ? (
                            <span style={{ color: '#3737ff' }}>
                                이름 형식이 맞습니다.
                            </span>
                        ) : (
                            <span>{`이름 형식이 맞지 않습니다.`}</span>
                        )}
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        이메일 <span>*</span>
                        <button
                            type="button"
                            onClick={handleRequestEmailVerification}
                            className={
                                regexData.email
                                    ? styles.checkPassBtn
                                    : styles.checkBtn
                            }
                        >
                            이메일 인증 요청
                        </button>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="email"
                            placeholder="ex) example@example.com"
                            name="email"
                            onChange={handleAddChange}
                            value={member.email}
                        />
                        {member.email === '' ? (
                            <span></span>
                        ) : regexData.email ? (
                            <span style={{ color: '#3737ff' }}>
                                이메일 형식이 맞습니다.
                            </span>
                        ) : (
                            <span>{`이메일 형식이 맞지 않습니다.`}</span>
                        )}

                        {regexData.isEmailVerified ? (
                            <div className={styles.success}>
                                {/* 이메일 인증 완료 */}
                            </div>
                        ) : !regexData.emailAvailable ? (
                            ''
                        ) : (
                            <div className={styles.inputCode}>
                                <div className={styles.subTitle}>
                                    인증 코드 입력
                                </div>
                                <input
                                    type="text"
                                    onChange={handleVerificationCodeChange}
                                />
                                <button
                                    type="button"
                                    onClick={handleVerifyEmail}
                                    className={styles.codeConfirm}
                                >
                                    인증 코드 확인
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        생년월일 <span>*</span>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="ex) 980709"
                            name="birth"
                            onChange={handleAddChange}
                            value={member.birth}
                        />
                        {member.birth === '' ? (
                            <span></span>
                        ) : regexData.birth ? (
                            <span style={{ color: '#3737ff' }}>
                                생년월일 형식이 맞습니다.
                            </span>
                        ) : (
                            <span>{`생년월일 형식이 맞지 않습니다.`}</span>
                        )}
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        성별 <span>*</span>
                    </div>
                    <div className={styles.genderBox}>
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="M"
                            onChange={handleAddChange}
                        />
                        <label htmlFor="male">남성</label>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="F"
                            onChange={handleAddChange}
                        />
                        <label htmlFor="female">여성</label>
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        전화번호 <span>*</span>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="ex) 010-1111-1111"
                            name="phone"
                            onChange={handleAddChange}
                            value={member.phone}
                        />
                        {member.phone === '' ? (
                            <span></span>
                        ) : regexData.phone ? (
                            <span style={{ color: '#3737ff' }}>
                                전화번호 형식이 맞습니다.
                            </span>
                        ) : (
                            <span>{`전화번호 형식이 맞지 않습니다.`}</span>
                        )}
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        우편번호 <span>*</span>
                    </div>
                    <div className={styles.inputZipCode}>
                        <input
                            type="text"
                            value={member.zipcode}
                            disabled={true}
                            placeholder="우편번호 찾기를 해주세요."
                        />
                        <div>
                            <button
                                className={styles.addressBtn}
                                onClick={handleAddressSearch}
                            >
                                우편 번호 찾기
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        기본 주소 <span>*</span>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            value={member.address}
                            disabled={true}
                            placeholder=""
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        상세 주소 <span>*</span>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            name="detailed_address"
                            value={member.detailed_address}
                            onChange={handleAddChange}
                            placeholder="상세 주소를 입력해주세요."
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>추천인(아이디)</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            onChange={handleAddChange}
                            placeholder="추천인 아이디를 적어주세요"
                        />
                    </div>
                </div>
            </div>
            <div className={checkAll ? styles.btnPass : styles.btn}>
                <button onClick={handleSubmit}>회원가입</button>
            </div>
        </div>
    )
}

export default Member
