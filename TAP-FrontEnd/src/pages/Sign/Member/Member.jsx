import styles from './Member.module.css'
import img1 from '../../../images/logo192.png'
const Member = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <img src={img1} alt="" className={styles.logo} />
            </div>
            <div className={styles.signConts}>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>아이디</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>비밀번호</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>비밀번호 확인</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>이름</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>이메일</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                        />
                    </div>
                    <div>
                        <button className={styles.emailBtn}>이메일 인증</button>
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>주민번호</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>휴대폰</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                        />
                    </div>
                </div>
                <div className={styles.signCont}>
                    <div className={styles.subTitle}>주소</div>
                    <div className={styles.inputTxt}>
                        <input
                            type="text"
                            placeholder="아이디는 어쩌고 저쩌고"
                        />
                    </div>
                </div>
            </div>
            <div className={styles.agree}>
                <div>
                    <input type="checkbox" />
                    약관 동의
                </div>
                <div>약관 동의 내용</div>
            </div>
            <div className={styles.btn}>
                <button>회원가입</button>
            </div>
        </div>
    )
}
export default Member
