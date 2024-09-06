import './App.css'
import styles from './App.module.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { host } from './config/config'
import { useAuthStore } from './store/store'
import { ChatsProvider } from './context/ChatsContext'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Mypage from './pages/Mypage/Mypage'

import { useEffect, useState } from 'react'
import { api } from './config/config'
import { jwtDecode } from 'jwt-decode'
import { AdminHeader } from './components/Header/AdminHeader'
import { Biz } from './pages/ABusiness/Biz'
import { Admin } from './pages/Admin/Admin'

function App() {
    const { login, isAuth, setAuth, role } = useAuthStore()
    const [hasScrolled, setHasScrolled] = useState(false)
    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (token != null) {
            api.post(`/auth`)
                .then(resp => {
                    const decoded = jwtDecode(token)
                    login(token)
                    setAuth(decoded)
                })
                .catch(resp => {
                    alert('인증되지 않은 사용자 입니다')
                })
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            // 현재 스크롤 위치 (Y축)
            const scrollPosition = window.scrollY

            // 스크롤이 10px 이상 내려갔을 때 상태 변경
            if (scrollPosition > 10 && !hasScrolled) {
                setHasScrolled(true) // 스크롤이 내려갔을 때 실행할 함수
                console.log('스크롤이 내려갔습니다!')
            } else if (scrollPosition <= 10 && hasScrolled) {
                console.log('스크롤이 올라감!')
                setHasScrolled(false) // 스크롤이 다시 위로 올라갔을 때 상태 변경
            }
        }

        // 스크롤 이벤트 리스너 추가
        window.addEventListener('scroll', handleScroll)

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [hasScrolled])

    return (
        <ChatsProvider>
            <Router>
                <div className={styles.container}>
                    {!isAuth ? (
                        <>
                            <Header hasScrolled={hasScrolled} />
                            <Routes>
                                <Route path="/*" element={<Main />} />
                                <Route path="/login/*" element={<Login />} />
                                <Route path="/mypage/*" element={<Mypage />} />
                            </Routes>
                        </>
                    ) : isAuth && role === 'ROLE_ADMIN' ? (
                        <>
                            <AdminHeader hasScrolled={hasScrolled}/>
                            <Admin/>
                        </>
                    ) : isAuth && role === 'ROLE_BIZ' ? (
                        <>
                            <AdminHeader hasScrolled={hasScrolled}/>
                            <Biz/>
                        </>
                    ) : (
                        isAuth &&
                        role === 'ROLE_USER' && (
                            <>
                                <Header hasScrolled={hasScrolled}/>
                                <Routes>
                                    <Route path="/*" element={<Main />} />
                                    <Route
                                        path="/mypage/*"
                                        element={<Mypage />}
                                    />
                                </Routes>
                            </>
                        )
                    )}
                    {/* <Header />
          <Routes>  
           {!isAuth&&(<Route path='/login/*' element={<Login />} />)}
            <Route path='/*'element={<Main/>}/>
            <Route path='/mypage/*'element={<Mypage/>}/>
            <Route path='/buiz/*'element={<ABuiz/>}/>
          </Routes> */}
                    <Footer />
                </div>
            </Router>
        </ChatsProvider>
    )
}

export default App