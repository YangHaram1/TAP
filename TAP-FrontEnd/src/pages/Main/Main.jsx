import { Art } from './Art/Art'
import Header from './Header/Header'
import styles from './Main.module.css'
import { Routes, useNavigate, Route } from 'react-router-dom'
import { Sports } from './Sports/Sports'
import { TeamPage } from './Sports/TeamPage/TeamPage'
import { Detail } from './Art/Detail/Detail'
import Home from './Home/Home'
import Support from '../Support/Support'
import Board from './../Board/Board'

const Main = () => {
    const navi = useNavigate()

    return (
        <div className={styles.container}>
            <div className={styles.menus}>
                <Header></Header>
            </div>
            <div className={styles.body}>
                <Routes>
                    <Route path="/" element={<Home></Home>} />
                    <Route
                        path="/musical"
                        element={<Art category={'musical'} />}
                    />
                    <Route
                        path="/concert"
                        element={<Art category={'concert'} />}
                    />
                    <Route path="/detail" element={<Detail />} />
                    <Route path="sports" element={<Sports />} />
                    <Route path="/teamPage" element={<TeamPage />} />
                    <Route path="/team/:teamId" element={<TeamPage />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/board" element={<Board />} />
                </Routes>
            </div>
        </div>
    )
}
export default Main
