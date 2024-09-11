import styles from './Company.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../config/config'
const Company = () => {
    return (
        <div className={styles.container}>
            <div className={styles.signConts}>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        아이디
                        <button className={styles.checkBtn}>
                            아이디 중복 검사
                        </button>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="id"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>비밀번호</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="pw"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>비밀번호 확인</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="rePw"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        사업자 이름(대표자 이름)
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="name"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        이메일
                        <button className={styles.checkBtn}>이메일 인증</button>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="email"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>생년월일</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            name="birth"
                            placeholder="아이디는 어쩌고 저쩌고"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>성별</div>
                    <div className={styles.checkBox}>
                        <input type="radio" name="gender" value="M" id="male" />
                        <label htmlFor="male">남자</label>
                        <input
                            type="radio"
                            name="gender"
                            value="F"
                            id="female"
                        />
                        <label htmlFor="female">여자</label>
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>휴대폰</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="phone"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>사업체 이름</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="email"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>사업체 전화번호</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="email"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>사업체 등록번호</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="email"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>
                        사업체 등록증
                        <button className={styles.checkBtn}>첨부</button>
                    </div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                            name="email"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>우편번호</div>
                    <div className={styles.inputZipCode}>
                        <input
                            type="text"
                            disabled={true}
                            placeholder="아이디는 어쩌고 저쩌고"
                        />
                        <div>
                            <button className={styles.addressBtn}>
                                우편 번호 찾기
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>기본 주소</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            disabled={true}
                            placeholder="아이디는 어쩌고 저쩌고"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>상세 주소</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            name="detailed_address"
                            placeholder="아이디는 어쩌고 저쩌고"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.btn}>
                <button>회원가입</button>
            </div>
        </div>
    )
}
export default Company
