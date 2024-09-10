import styles from './Member.module.css'
import img1 from '../../../images/logo192.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../config/config'
const Member = () => {
    const [members, setMembers] = useState([])
    const [member, setMember] = useState({
        id: '',
        pw: '',
        rePw: '',
        name: '',
        email: '',
        birth: '',
        gender: '',
        phone: '',
        zip_code: '',
        address: '',
        detailed_address: '',
    })

    const [idAvailable, setIdAvailable] = useState(null)
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
                    zip_code: data.zonecode,
                    address: data.address,
                }))
            },
        }).open()
    }
    const handleAdd = () => {
        api.post(`/members`, member).then(resp => {
            alert('회원가입 성공~~~~~~~')
        })
    }

    const handleIdCheck = () => {
        const id = member.id
        api.get(`/members/${id}`).then(resp => {
            alert('아이디 중복 검사')
        })
    }

    useEffect(() => {
        console.log(member)
    }, [member]) // 새로고침될때 + member 값이 변할 때 마다 실행

    const navi = useNavigate()

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <img src={img1} alt="" className={styles.logo} />
            </div>
            <div className={styles.signConts}>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>아이디</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="id"
                            onChange={handleAddChange}
                            value={member.id}
                        />
                    </div>
                    <button onClick={handleIdCheck}>아이디 중복 검사</button>
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
                    <div className={styles.subTitle}>이메일</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="email"
                            onChange={handleAddChange}
                            value={member.email}
                        />
                    </div>
                    <div>
                        <button className={styles.emailBtn}>이메일 인증</button>
                    </div>
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
                            checked={member.gender === 'M'}
                            onChange={handleAddChange}
                        />
                        남자
                        <input
                            type="radio"
                            name="gender"
                            value="F"
                            checked={member.gender === 'F'}
                            onChange={handleAddChange}
                        />
                        여자
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
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            value={member.zip_code}
                            disabled={true}
                            placeholder="아이디는 어쩌고 저쩌고"
                        />
                    </div>
                    <button
                        className={styles.addressBtn}
                        onClick={handleAddressSearch}
                    >
                        우편 번호 찾기
                    </button>
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
            <div className={styles.agree}>
                <div>
                    <input type="checkbox" />
                    약관 동의
                </div>
                <div>약관 동의 내용</div>
            </div>
            <div className={styles.btn}>
                <button onClick={handleAdd}>회원가입</button>
            </div>
        </div>
    )
}
export default Member
