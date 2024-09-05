import { Route, Routes } from 'react-router-dom';
import styles from './AdminContent.module.css'
import { Dash } from './Dash/Dash';
import { UserMem } from './Members/UserMem/UserMem';
import { BizMem } from './Members/BizMem/BizMem';

export const AdminContent =()=>{
    return(
        <div className={styles.container}>
            <Routes>
                <Route path="/" element={<Dash/>}/>
                <Route path="/members/user" element={<UserMem/>}/>
                <Route path="/members/biz" element={<BizMem/>}/>
            </Routes>
        </div>
    );
}