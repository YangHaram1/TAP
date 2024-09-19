import styles from './Login.module.css'
import { useNavigate, useLocation, Routes } from 'react-router-dom'
import img1 from '../../images/logo192.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faLock,
    faEye,
    faXmark,
    faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { api } from '../../config/config'
import { useAuthStore } from '../../store/store'
import { jwtDecode } from 'jwt-decode'
import FindId from './FindId/FindId'
import FindPw from './FindPw/FindPw'

const Login = () => {
    const navi = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState({ id: '', pw: '' })
    const { login, isAuth, setAuth } = useAuthStore()
    const handleChange = e => {
        const { name, value } = e.target
        setUser(prev => {
            return { ...prev, [name]: value }
        })
    }

    const [check, setCheck] = useState(false)
    const [idDiv, setIdDiv] = useState(true)
    const [pwDiv, setPwDiv] = useState(true)
    const idRef = useRef()
    const pwRef = useRef()
    const handleInput = () => {
        setUser(prev => {
            return {
                id: '',
                pw: prev.pw,
            }
        })
    }
    const [showEye, setShowEye] = useState(false)
    const [page, setPage] = useState('login')

    const handleToggleEye = () => {
        setShowEye(prevShowEye => !prevShowEye)
    }

    const handleCheck = () => {
        setCheck(prev => {
            return !prev
        })
    }
    useEffect(()=>{
        if(isAuth){
            navi('/')
        }
    },[isAuth])
    
    useEffect(() => {
      
        const loginId = localStorage.getItem('loginId')
        if (loginId != null) {
            // setId(loginId)
            setUser(prev => {
                return {
                    id: loginId,
                    pw: prev.pw,
                }
            })
            setCheck(true)
        }
        // if (!isAuth) {
        //     //isAuth false
        //     const token = sessionStorage.getItem('token')
        //     if (token != null && token != '') {
        //         login(token)
        //     }
        // }
    }, [])

    const handleLogin = async () => {
        const id = user.id
        const pw = user.pw
        await api
            .post(`/auth/${id}/${pw}`)
            .then(resp => {
                console.log(resp)
                const token = resp.data
                const decoded = jwtDecode(token)
                console.log(decoded)

                sessionStorage.setItem('token', token) // 인증 확인 용도
                login(token)
                if (check == true) {
                    localStorage.setItem('loginId', decoded.sub)
                } else {
                    localStorage.removeItem('loginId')
                }
                setAuth(decoded)
                navi(-1)
            })
            .catch(resp => {
                alert('아이디 또는 패스워드를 확인하세요. ')
            })
    }
    const handleContainer = e => {
        if (idRef.current && !idRef.current.contains(e.target)) {
            setIdDiv(true)
        }
        if (pwRef.current && !pwRef.current.contains(e.target)) {
            setPwDiv(true)
        }
    }

    const handlePageChange = newPage => {
        navi(newPage)
    }
    if (location.pathname.split('/')[2] === 'findId') {
        return <FindId></FindId>
    }
    if (location.pathname.split('/')[2] === 'findPw') {
        return <FindPw></FindPw>
    }

    return (
        <div className={styles.container} onClick={handleContainer}>
            {/* <Routes>
                <Route path="" element={<Login />} />
                <Route path="findId" element={<Login />} />
                <Route path="findPw" element={<Login />} />
            </Routes> */}

            <div className={styles.container}>
                <div className={styles.title}>
                    <img src={img1} alt="logo" className={styles.logo} />
                </div>
                <div className={styles.form}>
                    <div
                        className={idDiv ? styles.idDivNot : styles.idDiv}
                        ref={idRef}
                    >
                        <FontAwesomeIcon
                            icon={faUser}
                            className={styles.icon}
                        />
                        <input
                            type="text"
                            placeholder="아이디"
                            name="id"
                            className={styles.id}
                            value={user.id}
                            onChange={handleChange}
                            onClick={() => {
                                setIdDiv(false)
                                setPwDiv(true)
                            }}
                        />
                        {user.id === '' ? (
                            ''
                        ) : (
                            <FontAwesomeIcon
                                icon={faXmark}
                                onClick={handleInput}
                                className={styles.remove}
                            />
                        )}
                    </div>
                    <div
                        className={pwDiv ? styles.idDivNot : styles.idDiv}
                        ref={pwRef}
                    >
                        <FontAwesomeIcon
                            icon={faLock}
                            className={styles.icon}
                        />
                        <input
                            type={showEye ? 'text' : 'password'}
                            placeholder="비밀번호"
                            name="pw"
                            value={user.pw}
                            className={styles.pw}
                            onClick={() => {
                                setIdDiv(true)
                                setPwDiv(false)
                            }}
                            onChange={handleChange}
                        />

                        <FontAwesomeIcon
                            icon={showEye ? faEye : faEyeSlash}
                            className={styles.eye}
                            onClick={handleToggleEye}
                        />

                        {/* <FontAwesomeIcon
                            icon={faEyeSlash}
                            className={styles.notEye}
                            onClick={handleToggleEye}
                        /> */}
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            className={styles.checkBox}
                            checked={check}
                            onChange={handleCheck}
                        />
                        <span className={styles.saveId}>아이디 저장</span>
                    </div>
                    <div>
                        <button onClick={() => handlePageChange('findId')}>
                            아이디 찾기
                        </button>
                        <button onClick={() => handlePageChange('findPw')}>
                            비밀번호 찾기
                        </button>
                    </div>
                </div>
                <div>
                    <button onClick={handleLogin} className={styles.button}>
                        로그인
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Login
