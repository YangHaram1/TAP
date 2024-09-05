import { Art } from './Art/Art';
import Header from './Header/Header';
import styles from './Main.module.css';
import { Routes, useNavigate, Route } from "react-router-dom";
import { Sports } from './Sports/Sports';
import { TeamPage } from './Sports/TeamPage/TeamPage';

const Main = () => {
    const navi = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.menus}>
                <Header></Header>
            </div>
            <div className={styles.body}>
                <Routes>
                    <Route path='/' element={<div>main</div>} />
                    <Route path='/musical' element={<Art category={"musical"}/>}/>
                    <Route path='/concert' element={<Art category={"concert"}/>}/>
                    <Route path='sports' element={<Sports/>} />
                    <Route path='/teamPage' element={<TeamPage />} />
                </Routes>
            </div>
        </div>
    )
}
export default Main;