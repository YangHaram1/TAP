import styles from './Member.module.css';
import { useAuthStore } from './../../../../../store/store';
import { useEffect, useState, useRef } from 'react';
import { api } from '../../../../../config/config'
import Mybutton from '../../MyButton/Mybutton';
import Swal from 'sweetalert2';



const Member = () => {
    const { loginID } = useAuthStore();
    const [user, setUser] = useState({ email: '', phone: '' });
    const [address, setAddress] = useState({});
    const [genderCheck, setGenderCheck] = useState(false);
    const [updateCheck, setUpdateCheck] = useState({ email: true, phone: true });
    const [data, setData] = useState({ id: '', email: '', phone: '', address: '', detailed_address: '', zipcode: '' });
    const emailRef = useRef();
    const phoneRef = useRef();
    const [regexData, setRegexData] = useState({
        email: true,
        phone: true
    })
    const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 상태
    useEffect(() => {
        api.get(`/members`).then((resp) => {
            setUser(resp.data)
            if (user.gender === 'F') {
                setGenderCheck(true);
            } else {
                setGenderCheck(false);
            }
            setData({ id: resp.data.id, email: resp.data.email, phone: resp.data.phone });
        });
        api.get(`/delivery/default`).then((resp) => {
            setAddress(resp.data)
        })
    }, [])

    const handleDefault = () => {
        setUpdateCheck({ email: true, phone: true });
    }

    const handleConfirm = () => {
        api.put(`/members`, data).then((resp) => {
            Swal.fire({
                title: '회원정보수정',
                text: '수정이 완료됐습니다.'
            })
            // setUser((prev)=>{
            //     return {...prev,data}
            // })
            handleDefault();
        })
    }
    const handleUpdateCheck = (ref) => {
        const name = ref.current.name;
        setUpdateCheck((prev) => {
            return { ...prev, [name]: false }
        })

    }
    const handleUpdateCancel = (ref) => {
        const name = ref.current.name;
        setUpdateCheck((prev) => {
            return { ...prev, [name]: true }
        })
        let value;
        if (name === 'email') {
            value = user.email;
        }
        else {
            value = user.phone;
        }
        setData((prev) => {
            return { ...prev, [name]: value }
        })
        setRegexData({ email: true,
            phone: true});
    }

    const handelData = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return { ...prev, [name]: value };
        })

        if (name === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;
            setRegexData((prev) => {
                return { ...prev, [name]: emailRegex.test(value) }
            })

        }
        else if (name === 'phone') {
            const phoneRegex = /^010-\d{4}-\d{4}$/;
            setRegexData((prev) => {
                return { ...prev, [name]: phoneRegex.test(value) }
            })
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                회원정보수정
            </div>
            <div className={styles.detail}>
                기본정보
            </div>
            <div className={styles.body}>
                <div className={styles.menu}>
                    <div>
                        아이디
                    </div>
                    <div>
                        이름
                    </div>
                    <div>
                        휴대폰번호
                    </div>
                    <div>
                        이메일
                    </div>
                    <div>
                        생년월일
                    </div>
                    <div>
                        성별
                    </div>
                    <div>
                        기본주소
                    </div>
                    <div>
                        상세주소
                    </div>
                    <div>
                        우편코드
                    </div>
                </div>
                <div className={styles.contents}>
                    <div>
                        {user.id}
                    </div>
                    <div>
                        {user.name}
                    </div>
                    <div className={styles.update}>
                        <div style={{ display: 'flex', flexDirection: "column" }}>
                            <div>
                                <input type="text" value={data.phone} disabled={updateCheck.phone} onChange={handelData} ref={phoneRef} name='phone' />
                            </div>
                            <div className={styles.span}>
                                {data.phone === '' ? <span>형식에 맞게 입력해주세요.</span> : (regexData.phone ? (<span style={{ color: 'blue' }}>번호 형식이 맞습니다.</span>) : (<span>{`ex) 010-1111-1111`}</span>))}
                            </div>
                        </div>
                        <div className={styles.updateBtn}>
                            {updateCheck.phone && (<button onClick={() => handleUpdateCheck(phoneRef)} className={styles.btnUpdate}>수정</button>)}
                            {!updateCheck.phone && (<button onClick={() => handleUpdateCancel(phoneRef)} className={styles.btnCancel}>취소</button>)}
                        </div>
                    </div>
                    <div className={styles.update}>
                        <div style={{ display: 'flex', flexDirection: "column" }}>
                            <div>
                                <input type="text" value={data.email} disabled={updateCheck.email} onChange={handelData} ref={emailRef} name='email' />
                            </div>
                            <div className={styles.span}>
                                {data.email === '' ? <span>형식에 맞게 입력해주세요.</span> : (regexData.email ? (<span style={{ color: 'blue' }}>이메일 형식이 맞습니다.</span>) : (<span>이메일 형식을 맞춰주세요</span>))}
                            </div>
                        </div>
                        <div className={styles.updateBtn}>
                            {updateCheck.email && (<button onClick={() => handleUpdateCheck(emailRef)} className={styles.btnUpdate}>수정</button>)}
                            {!updateCheck.email && (<button onClick={() => handleUpdateCancel(emailRef)} className={styles.btnCancel}>취소</button>)}
                        </div>

                    </div>
                    <div>
                        {user.birth}
                    </div>
                    <div className={styles.gender}>
                        <input type="checkbox" checked={!genderCheck} className={styles.checkBox} disabled />남자
                        <input type="checkbox" checked={genderCheck} className={styles.checkBox} disabled />여자
                    </div>
                    <div>
                        {address.address}
                    </div>
                    <div>
                        {address.detailed_address}
                    </div>
                    <div>
                        {address.zipcode}
                    </div>
                </div>

            </div>
            <Mybutton handleConfirm={handleConfirm} setcheck={null} />
        </div>
    )
}
export default Member;