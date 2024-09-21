import { useEffect, useState } from 'react';
import styles from './Place.module.css';
import { api } from '../../../../config/config';
import { useUserData } from '../../../../store/store';

export const Place =({inputBrith,setinputBirth})=>{

    const {user} = useUserData();

    const handleBirth = (e)=>{
        console.log("생일 입력",e.target.value);
        setinputBirth(e.target.value);
    }

    return(
        <div className={styles.container}>
            <h3>예매자 확인</h3>
            <div className={styles.book_check}>
                <div className={styles.name}>
                    <span className={styles.title}>이름</span>
                    <span>{user.name}</span>
                </div>
                <div className={styles.name}>
                    <span className={styles.title}>생년월일</span>
                    <span><input type='text' style={{width:"80px"}} maxLength={6} onChange={handleBirth} value={inputBrith}/></span>
                    <span style={{color:"gray", fontWeight:"600"}}> &nbsp;&nbsp;예) 990101 (YYMMDD) </span>
                </div>
                <p style={{color:"red"}}>
                    <span>생년월일을 정확히 입력해주세요</span><br></br>
                    <span>가입 시 입력하신 정보와 다를 경우,</span><br></br>
                    <span>본인확인이 되지 않아 예매가 불가합니다.</span>
                </p>
                {/* <div className={styles.name}>
                    <span className={styles.title}>연락처</span>
                    <span>
                        <input type='text' style={{width:"45px"}}/>
                        &nbsp;-&nbsp; <input type='text' style={{width:"45px"}}/>
                        &nbsp;-&nbsp;<input type='text' style={{width:"45px"}}/>
                    </span>
                </div> */}
                <div className={styles.name}>
                    <span className={styles.title}>이메일</span>
                    <span>
                        <input type='text' disabled value={user.email}/>
                    </span>
                </div>
                <p style={{color:"gray"}}>해당 이메일로 예매 정보를 보내드립니다.</p>
            </div>
        </div>
    );
}