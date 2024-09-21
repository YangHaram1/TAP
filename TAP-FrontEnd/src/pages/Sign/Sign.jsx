import Company from './Company/Company'
import Member from './Member/Member'
import { useEffect, useState } from 'react'
import styles from './Sign.module.css'
import { useAuthStore } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import React from 'react'
const Sign = () => {
    const [tap, setTap] = useState(0)
    const { isAuth } = useAuthStore();
    const [check, setCheck] = useState(false);
    const navi = useNavigate();

    useEffect(() => {
        console.log(isAuth)
        if (isAuth) { //이게 로그인되었으면
            navi('/');
            setCheck(false)
        } else {

            setCheck(true)

        }

    }, [isAuth])


    return (
        <React.Fragment>

            {check && (<div>
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
            </div>)}
        </React.Fragment>

    )
}
export default Sign
