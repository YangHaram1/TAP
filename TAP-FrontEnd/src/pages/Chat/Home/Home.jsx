import styles from './Home.module.css';
import logo from '../../../images/logo192.png';
import ai from '../../../images/ai.png';
import chat from'../../../images/chat.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.btn}>
                <button><FontAwesomeIcon icon={faBan} /></button>
            </div>
            <div className={styles.logo}>
                <img src={logo} alt=''></img>
            </div>
            <div className={styles.text}>
                <p><span>Support</span>에 오신걸 환영합니다</p>
                <p>아래 버튼을 <span>클릭</span>해주세요</p>
            </div>
            <div className={styles.contents}>
                <div className={styles.content}>
                    <div className={styles.img}>
                        <img src={ai} alt="" />
                    </div>
                    <div className={styles.detail}>
                        Tap집사랑 상담하기
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.img}>
                        <img src={chat} alt="" />
                    </div>
                    <div className={styles.detail}>
                        관리자랑 1:1 상담하기
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;