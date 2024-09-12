import { Route, Routes } from 'react-router-dom';
import styles from './BizContent.module.css';
import { EventApply } from './EventApply/EventApply';
import { BizManage } from './BizManage/BizManage';
import { SaleApply } from './SaleApply/SaleApply';
import { WaitingApply } from './WaitingApply/WaitingApply';

export const BizContent=()=>{
    return(
        <div className={styles.container}>
            <Routes>
                <Route path="/*" element={<BizManage/>}/>
                <Route path="/waitingapply/*" element={<WaitingApply/>}/>
                <Route path="/application/registration/*" element={<EventApply/>}/>
                <Route path="/application/sale/*" element={<SaleApply/>}/>
            </Routes>
        </div>
    );
}