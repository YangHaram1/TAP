import { useEffect, useState } from 'react';
import styles from './MyInquiry.module.css';
import { api } from './../../../config/config';
import { Route, Routes } from 'react-router-dom';
import List from './List/List';
import Detail from './Detail/Detail';


const MyInquiry = () => {

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                내 문의내역
            </div>
            <Routes>
                <Route path='' element={<List/>}></Route>
                <Route path='detail/:seq' element={<Detail />}></Route>
            </Routes>
        </div>
    )
}

export default MyInquiry;