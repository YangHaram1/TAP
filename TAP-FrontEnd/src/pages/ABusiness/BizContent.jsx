import { Route, Routes } from 'react-router-dom';
import styles from './BizContent.module.css';

export const BizContent=()=>{
    return(
        <div className={styles.container}>
          
            <Routes>
            <Route path="/applyevent/*" element={<EventApply/>}/>
            </Routes>
            </div>
    );
}