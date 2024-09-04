
import styles from './Main.module.css';
import { Routes, useNavigate, Route } from "react-router-dom";

const Main = () => {
    const navi = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.menus}>
                <Header></Header>
            </div>
            <div className={styles.body}>
                <Routes>
                    <Route path='' element={<div>main</div>} />
                    <Route path='musical' element={<div>musical</div>} />
                    <Route path='sports' element={<div>sports</div>} />
                </Routes>
            </div>
        </div>
    )
}
export default Main;