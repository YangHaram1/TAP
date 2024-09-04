import { useState } from 'react';
import styles from './Menus.module.css'
import Password from './Password/Password';
import Img from '../Home/Category/Img/Img';
import Menu from './Menu/Menu';
import { useNavigate } from 'react-router-dom';

const Menus = () => {
    const [checkPw, setCheckPw] = useState(true);
    const navi=useNavigate();
    const handleNavi=(path)=>{
        setCheckPw(true)
        navi(path);
    }

    return (
        <div className={styles.container}>
            <div className={styles.menus}>
                <div className={styles.menu} onClick={()=>handleNavi('')}>
                    <div>
                        <Img img={'member'} />
                    </div>
                    <div>
                        회원정보 수정
                    </div>
                </div>
                <div className={styles.menu}  onClick={()=>handleNavi('password')}>
                    <div>
                        <Img img={'password'} />
                    </div>
                    <div>
                        비밀번호 변경
                    </div>
                </div>
                <div className={styles.menu} onClick={()=>handleNavi('delivery')}>
                    <div>
                        <Img img={'delivery'} />
                    </div>
                    <div>
                        배송지 관리
                    </div>
                </div>
                <div className={styles.menu} onClick={()=>handleNavi('coupon')}>
                    <div>
                        <Img img={'coupon'} />
                    </div>
                    <div>
                        쿠폰 관리
                    </div>
                </div>
                <div className={styles.menu} onClick={()=>handleNavi('board')}>
                    <div>
                        <Img img={'board'} />
                    </div>
                    <div>
                        게시물 관리
                    </div>
                </div>
                <div className={styles.menu} onClick={()=>handleNavi('withdrawal')}>
                    <div>
                        <Img img={'withdrawal'} />
                    </div>
                    <div>
                        회원탈퇴
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                {checkPw && (<Password setCheckPw={setCheckPw} />)}
                {!checkPw&&(<Menu/>)}
            </div>
        </div>
    )
}
export default Menus;