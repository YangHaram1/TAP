import { Routes, Route } from 'react-router-dom'
import styles from './Notice.module.css'
import List from './List/List'
import Detail from './Detail/Detail'
import { useEffect, useState } from 'react'
import { faPagelines } from '@fortawesome/free-regular-svg-icons'
const Notice = () => {
    return (
        <div className={styles.container}>
            <Routes>
                <Route path="" element={<List />}></Route>
                <Route path="detail/:board_seq" element={<Detail />}></Route>
            </Routes>
        </div>
    )
}

export default Notice
