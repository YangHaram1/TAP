import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'
import img1 from '../../images/logo192.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEye } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'

const Login = () => {
    const navi = useNavigate()
    const [id, setId] = useState('')
    const [check, setCheck] = useState(false)
    const [idDiv, setIdDiv] = useState(true)
    const [pwDiv, setPwDiv] = useState(true)
    const idRef = useRef()
    const pwRef = useRef()
    const handleInput = () => {
        // inputRef.current.value = ''
        setId('')
    }
    const handleCheck = () => {
        setCheck(prev => {
            if (!prev) {
                localStorage.setItem('loginId', id)
            } else {
                localStorage.removeItem('loginId')
            }
            return !prev
        })
    }

    useEffect(() => {
        const loginId = localStorage.getItem('loginId')
        if (loginId != null) {
            setId(loginId)
            setCheck(true)
        }
    }, [])
    const handleContainer = e => {
        if (idRef.current && !idRef.current.contains(e.target)) {
            setIdDiv(true)
        }
        if (pwRef.current && !pwRef.current.contains(e.target)) {
            setPwDiv(true)
        }
    }
    return (
        <div onClick={handleContainer}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <img src={img1} alt="logo" className={styles.logo} />
                    <span className={styles.tap}>TAP</span>
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
                            className={styles.id}
                            value={id}
                            onChange={e => {
                                setId(e.target.value)
                            }}
                            onClick={() => {
                                setIdDiv(false)
                                setPwDiv(true)
                            }}
                        />
                        {id === '' ? (
                            ''
                        ) : (
                            <button onClick={handleInput}>x</button>
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
                            type="text"
                            placeholder="비밀번호"
                            className={styles.pw}
                            onClick={() => {
                                setIdDiv(true)
                                setPwDiv(false)
                            }}
                        />
                        <FontAwesomeIcon icon={faEye} />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            className={styles.checkBox}
                            checked={check}
                            onClick={handleCheck}
                        />
                        <span>아이디 저장</span>
                    </div>
                </div>
                <div>
                    <button className={styles.button}>로그인</button>
                </div>
            </div>
        </div>
    )
}
export default Login
