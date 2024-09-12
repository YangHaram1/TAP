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
    const [idAvailable, setIdAvailable] = useState(false) // 아이디 상태
    const [emailAvailable, setEmailAvailable] = useState(false) // 이메일 상태

    const handleAddChange = e => {
        const { name, value } = e.target
        setMember(prev => ({ ...prev, [name]: value }))
    }
    const handleCompanyAddChange = e => {
        const { name, value } = e.target
        setCompany(prev => ({ ...prev, [name]: value }))
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
            },
        }).open()
    }
    // 아이디 중복 체크
    const handleIdCheck = async () => {
        const id = member.id
        try {
            const resp = await api.get(`/members/id/${id}`)
            console.log(resp.data)
            if (resp.data === 0) {
                Swal.fire({
                    icon: 'success',
                    title: '회원가입',
                    text: '사용 가능한 아이디',
                })
                setIdAvailable(true)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '회원가입',
                    text: '사용 불가능한 이메일',
                })
                setIdAvailable(false)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '회원가입',
                text: '아이디 중복 검사 중 오류가 발생했습니다.',
            })
            setIdAvailable(false)
        }
    }

    // 이메일 중복 체크
    const handleEmailCheck = async () => {
        const email = member.email
        try {
            const resp = await api.get(`/members/email/${email}`)
            if (resp.data === 0) {
                Swal.fire({
                    icon: 'success',
                    title: '회원가입',
                    text: '사용 가능한 이메일',
                })
                setEmailAvailable(true)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '회원가입',
                    text: '사용 불가능한 이메일',
                })
                setEmailAvailable(false)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '회원가입',
                text: '이메일 중복 검사 중 오류가 발생했습니다.',
            })
            setEmailAvailable(false)
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
                    text: '회원가입 성공',
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

        if (!idAvailable) {
            Swal.fire({
                icon: 'error',
                title: '회원가입',
                text: '아이디 중복 체크를 해주세요',
            })
            return
        }

        if (!emailAvailable) {
            Swal.fire({
                icon: 'error',
                title: '회원가입',
                text: '이메일 중복 체크를 해주세요',
            })
            return
        }

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
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '회원가입',
                    text: '이미지 파일만 업로드 가능합니다.',
                })
                e.target.value = null // 파일 입력 필드 초기화
            }
        } else {
            setImg('')
            setFile(null)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.signConts}>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        아이디
                        <button
                            className={styles.checkBtn}
                            onClick={handleIdCheck}
                        >
                            아이디 중복 검사
                        </button>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="id"
                            onChange={handleAddChange}
                            value={member.id}
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>비밀번호</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="pw"
                            onChange={handleAddChange}
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>비밀번호 확인</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="rePw"
                            onChange={handleAddChange}
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        사업자 이름(대표자 이름)
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="name"
                            onChange={handleAddChange}
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        이메일
                        <button
                            className={styles.checkBtn}
                            onClick={handleEmailCheck}
                        >
                            이메일 인증
                        </button>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="email"
                            onChange={handleAddChange}
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>생년월일</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            name="birth"
                            placeholder="아이디는 어쩌고 저쩌고"
                            onChange={handleAddChange}
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>성별</div>
                    <div className={styles.checkBox}>
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
                    <div className={styles.subTitle}>휴대폰</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="phone"
                            onChange={handleAddChange}
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>사업체 이름</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="name"
                            onChange={handleCompanyAddChange}
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>사업체 전화번호</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="phone"
                            onChange={handleCompanyAddChange}
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>사업체 등록번호</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="registration_number"
                            onChange={handleCompanyAddChange}
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>사업체 등록증</div>
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
                    <div className={styles.subTitle}>우편번호</div>
                    <div className={styles.inputZipCode}>
                        <input
                            type="text"
                            disabled={true}
                            placeholder="아이디는 어쩌고 저쩌고"
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
                    <div className={styles.subTitle}>기본 주소</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            disabled={true}
                            placeholder="아이디는 어쩌고 저쩌고"
                            value={company.address}
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>상세 주소</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            name="detailed_address"
                            value={company.detailed_address}
                            placeholder="아이디는 어쩌고 저쩌고"
                            onChange={handleCompanyAddChange}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.btn}>
                <button onClick={handleSubmit}>회원가입</button>
            </div>
        </div>
    )
}
export default Company
