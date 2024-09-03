import styles from './Password.module.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
const Password = ({ setCheckPw }) => {
    const [pw,setPw]= useState('');
    
    const handleCancel = () => {

    }
    const handleConfirm = () => {

    }
    const handlePw=(e)=>{
        setPw(e.target.value);
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
                        아이디값 불러와서 출력
                    </div>
                </div>
                <div className={styles.pw}>
                    <div>
                        비밀번호
                    </div>
                    <div>
                        <input type="password" placeholder='비밀번호 입력' name='pw' value={pw} onChange={handlePw}/>
                    </div>
                  {pw===''?'':(<button className={styles.pwCancel} onClick={()=>{setPw('')}}>X</button>)}
                </div>
               {pw!==''?'':(<div className={styles.pwDetail}>비밀번호를 입력해주세요</div>)}
            </div>
            <div className={styles.buttonDiv}>
                <div className={styles.cancel}>
                    <button onClick={handleCancel}>취소</button>
                </div>
                <div className={styles.confirm}>
                    <button onClick={handleConfirm}>확인</button>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Password;