import styles from './Header.module.css';
import { useNavigate } from "react-router-dom";

export const AdminHeader = () => {
    const navi =useNavigate();
    const hadnleLogout=()=>{
        navi('/login')
    }
    
    const handleHome=()=>{
        // navi('/')
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title} onClick={handleHome}>
                    TAP
                </div>
                <div className={styles.headerMenus}>
                    <div className={styles.headerMenu} >
                        거래처 및 관리자 이름
                    </div>
                    <div className={styles.headerMenu} onClick={hadnleLogout}>
                        로그아웃
                    </div>
                </div>
            </div>
        </div>
    )
}