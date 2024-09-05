import { Route, Routes } from 'react-router-dom';
import styles from './BizContent.module.css';
import { EventApply } from './EventApply/EventApply';
import { BizManage } from './BizManage/BizManage';

export const BizContent=()=>{
    return(
        <div className={styles.container}>
            <Routes>
                <Route path="/" element={<BizManage/>}/>
                <Route path="/application/registration" element={<EventApply/>}/>
                {/* <Route path="/applysale/*" element={<SaleApply/>}/> */}
            </Routes>
        </div>
    );
}