import { Routes ,Route} from 'react-router-dom';
import styles from './Board.module.css';

const Board=()=>{
    return(
        <div className={styles.container}>
            <Routes>
                <Route path='noitice' element={null}/>
            </Routes>
        </div>
    )
}
export default Board;