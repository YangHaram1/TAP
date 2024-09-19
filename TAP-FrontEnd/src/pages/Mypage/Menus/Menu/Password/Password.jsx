import styles from './Password.module.css';
import { api } from '../../../../../config/config';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../../../store/store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import Mybutton from '../../MyButton/Mybutton';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Password = () => {
    const [pw, setPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const { loginID } = useAuthStore();
    const navi = useNavigate();
    const [regexData, setRegexData] = useState({
        pw: false,
        pwCheck: false
    })
    const [checkAll, setCheckAll] = useState();
    useEffect(() => {
        const allTrue = Object.values(regexData).every(value => value === true);
        setCheckAll(allTrue)
        //  console.log(regexData)
    }, [regexData])


    const handlePw = (e) => {
        const value = e.target.value;
        setPw(value);
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        setRegexData((prev) => {
            return { ...prev, pw: regex.test(value) }
        })
        if (value === newPw) {
            setRegexData((prev) => {
                return { ...prev, pwCheck: true }
            })
        }
        else{
            setRegexData((prev) => {
                return { ...prev, pwCheck: false }
            })
        }
    }
    const handleNewPw = (e) => {
        const value = e.target.value;
        setNewPw(value);
        if (pw === value) {
            setRegexData((prev) => {
                return { ...prev, pwCheck: true }
            })
        }
        else{
            setRegexData((prev) => {
                return { ...prev, pwCheck: false }
            })
        }
    }

    const handleConfirm = () => {
        api.put(`/members/${pw}`).then((resp) => {
            Swal.fire({
                title: '비밀번호',
                text: '비밀번호가 변경되었습니다.'
            })
            navi('/mypage')
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                비밀번호 변경
            </div>
            <div className={styles.contents}>
                <div className={styles.contentTitle}>
                    <div className={styles.icon}>
                        <FontAwesomeIcon icon={faLockOpen} />
                    </div>
                    <div>
                        주기적인
                        <span>비밀번호 변경</span>을 통해

                    </div>
                    <div>
                        개인정보를 안전하게 보호하세요.
                    </div>
                    <div className={styles.contentDetail}>
                        비밀번호가 타인에게 노출되지 않도록 항상 주의해주세요.
                    </div>
                </div>
            </div>
            <div className={styles.inputDiv}>
                <div className={styles.id}>
                    <div>
                        아이디
                    </div>
                    <div>
                        {loginID}
                    </div>
                </div>
                <div className={styles.pw}>
                    <div>
                        비밀번호
                    </div>
                    <div>
                        <div>
                            <input type="password" placeholder='새 비밀번호' name='pw' value={pw} onChange={handlePw} />
                        </div>
                        <div>
                            {pw === '' ? '' : (<button className={styles.pwCancel} onClick={() => { setPw('') }}>X</button>)}
                        </div>
                    </div>
                </div>
                {!pw && (<div className={styles.pwDetail}>영문(대,소문자), 숫자, 특수문자 각 1이상 포함 8자 이상</div>)}
                {pw && (regexData.pw? (<div className={styles.pwDetailOk}>형식이 맞습니다.</div>) : (<div className={styles.pwDetail}>형식에 맞게 입력해주세요.</div>))}
                <div className={styles.pw}>
                    <div>
                        비밀번호
                    </div>
                    <div>
                        <div>
                            <input type="password" placeholder='새 비밀번호 입력' name='newPw' value={newPw} onChange={handleNewPw} />
                        </div>
                        <div>
                            {newPw === '' ? '' : (<button className={styles.pwCancel} onClick={() => { setNewPw('') }}>X</button>)}
                        </div>
                    </div>
                </div>
                {!newPw && (<div className={styles.pwDetail}>비밀번호를 다시 입력해주세요</div>)}
                {newPw && (regexData.pwCheck? (<div className={styles.pwDetailOk}>비밀번호가 일치합니다.</div>) : (<div className={styles.pwDetail}>비밀번호가 일치하지 않습니다.</div>))}
            </div>
            <div className={styles.pwWarning}>
                비밀번호는 8자 이상으로 영문(대,소문자), 숫자, 특수문자 각 1이상 포함해서 만드시면 됩니다.
            </div>
            <Mybutton handleConfirm={handleConfirm} setcheck={null} checkAll={checkAll} />
        </div>
    )
}
export default Password;