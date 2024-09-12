import styles from './Member.module.css'
import img1 from '../../../images/logo192.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../config/config'
import Company from '../Company/Company'
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

    const [idAvailable, setIdAvailable] = useState(false) // 아이디 상태
    const [emailAvailable, setEmailAvailable] = useState(false) // 이메일 상태
    const [checkIdStatus, setCheckIdStatus] = useState('')

    const handleAddChange = e => {
        const { name, value } = e.target
        setMember(prev => ({ ...prev, [name]: value }))
    }
    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                console.log(data)
                setMember(prev => ({
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
    const handleAdd = async () => {
        try {
            await api.post(`/members`, member)
            Swal.fire({
                icon: 'success',
                title: '회원가입',
                text: '회원가입 성공',
            })
            navi('/login')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '회원가입',
                text: '회원가입 실패',
            })
        }
    }
    const handleSubmit = async e => {
        e.preventDefault() // 기본 폼 제출 동작을 막음

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
        // 아이디, 이메일 사용 가능할 때만 회원가입 처리
        await handleAdd()
    }

    useEffect(() => {
        console.log(member)
    }, [member]) // 새로고침될때 + member 값이 변할 때 마다 실행

    const navi = useNavigate()

    return (
        <div className={styles.container}>
            <div className={styles.signConts}>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        아이디
                        <button
                            onClick={handleIdCheck}
                            className={styles.checkBtn}
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
                            value={member.pw}
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
                            value={member.rePw}
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>이름</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="name"
                            onChange={handleAddChange}
                            value={member.name}
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        이메일
                        <button
                            onClick={handleEmailCheck}
                            className={styles.checkBtn}
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
                            value={member.email}
                        />
                    </div>

                    {/* <div>
                        <button className={styles.emailBtn}>이메일 인증</button>
                    </div> */}
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>생년월일</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            name="birth"
                            value={member.birth}
                            onChange={handleAddChange}
                            placeholder="아이디는 어쩌고 저쩌고"
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
                            checked={member.gender === 'M'}
                            onChange={handleAddChange}
                        />
                        <label htmlFor="male">남자</label>
                        <input
                            type="radio"
                            name="gender"
                            value="F"
                            id="female"
                            checked={member.gender === 'F'}
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
                            value={member.phone}
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>우편번호</div>
                    <div className={styles.inputZipCode}>
                        <input
                            type="text"
                            value={member.zipcode}
                            disabled={true}
                            placeholder="아이디는 어쩌고 저쩌고"
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
                            value={member.address}
                            disabled={true}
                            placeholder="아이디는 어쩌고 저쩌고"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>상세 주소</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            name="detailed_address"
                            value={member.detailed_address}
                            onChange={handleAddChange}
                            placeholder="아이디는 어쩌고 저쩌고"
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
export default Member
