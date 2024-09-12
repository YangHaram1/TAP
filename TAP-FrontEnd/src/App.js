import './App.css'
import styles from './App.module.css'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Mypage from './pages/Mypage/Mypage'
import Sign from './pages/Sign/Sign'
import Chat from './pages/Chat/Chat'
import Grade from './pages/Grade/Grade'
import Draggable from 'react-draggable';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuthStore, useCheckList, useNotification } from './store/store'
import { ChatsProvider } from './context/ChatsContext'
import { useEffect, useState, useRef } from 'react'
import { api } from './config/config'
import { jwtDecode } from 'jwt-decode'
import { AdminHeader } from './components/Header/AdminHeader'
import { Biz } from './pages/ABusiness/Biz'
import { Admin } from './pages/Admin/Admin'
import { ResizableBox } from 'react-resizable';
import { Slide, ToastContainer } from 'react-toastify';
import { host } from './config/config'
import 'react-resizable/css/styles.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    const { login, isAuth, setAuth, role, token } = useAuthStore()
    const { webSocketCheck,setWebSocketCheck ,setOnmessage} = useCheckList();
    const { maxCount } = useNotification();

    const [hasScrolled, setHasScrolled] = useState(false)
    const [disabled, setDisabled] = useState(true);
    const [chat, setChat] = useState();
    const [maxRetries, setMaxRetries] = useState(0);

    const websocketRef = useRef(null);
    const draggableRef = useRef(null);



    useEffect(() => {
        const stoken = sessionStorage.getItem('token')
        if (stoken != null) {
            api.post(`/auth`)
                .then(resp => {
                    const decoded = jwtDecode(stoken)
                    login(stoken)
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

    //채팅 
    useEffect(() => {
        if (isAuth) {
            setChat(() => {
                return (
                    <Draggable nodeRef={draggableRef} disabled={disabled}>
                        <div className={styles.chatContainer} ref={draggableRef}>
                            <ResizableBox
                                width={500}
                                height={600}
                                minConstraints={[500, 600]}
                                maxConstraints={[800, 700]}
                                axis="both"
                                handleSize={[30, 30]}
                                resizeHandles={['se']}
                            >
                                <Chat websocketRef={websocketRef} draggableRef={draggableRef} setDisabled={setDisabled} />
                            </ResizableBox>
                        </div>
                    </Draggable>
                )
            })
        }
        else {
            setChat(null);
        }
    }, [isAuth, disabled])

    //웹소켓 전체 관리
    useEffect(() => {
        if (isAuth) {
            websocketRef.current = new WebSocket(`${host}/chatWebsocket?token=${token}`);
        }
        if (websocketRef.current != null) {
            websocketRef.current.onopen = () => {
                console.log('Connected to WebSocket');
                setOnmessage(); //연결되면 chatapp쪽 onmessage 함수 셋팅
            }
            websocketRef.current.onclose = () => {
                console.log('Disconnected from WebSocket');
                if (maxRetries < 10) {
                    setWebSocketCheck();
                    console.log("websocket 재연결 시도")
                }
                setMaxRetries((prev) => {
                    return prev + 1;
                })
            };

            websocketRef.current.onerror = (error) => {
                console.log('WebSocket error observed:', error);
                if (maxRetries < 10) {
                    setWebSocketCheck();
                    console.log("websocket 재연결 시도")
                }
                setMaxRetries((prev) => {
                    return prev + 1;
                })

            };

        }
        return () => {
            if (websocketRef.current != null) {
                websocketRef.current.close();
            }
        };
    }, [isAuth, webSocketCheck]);

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
                    {chat}
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
                    limit={maxCount}
                    transition={Slide}
                />
            </Router>
        </ChatsProvider>
    )
}

export default App
