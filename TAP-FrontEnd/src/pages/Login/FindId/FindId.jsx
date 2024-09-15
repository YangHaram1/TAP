import styles from './FindId.module.css'
import { useEffect, useState } from 'react'
import img1 from '../../../images/logo192.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import {
    faUser,
    faLock,
    faEye,
    faXmark,
    faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'
import { api } from '../../../config/config'
const FindId = () => {
    const navi = useNavigate()
    const [findId, setFindId] = useState({ name: '', email: '' })
    const handleChange = e => {
        const { name, value } = e.target
        setFindId(prev => {
            return { ...prev, [name]: value }
        })
    }
    const handleFindId = async () => {
        const name = findId.name
        const email = findId.email
        await api.get(`/members/findId/${name}/${email}`).then(resp => {
            console.log(resp.data)
            if (resp.data != '') {
                Swal.fire({
                    icon: 'success',
                    title: '아이디 찾기',
                    text: `아이디는 ${resp.data}입니다.`,
                })
                navi('login')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '아이디 찾기',
                    text: `아이디를 찾을 수 없습니다.`,
                })
            }
        })
    }

    useEffect(() => {
        console.log(findId)
    }, [findId]) // 새로고침될때 + member 값이 변할 때 마다 실행
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <img src={img1} alt="" className={styles.logo} />
            </div>
            <div className={styles.form}>
                <div className={styles.inputName}>
                    {/* <FontAwesomeIcon icon={faUser} className={styles.icon} /> */}
                    <input
                        type="text"
                        placeholder="이름"
                        name="name"
                        value={findId.name}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputEmail}>
                    {/* <FontAwesomeIcon icon={faUser} className={styles.icon} /> */}
                    <input
                        type="text"
                        placeholder="이메일"
                        name="email"
                        value={findId.email}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.btn}>
                <button className={styles.button} onClick={handleFindId}>
                    아이디 찾기
                </button>
            </div>
        </div>
    )
}

export default FindId
