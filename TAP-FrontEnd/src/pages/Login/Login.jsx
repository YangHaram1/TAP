import styles from './Login.module.css';
import { useNavigate } from "react-router-dom";
import App from './../../App';

const Login = () => {
    const navi = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.title}>

            </div>
            <div className={styles.form}>
                <div>
                    아이디
                </div>
                <div>
                    비번
                </div>
                <div>
                로그인 상태
            </div>
            </div>
            <div>
                <button className={styles.button}>로그인 </button>
            </div>
        </div>
    );

}
export default Login;