import { Art } from './Art/Art'
import Header from './Header/Header'
import Home from './Home/Home'
import styles from './Main.module.css'
import { Routes, useNavigate, Route } from 'react-router-dom'

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
                    <Route path="sports" element={<div>sports</div>} />
                </Routes>
            </div>
        </div>
    )
}
export default Main
