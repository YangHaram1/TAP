import styles from './Mypage.module.css';
import Home from './Home/Home';
import Menus from './Menus/Menus';
import { Routes, Route } from 'react-router-dom';
import Grade from './../Grade/Grade';

const Mypage =()=>{
    return(
        <div className={styles.container}>
            <Routes>
                <Route path='' element={<Home/>}/>
                <Route path='menus/*' element={<Menus/>}/>
                <Route path='grade' element={<Grade/>}/>
            </Routes>
        </div>
    )
}
export default Mypage;