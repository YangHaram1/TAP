import styles from './Header.module.css';
import { useNavigate } from "react-router-dom";
import { api } from '../../config/config';
import { useAuthStore } from './../../store/store';
import SweetAlert from './../SweetAlert/SweetAlert';

const Header = () => {
    const navi =useNavigate();
    const {isAuth,logout}=useAuthStore();
    
    const handleLogout=()=>{
        sessionStorage.removeItem('token');
        logout();
    }

    const handleLogin=()=>{
        if(isAuth){
            SweetAlert('warning','로그아웃','로그아웃을 하시겠습니까',handleLogout);
        }
        else{
            navi('/login')
        }
        
    }
    const handleMypage=()=>{
        const token=sessionStorage.getItem('token');
        if(token!==null){
            api.post(`/auth`).then((resp)=>{
                navi('/mypage')
            }).catch((resp)=>{
                alert('인증되지 않은 사용자 입니다')
            })
        }
    }
    const handleHome=()=>{
        navi('/')
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title} onClick={handleHome}>
                    TAP
                </div>
                <div className={styles.headerMenus}>
                    <div className={styles.headerMenu} onClick={handleLogin}>
                        {isAuth?"로그아웃":"로그인"}
                    </div>
                    <div className={styles.headerMenu}>
                        회원가입
                    </div>
                    <div className={styles.headerMenu} onClick={handleMypage}>
                        마이페이지
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;