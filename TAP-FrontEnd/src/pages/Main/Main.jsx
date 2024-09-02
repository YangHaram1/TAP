import styles from './Main.module.css';
import { useNavigate } from "react-router-dom";


const Main = () => {
    const navi = useNavigate();



    return (
        <div className={styles.container}>
            <div className={styles.menus}>
                <div className={styles.menu}>
                    콘서트
                </div>
                <div className={styles.menu}>
                    뮤지컬
                </div>
                <div className={styles.menu}>
                    스포츠
                </div>
                <div className={styles.menu}>
                    고객센터
                </div>
                <div className={styles.menu}>
                    공지사항
                </div>
            </div>
            <div className={styles.body}>

            </div>
        </div>
    )
}
export default Main;