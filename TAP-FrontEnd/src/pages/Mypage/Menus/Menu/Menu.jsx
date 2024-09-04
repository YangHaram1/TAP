import styles from './Menu.module.css';
import { Routes,Route } from 'react-router-dom';
import Member from './Member/Member';
import Withdrawal from './Withdrawal/Withdrawal';
import Board from './Board/Board';
import Coupon from './Coupon/Coupon';
import Delivery from './Delivery/Delivery';
import Password from './Password/Password';
const Menu=()=>{
    return(
        <div className={styles.container}>
            <Routes>
                <Route path='' element={<Member/>}/>
                <Route path='password' element={<Password/>}/>
                <Route path='delivery' element={<Delivery/>}/>
                <Route path='coupon' element={<Coupon/>}/>
                <Route path='board' element={<Board/>}/>
                <Route path='withdrawal' element={<Withdrawal/>}/>
            </Routes>
        </div>
    )
}
export default Menu;