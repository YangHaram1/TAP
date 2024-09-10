import styles from './Mypage.module.css'
import Home from './Home/Home'
import Menus from './Menus/Menus'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Grade from './../Grade/Grade'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { api } from '../../config/config'
import { useAuthStore } from './../../store/store'
import SweetAlert from '../../components/SweetAlert/SweetAlert'

const Mypage = () => {
    const navi = useNavigate()
    const location = useLocation()
    const path = location.pathname
    const { isAuth } = useAuthStore()

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (token !== null) {
            api.post(`/auth`)
                .then(resp => {})
                .catch(resp => {
                    Swal.fire({
                        title: '마이페이지',
                        text: '인증되지 않은 사용자입니다',
                    })
                    navi('/')
                })
        } else if (token == null) {
            SweetAlert(
                'warning',
                '마이페이지',
                '로그인을 해주세요',
                () => navi('/login'),
                () => navi(-1)
            )
        }
    }, [isAuth])

    return (
        <React.Fragment>
            {isAuth && (
                <div className={styles.container}>
                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route path="menus/*" element={<Menus />} />
                        {/* <Route path='grade' element={<Grade />} /> */}
                    </Routes>
                </div>
            )}
        </React.Fragment>
    )
}
export default Mypage
