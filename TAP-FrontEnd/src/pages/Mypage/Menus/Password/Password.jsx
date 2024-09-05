import styles from './Password.module.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { api } from '../../../../config/config';
import { useAuthStore } from './../../../../store/store';

import Mybutton from '../MyButton/Mybutton';

const Password = ({ setCheckPw }) => {
    const [pw, setPw] = useState('');
    const { loginID } = useAuthStore();

    const handlePw = (e) => {
        setPw(e.target.value);
    }

    const handleConfirm = () => {
        api.post(`/auth/${pw}`)
            .then(resp => {
                setCheckPw(false);
            })
            .catch(resp => {
                alert('패스워드가 틀렸습니다 ')
            })

    }

    return (
        <React.Fragment>
            <div className={styles.title}>
                제목
            </div>
            <div className={styles.contents}>
                <div className={styles.content}>
                    <div className={styles.contentTitle}>
                        <div className={styles.icon}>
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        정보를 안전하게 보호하기 위해
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <p>비밀번호를 다시 한 번 확인 </p>합니다.
                        </div>
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
                        <input type="password" placeholder='비밀번호 입력' name='pw' value={pw} onChange={handlePw} />
                    </div>
                    {pw === '' ? '' : (<button className={styles.pwCancel} onClick={() => { setPw('') }}>X</button>)}
                </div>
                {pw !== '' ? '' : (<div className={styles.pwDetail}>비밀번호를 입력해주세요</div>)}
            </div>
            <Mybutton handleConfirm={handleConfirm}/>
        </React.Fragment>
    )
}
export default Password;