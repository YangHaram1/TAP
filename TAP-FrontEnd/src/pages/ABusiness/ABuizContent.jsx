import { EventApply } from "./EventApply/EventApply";
import styles from './ABuizContent.module.css';
import { Route, Router, Routes } from "react-router-dom";
import { BuizSideMenu } from "../ASideMenu/BuizSideMenu";

export const ABuizContent=()=>{

    return(
        <div className={styles.container}>
          
            <Routes>
            <Route path="/applyevent/*" element={<EventApply/>}/>
            </Routes>
            </div>
    );
      
}