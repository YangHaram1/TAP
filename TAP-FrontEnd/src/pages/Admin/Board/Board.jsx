import { Routes, Route } from 'react-router-dom'
import styles from './Board.module.css'
import Notice from './Notice/Notice'

const Board = () => {
    return (
        <div className={styles.container}>
            <Routes>
                <Route path="notice" element={<Notice></Notice>} />
            </Routes>
        </div>
    )
}
export default Board
