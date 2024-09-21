import { Route, Routes } from 'react-router-dom';
import styles from './Coupon.module.css';
import Type from './Type/Type';
import List from './List/List';

const Coupon =()=>{
    return(
        <div className={styles.container}>
            <Routes>
                <Route path='type' element={<Type/>}/>
                <Route path='list' element={<List/>}/>
            </Routes>

        </div>
    )
}
export default Coupon;