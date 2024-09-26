import styles from './AdminHeader.module.css'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from './../../store/store'
import SweetAlert from './../SweetAlert/SweetAlert'
import img1 from '../../images/logo192.png'
import { useEffect, useState } from 'react';
import { api } from '../../config/config';
export const AdminHeader = ({hasScrolled}) => {
    const navi = useNavigate()
    const { loginID, isAuth, logout, role } = useAuthStore()

    const [name, setName] = useState('');
    const [bizName, setBizName] = useState('');
    
    useEffect(()=>{
        api.get(`admin/dash/getID`).then((resp)=>{
         
            setName(resp.data.NAME);
            setBizName(resp.data.COMPANY_NAME);
        }
        )
    },[])
    
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
        <div
            className={
                hasScrolled
                    ? `${styles.container} ${styles.scroll}`
                    : styles.container
            }
        >
            <div className={styles.header}>
                <div className={styles.leftConts}>
                    <div className={styles.title} onClick={handleHome}>
                        <img src={img1} className={styles.logo} />
                    </div>

                    {role === 'ROLE_BIZ' && (
                        <div className={styles.headerMenu}>사업명 {bizName}</div>
                    )}
                    
                </div>

                <div className={styles.headerMenus}>
                    {role === 'ROLE_BIZ' && (
                        <div className={styles.headerMenu}>사업자 {name}</div>
                    )}
                    {role === 'ROLE_ADMIN' && (
                        <div className={styles.headerMenu}>관리자 {name}</div>
                    )}
                    <div 
                    className={`${styles.headerMenu} ${styles.sign}`}
                    onClick={handleLogin}>

                        {isAuth ? '로그아웃' : '로그인'}
                    </div>
                </div>
            </div>
        </div>
    )
}

