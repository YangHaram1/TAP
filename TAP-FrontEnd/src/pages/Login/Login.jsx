import styles from './Login.module.css';
import { useNavigate } from "react-router-dom";

const Login =()=>{
    const navi = useNavigate();

    return(
        <div className={styles.container}>
            로그인
        </div>
    );

}
export default Login;