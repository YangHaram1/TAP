import styles from './Member.module.css';
import { useAuthStore } from './../../../../../store/store';
import { useEffect, useState, useRef } from 'react';
import { api } from '../../../../../config/config'
import Mybutton from '../../MyButton/Mybutton';



const Member = () => {
    const { loginID } = useAuthStore();
    const [user, setUser] = useState({ email: '', phone: '' });
    const [genderCheck, setGenderCheck] = useState(false);
    const [updateCheck, setUpdateCheck] = useState({ email: true, phone: true });
    const [data, setData] = useState({ email: '', phone: '' });
    const emailRef = useRef();
    const phoneRef = useRef();
    useEffect(() => {
        const id = loginID;
        api.get(`/members/${id}`).then((resp) => {
            setUser(resp.data)
            if (user.gender === 'F') {
                setGenderCheck(true);
            } else {
                setGenderCheck(false);
            }
            setData({ email: resp.data.email, phone: resp.data.phone });
        });
    }, [])



    const handleConfirm = () => {

    }
    const handleUpdateCheck = (ref) => {
        const name = ref.current.name;
        setUpdateCheck((prev) => {
            return { ...prev, [name]: false }
        })
       
    }
    const handleUpdateCancel=(ref)=>{
        const name = ref.current.name;
        setUpdateCheck((prev) => {
            return { ...prev, [name]: true }
        })
        let value;
        if(name==='email'){
            value=user.email;
        }
        else{
            value=user.phone;
        }
        setData((prev)=>{
            return{...prev,[name]:value}
        })
    }

    const handelData = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return { ...prev, [name]: value };
        })
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
                </div>
                <div className={styles.contents}>
                    <div>
                        {user.id}
                    </div>
                    <div>
                        {user.name}
                    </div>
                    <div className={styles.update}>
                        <input type="text" value={data.phone} disabled={updateCheck.phone} onChange={handelData} ref={phoneRef} name='phone' />
                        {updateCheck.phone && (<button onClick={() => handleUpdateCheck(phoneRef)}>수정</button>)}
                        {!updateCheck.phone && (<button onClick={() => handleUpdateCancel(phoneRef)}>취소</button>)}
                    </div>
                    <div className={styles.update}>
                        <input type="text" value={data.email} disabled={updateCheck.email} onChange={handelData} ref={emailRef} name='email' />
                        {updateCheck.email && (<button onClick={() => handleUpdateCheck(emailRef)}>수정</button>)}
                        {!updateCheck.email && (<button onClick={() => handleUpdateCancel(emailRef)}>취소</button>)}
                    </div>
                    <div>
                        {user.birth}
                    </div>
                    <div className={styles.gender}>
                        <input type="checkbox" checked={genderCheck} className={styles.checkBox} disabled />남자
                        <input type="checkbox" checked={!genderCheck} className={styles.checkBox} disabled />여자
                    </div>
                    <div>
                        일단 이부분 고민중
                    </div>
                </div>

            </div>
            <Mybutton handleConfirm={handleConfirm} />
        </div>
    )
}
export default Member;