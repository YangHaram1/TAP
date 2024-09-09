import './App.css'
import styles from './App.module.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuthStore } from './store/store'
import { ChatsProvider } from './context/ChatsContext'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Mypage from './pages/Mypage/Mypage'
import Sign from './pages/Sign/Sign'
import { useEffect, useState,useRef } from 'react'
import { api } from './config/config'
import { jwtDecode } from 'jwt-decode'
import { AdminHeader } from './components/Header/AdminHeader'
import { Biz } from './pages/ABusiness/Biz'
import { Admin } from './pages/Admin/Admin'
import Grade from './pages/Grade/Grade'
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'
import Draggable from 'react-draggable';
import { Slide, ToastContainer } from 'react-toastify';
import Chat from './pages/Chat/Chat'

function App() {
    const { login, isAuth, setAuth, role } = useAuthStore()
    const [hasScrolled, setHasScrolled] = useState(false)

    const websocketRef = useRef(null);
    const draggableRef = useRef(null);
    const [disabled, setDisabled] = useState(true);

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
            } else if (scrollPosition <= 10 && hasScrolled) {
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

    const chatApp = isAuth ? (
        <Chat websocketRef={websocketRef} draggableRef={draggableRef} setDisabled={setDisabled} />
      ) : (
        <div></div>
      );
    
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
                                <Route path="/sign/*" element={<Sign />} />
                                <Route path="/mypage/*" element={<Mypage />} />
                            </Routes>
                        </>
                    ) : isAuth && role === 'ROLE_ADMIN' ? (
                        <>
                            <AdminHeader hasScrolled={hasScrolled} />
                            <Admin />
                        </>
                    ) : isAuth && role === 'ROLE_BIZ' ? (
                        <>
                            <AdminHeader hasScrolled={hasScrolled} />
                            <Biz />
                        </>
                    ) : (
                        isAuth &&
                        role === 'ROLE_USER' && (
                            <>
                                <Header hasScrolled={hasScrolled} />
                                <Routes>
                                    <Route path="/*" element={<Main />} />
                                    <Route
                                        path="/mypage/*"
                                        element={<Mypage />}
                                    />
                                    <Route path="/sign/*" element={<Sign />} />
                                    <Route path='/grade/*' element={<Grade />} />
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
                    <Draggable nodeRef={draggableRef} disabled={disabled}>
                        <div className={styles.chatContainer} ref={draggableRef}>
                            <ResizableBox
                                width={350}
                                height={500}
                                minConstraints={[350, 500]}
                                maxConstraints={[600, 650]}
                                axis="both"
                                handleSize={[30, 30]}
                                resizeHandles={['se']}
                            >
                                {chatApp}
                            </ResizableBox>
                        </div>

                    </Draggable>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    transition={Slide}
                />
            </Router>
        </ChatsProvider>
    )
}

export default App
