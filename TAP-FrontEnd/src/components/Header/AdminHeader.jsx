import styles from './AdminHeader.module.css';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from './../../store/store';
import SweetAlert from './../SweetAlert/SweetAlert';
import img1 from '../../images/logo192.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
export const AdminHeader = ({hasScrolled}) => {
    const navi = useNavigate()
    const { isAuth, logout } = useAuthStore()

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        logout()
        navi('/')
    }

    const handleLogin = () => {
        if (isAuth) {
            SweetAlert(
                'warning',
                '로그아웃',
                '로그아웃을 하시겠습니까',
                handleLogout
            )
        } else {
            navi('/login')
        }
    }
    const handleMypage = () => {
        navi('/mypage')
    }
    const handleHome = () => {
        navi('/')
    }
    return (
        <div className={hasScrolled?`${styles.container} ${styles.scroll}`:styles.container}>
            <div className={styles.header}>
                <div className={styles.leftConts}>
                    <div className={styles.title} onClick={handleHome}>
                        <img src={img1} className={styles.logo} />
                    </div>
                    <div className={styles.search}>
                        <input
                            type="search"
                            placeholder="콘서트, 뮤지컬, 스포츠로 찾아보세요."
                        />
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className={styles.faMagnifyingGlass}
                        />
                    </div>
                </div>

                <div className={styles.headerMenus}>
                    <div className={styles.headerMenu}> 관리자 또는 사업자 이름</div>
                    <div className={styles.headerMenu} onClick={handleLogin}>
                        {isAuth ? '로그아웃' : '로그인'}
                    </div>
                </div>
            </div>
        </div>
    )
}

//////////////////////////////////////////////////////////////////
