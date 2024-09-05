import styles from './Member.module.css';
import { useAuthStore } from './../../../../../store/store';
import { useEffect, useState ,useRef} from 'react';
import { api } from '../../../../../config/config'
import Mybutton from '../../MyButton/Mybutton';



const Member = () => {
    const { loginID } = useAuthStore();
    const [user, setUser] = useState({email:'',phone:''});
    const [genderCheck, setGenderCheck] = useState(false);
    const [updateCheck, setUpdateCheck] = useState({ email: true, phone: true });

    const emailRef=useRef();
    const phoneRef=useRef();
    useEffect(() => {
        const id = loginID;
        api.get(`/members/${id}`).then((resp) => {
            setUser(resp.data)
            if (user.gender === 'F') {
                setGenderCheck(true);
            } else {
                setGenderCheck(false);
            }
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
                        <input type="text" value={user.phone} disabled={updateCheck.phone} ref={phoneRef} name='phone'/>
                        <button  onClick={()=>handleUpdateCheck(phoneRef)}>수정</button>
                    </div>
                    <div className={styles.update}>
                        <input type="text" value={user.email} disabled={updateCheck.email}  ref={emailRef} name='email'/>
                        <button onClick={()=>handleUpdateCheck(emailRef)}> 수정</button>
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