import React from 'react'
import styles from './Header.module.css'
import { Routes, useNavigate, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faComments,
    faCircleInfo,
    faBullhorn,
} from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const navi = useNavigate()
    const location = useLocation() // 현재 경로 확인
    const [currentCategory, setCurrentCategory] = useState('')

    const handleCategoryChange = category => {
        setCurrentCategory(category)
        navi(`/${category}`) // 카테고리 변경과 동시에 페이지 이동
    }

    // 홈으로 돌아갈 때 카테고리 상태 리셋
    useEffect(() => {
        if (location.pathname === '/') {
            setCurrentCategory('') // 홈 페이지일 때 상태 초기화
        }
    }, [location]) // location이 변경될 때마다 useEffect 실행

    return (
        <React.Fragment>
            <div
                className={
                    currentCategory === 'concert'
                        ? styles.menuActice
                        : styles.menu
                }
                onClick={() => handleCategoryChange('concert')}
            >
                콘서트
            </div>
            <div
                className={
                    currentCategory === 'musical'
                        ? styles.menuActice
                        : styles.menu
                }
                onClick={() => handleCategoryChange('musical')}
            >
                뮤지컬
            </div>
            <div
                className={
                    currentCategory === 'sports'
                        ? styles.menuActice
                        : styles.menu
                }
                onClick={() => handleCategoryChange('sports')}
            >
                스포츠
            </div>
            <span className={styles.menuLine}>|</span>
            <div
                className={
                    currentCategory === 'support'
                        ? styles.moreActiveMenu
                        : styles.moreMenu
                }
                onClick={() => handleCategoryChange('support')}
            >
                <FontAwesomeIcon icon={faComments} />
                고객센터
            </div>
            <div
                className={
                    currentCategory === 'board'
                        ? styles.moreActiveMenu
                        : styles.moreMenu
                }
                onClick={() => handleCategoryChange('board')}
            >
                <FontAwesomeIcon icon={faBullhorn} />
                공지사항
            </div>
        </React.Fragment>
    )
}
export default Header
