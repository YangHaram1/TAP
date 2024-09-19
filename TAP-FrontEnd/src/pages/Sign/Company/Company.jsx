import styles from './Company.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../config/config'
import Swal from 'sweetalert2'
const Company = () => {
    const [file, setFile] = useState(null) //파일 관리 스테이트
    const [img, setImg] = useState('') //프리뷰 이미지 관리 스테이트
    const navi = useNavigate()
    const [company, setCompany] = useState({
        member_id: '',
        name: '',
        phone: '',
        registration_number: '',
        zipcode: '',
        address: '',
        detailed_address: '',
    })
    const [member, setMember] = useState({
        id: '',
        pw: '',
        rePw: '',
        name: '',
        email: '',
        birth: '',
        gender: '',
        phone: '',
    })

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
    })
    // 정규식, 중복 검사 state
    const [regexDataCompany, setRegexDataCompany] = useState({
        // > Company
        name: false, // 사업체 이름
        phone: false, // 사업체 전화번화
        registration_number: false, // 사업체 등록 번호
        registration_certificate: false, // 사업체 등록증
        address: false,
        detailed_address: false,
        zipcode: false,
    })

    const [checkAll, setcheckAll] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')
    useEffect(() => {
        const allTrue = Object.values(regexData).every(value => value === true)
        const allTrueCompany = Object.values(regexDataCompany).every(
            value => value === true
        )
        setcheckAll(allTrue && allTrueCompany)
        console.log(regexData)
        console.log(regexDataCompany)
    }, [regexData, regexDataCompany])

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

    const handleCompanyAddChange = e => {
        const { name, value } = e.target
        setCompany(prev => ({ ...prev, [name]: value }))

        if (name === 'name') {
            // 한글 2-12글자 사이 정규식
            const regex = /^[가-힣]{2,12}$/
            setRegexDataCompany(prev => {
                return { ...prev, [name]: regex.test(value) }
            })
        } else if (name === 'phone') {
            // 02-577-1987 형식
            const regex = /^\d{2,3}-\d{3,4}-\d{4}$/
            setRegexDataCompany(prev => {
                return { ...prev, [name]: regex.test(value) }
            })
        } else if (name === 'registration_number') {
            // 사업자 번호 형식 정규식 추가 가능
            const regex = /\d{3}-\d{2}-\d{5}/ // 예시 정규식
            setRegexDataCompany(prev => {
                return { ...prev, [name]: regex.test(value) }
            })
        } else if (name === 'registration_certificate') {
            // 등록 인증서 유효성 검사 추가 기능
            // setRegexData(prev => {
            //     return { ...prev, [name]: regex.test(value) }
            // })
        } else if (name === 'detailed_address') {
            if (value !== '')
                setRegexDataCompany(prev => {
                    return { ...prev, [name]: true }
                })
            else {
                setRegexDataCompany(prev => {
                    return { ...prev, [name]: false }
                })
            }
        }
    }

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                console.log(data)
                setCompany(prev => ({
                    ...prev,
                    zipcode: data.zonecode,
                    address: data.address,
                }))
                setRegexDataCompany(prev => {
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

    // 회원가입 처리

    // const handleSubmit = e => {
    //     //그래서 한번에 다보내서 한 컨트롤러에서 처리해야함
    //     const formData = new FormData() //multipart
    //     if (file) {
    //         formData.append('file', file)
    //         const jsonMember = JSON.stringify(member) // 객체를 json 형식의 문자열로 바꿔주는 직렬화
    //         const jsonCompany = JSON.stringify(company) //객체를 json 형식의 문자열로 바꿔주는 직렬화
    //         formData.append('member', jsonMember)
    //         formData.append('company', jsonCompany)

    //         api.post(`/company`, formData).then(() => {
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: '회원가입',
    //                 text: '회원가입 성공',
    //             })
    //             navi('/login')
    //         })
    //     } else {
    //         Swal.fire({
    //             icon: 'error',
    //             title: '회원가입',
    //             text: '이미지 파일을 선택해주세요',
    //         })
    //     }
    // }

    const handleAdd = async () => {
        const formData = new FormData()
        if (file) {
            formData.append('file', file)
            const jsonMember = JSON.stringify(member)
            const jsonCompany = JSON.stringify(company)
            formData.append('member', jsonMember)
            formData.append('company', jsonCompany)

            try {
                const response = await api.post(`/company`, formData)
                Swal.fire({
                    icon: 'success',
                    title: '회원가입',
                    text: '회원가입이 완료되었습니다.',
                })
                navi('/login')
            } catch (error) {
                console.error('Error during registration:', error)
                Swal.fire({
                    icon: 'error',
                    title: '회원가입',
                    text: '회원가입 중 오류가 발생했습니다.',
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: '회원가입',
                text: '이미지 파일을 선택해주세요',
            })
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()

        // if (!idAvailable) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: '회원가입',
        //         text: '아이디 중복 체크를 해주세요',
        //     })
        //     return
        // }

        // if (!emailAvailable) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: '회원가입',
        //         text: '이메일 중복 체크를 해주세요',
        //     })
        //     return
        // }

        await handleAdd()
    }

    useEffect(() => {
        console.log(member)
        console.log(company)
    }, [member, company]) // 새로고침될때 + member 값이 변할 때 마다 실행

    // const handleAddChange = e => {
    //     const {name, value} = e.target
    // }

    const handleFileChange = e => {
        const file = e.target.files[0] //파일가저오기
        if (file) {
            //파일이 있다면
            if (file.type.startsWith('image/')) {
                //파일타입이 이미지인지 아닌지
                // 이미지 파일인지 확인
                setFile(file) //파일을 저장하는 setState
                const imageUrl = URL.createObjectURL(file) //들어온 파일은 imgurl로 바꾸는 윈도우 기본함수
                setImg(imageUrl) //이미지 보여주기위한 src
                setRegexDataCompany(prev => {
                    return { ...prev, registration_certificate: true }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '회원가입',
                    text: '이미지 파일만 업로드 가능합니다.',
                })
                e.target.value = null // 파일 입력 필드 초기화
                setRegexDataCompany(prev => {
                    return { ...prev, registration_certificate: false }
                })
            }
        } else {
            setImg('')
            setFile(null)
            setRegexDataCompany(prev => {
                return { ...prev, registration_certificate: false }
            })
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.signConts}>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        아이디 <span>*</span>
                        <button
                            className={
                                regexData.id
                                    ? styles.checkPassBtn
                                    : styles.checkBtn
                            }
                            onClick={handleIdCheck}
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
                        사업자 이름(대표자 이름) <span>*</span>
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
                            name="birth"
                            placeholder="ex) 980709"
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
                            name="gender"
                            value="M"
                            id="male"
                            onChange={handleAddChange}
                        />
                        <label htmlFor="male">남자</label>
                        <input
                            type="radio"
                            name="gender"
                            value="F"
                            id="female"
                            onChange={handleAddChange}
                        />
                        <label htmlFor="female">여자</label>
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
                        사업체 이름 <span>*</span>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="한글 2-12글자 사이"
                            name="name"
                            onChange={handleCompanyAddChange}
                            value={company.name}
                        />
                        {company.name === '' ? (
                            <span></span>
                        ) : regexDataCompany.name ? (
                            <span style={{ color: '#3737ff' }}>
                                사업체 이름 형식이 맞습니다.
                            </span>
                        ) : (
                            <span>{`사업체 이름 형식이 맞지 않습니다.`}</span>
                        )}
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        사업체 전화번호 <span>*</span>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="ex) 02-577-1987"
                            name="phone"
                            onChange={handleCompanyAddChange}
                        />
                        {company.phone === '' ? (
                            <span></span>
                        ) : regexDataCompany.phone ? (
                            <span style={{ color: '#3737ff' }}>
                                사업체 전화번호 형식이 맞습니다.
                            </span>
                        ) : (
                            <span>{`사업체 전화번호 형식이 맞지 않습니다.`}</span>
                        )}
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        사업체 등록번호 <span>*</span>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="ex) 214-86-62064"
                            name="registration_number"
                            onChange={handleCompanyAddChange}
                        />
                        {company.registration_number === '' ? (
                            <span></span>
                        ) : regexDataCompany.registration_number ? (
                            <span style={{ color: '#3737ff' }}>
                                사업체 등록번호 형식이 맞습니다.
                            </span>
                        ) : (
                            <span>{`사업체 번호 형식이 맞지 않습니다.`}</span>
                        )}
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        사업체 등록증 <span>*</span>
                    </div>
                    <div className={styles.inputTxt}>
                        🔗
                        <input
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                        />
                        {img && (
                            <img src={img} alt="" className={styles.img}></img>
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
                            disabled={true}
                            placeholder="우편번호 찾기를 해주세요."
                            value={company.zipcode}
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
                            disabled={true}
                            placeholder=""
                            value={company.address}
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
                            value={company.detailed_address}
                            placeholder="상세 주소를 입력해주세요."
                            onChange={handleCompanyAddChange}
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
export default Company
