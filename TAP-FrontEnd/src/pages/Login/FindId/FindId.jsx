import styles from './FindId.module.css'
import { useEffect, useState } from 'react'
const FindId = () => {
    return (
        <div className={styles.container}>
            <div className={styles.findDiv}>
                <div className={styles.title}>아이디 찾기</div>
                <input type="text" placeholder="이름" className={styles.name} />
                <input
                    type="text"
                    placeholder="이메일"
                    className={styles.email}
                />
                <div className={styles.btn}>
                    <button className={styles.idBtn}>아이디 찾기</button>
                    <button className={styles.backBtn}>돌아가기</button>
                </div>
            </div>
        </div>
    )
}

export default FindId
