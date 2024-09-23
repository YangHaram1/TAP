import { Route, Routes } from 'react-router-dom';
import styles from './BizContent.module.css';
import { EventApply } from './EventApply/EventApply';
import { BizManage } from './BizManage/BizManage';
import { SaleApply } from './SaleApply/SaleApply';
import { WaitingApply } from './WaitingApply/WaitingApply';
import { WaitingSaleApply } from './WaitingSaleApply/WaitingSaleApply';
import Mypage from './../Mypage/Mypage';

export const BizContent=()=>{
    return(
        <div className={styles.container}>
            <Routes>
                <Route path="/*" element={<BizManage/>}/>
                <Route path="/waitingapply/registration/*" element={<WaitingApply/>}/>
                <Route path="/waitingapply/sale/*" element={<WaitingSaleApply/>}/>
                <Route path="/application/registration/*" element={<EventApply/>}/>
                <Route path="/application/sale/*" element={<SaleApply/>}/>
                <Route path="/mypage*" element={<Mypage/>}/>
            </Routes>
        </div>
    );
}