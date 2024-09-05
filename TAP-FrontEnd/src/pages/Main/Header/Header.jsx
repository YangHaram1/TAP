import React from 'react'
import styles from './Header.module.css'
import { Routes, useNavigate, Route } from 'react-router-dom'

const Header = () => {
    const navi = useNavigate()
    return (
        <React.Fragment>
            <div
                className={styles.menu}
                onClick={() => {
                    navi('/concert')
                }}
            >
                콘서트
            </div>
            <div
                className={styles.menu}
                onClick={() => {
                    navi('/musical')
                }}
            >
                뮤지컬
            </div>
            <div
                className={styles.menu}
                onClick={() => {
                    navi('sports')
                }}
            >
                스포츠
            </div>
            <span className={styles.menuLine}>|</span>
            <div className={styles.menuCenter}>고객센터</div>
            <div className={styles.menuNotice}>공지사항</div>
        </React.Fragment>
    )
}
export default Header
