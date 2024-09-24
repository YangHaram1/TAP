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
import { api } from '../../config/config'

const Header = ({ hasScrolled }) => {
    const navi = useNavigate()
    const { isAuth, logout } = useAuthStore()
    const [inputValue, setInputValue] = useState('')

    /*검색*/
    const [isSearchBox, setIsSearchBox] = useState(false) // 검색 상자 표시 여부
    const [searchResults, setSearchResults] = useState([]) // 검색 결과 상태
    const [query, setQuery] = useState('') // 사용자가 입력한 검색어
    const searchBoxRef = useRef(null)
    const inputRef = useRef(null)

    // 검색어가 변경될 떄마다 서버로 요청
    useEffect(() => {
        if (query) {
            api.get(`search?query=${query}`)
                .then(resp => {
                    setSearchResults(resp.data)
                })
                .catch(error => {
                    console.error('검색오류', error)
                })
        } else {
            setSearchResults([])
        }
    }, [query])

    // 검색어 입력 이벤트
    const handleInputChange = e => {
        setQuery(e.target.value)
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
                                value={query}
                                onChange={handleInputChange}
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
                            >
                                {searchResults.length > 0 ? (
                                    <ul>
                                        {searchResults.map((item, index) => {
                                            ;<li
                                                key={index}
                                                onClick={() =>
                                                    (window.location.href = `/detail/${item.id}`)
                                                }
                                            >
                                                {item.tite} - {item.category}
                                            </li>
                                        })}
                                    </ul>
                                ) : (
                                    <p>검색 결과가 없습니다.</p>
                                )}
                            </div>
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
