import styles from './Member.module.css';
import { useAuthStore } from './../../../../../store/store';
import { useEffect, useState } from 'react';
import { api } from '../../../../../config/config'
import Mybutton from '../../MyButton/Mybutton';


const Member = () => {
    const { loginID } = useAuthStore();
    const [user, setUser] = useState([]);
    const [genderCheck, setGenderCheck] = useState(false);


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


    const handleCancel = () => {

    }

    const handleConfirm = () => {

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
                    <div>
                        {user.phone}
                    </div>
                    <div>
                        {user.email}
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
            <Mybutton handleCancel={handleCancel} handleConfirm={handleConfirm} />
        </div>
    )
}
export default Member;