import styles from './Inquiry.module.css';
import { Route, Routes } from 'react-router-dom';
import List from './List/List';
import Detail from './Detail/Detail';

const Inquiry =()=>{
    return(
        <div className={styles.container}>
        <div className={styles.header}>
            고객 문의내역
        </div>
        <Routes>
            <Route path='' element={<List/>}></Route>
            <Route path='detail/:seq' element={<Detail />}></Route>
        </Routes>
    </div>
    )
}
export default Inquiry;