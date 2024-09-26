import styles from './Header.module.css'
import { useNavigate } from 'react-router-dom'
import React, { useRef, useEffect } from 'react'
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
    const [arr, setArr] = useState([])

    // 검색어가 변경될 떄마다 서버로 요청
    useEffect(() => {
        if (query) {
            api.get(`search?query=${query}`)
                .then(resp => {
                    setSearchResults(resp.data)
                    console.log(resp.data)
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
    const handleMove = item => {
        const seq = item.application_seq
        // console.log("상품번호", seq);
        navi('/detail', { state: { seq } })
        setArr(prev => {
            return [
                ...prev,
                `${item.name} - ${item.sub_category_name} - ${item.place_name}`,
            ]
        })
    }

    // 최근 검색 목록
    useEffect(() => {
        if (arr.length > 0) {
            const json = JSON.stringify(arr) // 세션 스토리지에 배열 저장하려면 json으로 처리
            localStorage.setItem('search', json)
        }
    }, [arr])

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('search'))
        if (item) {
            setArr(item)
        }
    }, [])

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
                                <div className={styles.searchUl}>
                                    {searchResults.length > 0 ? (
                                        searchResults.map((item, index) => {
                                            return (
                                                <div
                                                    className={styles.searchLi}
                                                    key={index}
                                                    onClick={() =>
                                                        handleMove(item)
                                                    }
                                                >
                                                    {item.name} -{' '}
                                                    {item.sub_category_name} -{' '}
                                                    {item.place_name}
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <React.Fragment>
                                            {arr.length > 0 ? (
                                                <React.Fragment>
                                                    <div
                                                        className={
                                                            styles.searchList
                                                        }
                                                    >
                                                        최근 검색한 목록
                                                    </div>
                                                    <div className={styles.arr}>
                                                        {arr.map(
                                                            (item, index) => {
                                                                return (
                                                                    <div
                                                                        className={
                                                                            styles.arrItem
                                                                        }
                                                                    >
                                                                        {item}
                                                                    </div>
                                                                )
                                                            }
                                                        )}
                                                    </div>
                                                </React.Fragment>
                                            ) : (
                                                <p>검색 결과가 없습니다.</p>
                                            )}
                                        </React.Fragment>
                                    )}
                                </div>
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
