import { useState } from 'react';
import styles from './Menus.module.css'
import Password from './Password/Password';

const Menus = () => {
    const [checkPw,setCheckPw]=useState(true);
    
    return (
        <div className={styles.container}>
            <div className={styles.menus}>
                <div className={styles.menu}>
                    <div>
                        img
                    </div>
                    <div>
                        회원정보 수정
                    </div>
                </div>
                <div className={styles.menu}>
                    <div>
                        img
                    </div>
                    <div>
                        비밀번호 변경
                    </div>
                </div>
                <div className={styles.menu}>
                    <div>
                        img
                    </div>
                    <div>
                        배송지 관리
                    </div>
                </div>
                <div className={styles.menu}>
                    <div>
                        img
                    </div>
                    <div>
                        쿠폰 관리
                    </div>
                </div>
                <div className={styles.menu}>
                    <div>
                        img
                    </div>
                    <div>
                        게시물 관리
                    </div>
                </div>
                <div className={styles.menu}>
                    <div>
                        img
                    </div>
                    <div>
                        회원탈퇴
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                {checkPw&&(<Password setCheckPw={setCheckPw}/>)}
        
            </div>
        </div>
    )
}
export default Menus;