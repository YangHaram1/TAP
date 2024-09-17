import styles from './FindPw.module.css'
import { useEffect, useState } from 'react'
import img1 from '../../../images/logo192.png'
import Swal from 'sweetalert2'
import { api } from '../../../config/config'
const FindPw = () => {
    const [findPw, setFindPw] = useState({ id: '', email: '' })
    const handleChange = e => {
        const { name, value } = e.target
        setFindPw(prev => {
            return { ...prev, [name]: value }
        })
    }

    const handleFindPw = async () => {
        const id = findPw.id
        const email = findPw.email
    }
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <img src={img1} alt="" className={styles.logo} />
            </div>
            <div className={styles.form}>
                <div className={styles.inputId}>
                    <input
                        type="text"
                        placeholder="아이디"
                        name="id"
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputEmail}>
                    <input
                        type="text"
                        placeholder="이메일"
                        name="이메일"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.btn}>
                <button className={styles.button} onClick={handleFindPw}>
                    비밀번호 찾기
                </button>
            </div>
        </div>
    )
}

export default FindPw
