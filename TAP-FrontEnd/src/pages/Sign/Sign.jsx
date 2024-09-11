import Company from './Company/Company'
import Member from './Member/Member'
import { useState } from 'react'
import styles from './Sign.module.css'
const Sign = () => {
    const [tap, setTap] = useState(0)
    return (
        <div>
            <div className={styles.signBtn}>
                <button
                    className={
                        tap === 0 ? styles.memberBtnActive : styles.memberBtn
                    }
                    onClick={() => {
                        setTap(0)
                    }}
                >
                    일반 회원
                </button>
                <button
                    className={
                        tap === 1 ? styles.companyBtnActive : styles.companyBtn
                    }
                    onClick={() => {
                        setTap(1)
                    }}
                >
                    사업자 회원
                </button>
            </div>
            <div className={styles.signWrapper}>
                {tap === 1 ? <Company></Company> : <Member></Member>}
            </div>
        </div>
    )
}
export default Sign
