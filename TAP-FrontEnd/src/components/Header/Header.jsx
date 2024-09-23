import styles from './Header.module.css'
import { useNavigate } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import { useAuthStore } from './../../store/store'
import SweetAlert from './../SweetAlert/SweetAlert'
import img1 from '../../images/logo192.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass,
    faHouseUser,
    faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
const Header = ({ hasScrolled }) => {
    const navi = useNavigate()
    const { isAuth, logout } = useAuthStore()
    const [isSearchBox, setIsSearchBox] = useState(false)
    const searchBoxRef = useRef(null)
    const inputRef = useRef(null)
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = e => {
        setInputValue(e.target.value)
    }
    const clearInput = () => {
        setInputValue('')
    }
    const handleLogout = () => {
        sessionStorage.removeItem('token')
        logout()
        navi('/')
    }

    useEffect(() => {
        const handleClick = event => {
            if (
                searchBoxRef.current &&
                !searchBoxRef.current.contains(event.target) &&
                !inputRef.current.contains(event.target)
            ) {
                setIsSearchBox(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])
    const handleLogin = () => {
        if (isAuth) {
            SweetAlert(
                'warning',
                '로그아웃',
                '로그아웃을 하시겠습니까',
                handleLogout,
                null
            )
        } else {
            navi('/login')
        }
    }

    const handleMypage = () => {
        navi('/mypage')
    }
    const handleSign = () => {
        navi('/sign')
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
                        <img src={img1} className={styles.logo} alt="" />
                    </div>
                    <div className={styles.findItem}>
                        <div className={styles.search}>
                            <input
                                type="search"
                                placeholder="콘서트, 뮤지컬, 스포츠로 찾아보세요."
                                ref={inputRef}
                                onClick={() => setIsSearchBox(true)}
                            />

                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className={styles.faMagnifyingGlass}
                            />
                        </div>
                        {isSearchBox && (
                            <div
                                className={styles.searchBox}
                                ref={searchBoxRef}
                            ></div>
                        )}
                    </div>
                </div>

                <div className={styles.headerMenus}>
                    <div className={styles.headerMenu} onClick={handleLogin}>
                        {isAuth ? '로그아웃' : '로그인'}
                    </div>
                    {!isAuth && (
                        <div
                            className={`${styles.headerMenu} ${styles.sign}`}
                            onClick={handleSign}
                        >
                            회원가입
                        </div>
                    )}
                    <div
                        className={`${styles.headerMenu} ${styles.faHouseUser}`}
                        onClick={handleMypage}
                    >
                        <FontAwesomeIcon
                            icon={faHouseUser}
                            className={styles.myPage}
                        />
                        {/* <span>MyPage</span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header
