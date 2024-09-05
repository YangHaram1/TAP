import styles from './Password.module.css';
import { api } from '../../../../../config/config';
import { useState } from 'react';
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
    const navi=useNavigate();

    const handlePw = (e) => {
        setPw(e.target.value);
    }
    const handleNewPw = (e) => {
        setNewPw(e.target.value);
    }

    const handleConfirm = () => {
        if(pw===''){
            Swal.fire({
                icon:'error',
                title:'비밀번호',
                text:'비밀번호를 입력하세요.'
            });
        } //여기에 유효성 검사까지 넣어야함
        else if(pw===newPw){
            api.put(`/members/${pw}`).then((resp)=>{
                Swal.fire({
                    title:'비밀번호',
                    text:'비밀번호가 변경되었습니다.'
                })
                navi('/mypage')
            })
        }else{
            Swal.fire({
                icon:'error',
                title:'비밀번호',
                text:'비밀번호가 일치하지 않습니다.'
            });
        }
  
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
                <div className={styles.pwDetail}>영문, 숫자, 특수문자 8~12자로 입력해주세요</div>
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
              {!newPw&&(<div className={styles.pwDetail}>영문, 숫자, 특수문자 8~12자로 입력해주세요</div>)}
              {newPw&&(newPw===pw?(<div className={styles.pwDetailOk}>비밀번호가 일치합니다.</div>):(<div className={styles.pwDetail}>비밀번호가 일치하지 않습니다.</div>))}
            </div>
            <div className={styles.pwWarning}>
            비밀번호는 8~12자 이내로 영문(대,소문자), 숫자, 특수문자 3가지 조합 중 2가지 이상을 조합하셔서 만드시면 됩니다.
            </div>
            <Mybutton handleConfirm={handleConfirm} setcheck={null}/>
        </div>
    )
}
export default Password;