import styles from './Inquiry.module.css';
import { Route, Routes } from 'react-router-dom';
import List from './List/List';
import Detail from './Detail/Detail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faPagelines } from '@fortawesome/free-regular-svg-icons';

const Inquiry = () => {
    const [cpage, setCpage] = useState(1);
    const [recordCountPerPage, setRecordCountPerPage] = useState(5);
    const handleCpage = (e) => {
        setRecordCountPerPage(e.target.value); // cpage 설정 후 recordCountPerPage 설정
    };
    useEffect(()=>{
       if(cpage===1){
        setCpage(0); // 잠시 다른 값으로 설정
        setTimeout(() => {
          setCpage(1); // 다시 1로 설정
        }, 0); // 짧은 지연 후 cpage를 1로 설정하여 상태 변화 유도
       }
       else{
        setCpage(1)
       }
    },[recordCountPerPage])
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    고객 문의내역
                </div>
                <select value={recordCountPerPage} onChange={(e) => {handleCpage(e)}} className={styles.select}>
                    <option value={5}>5 </option>
                    <option value={10}> 10</option>
                    <option value={15}> 15</option>
                    <option value={20}> 20</option>
                    <option value={25}> 25</option>
                </select>
            </div>
            <Routes>
                <Route path='' element={<List recordCountPerPage={recordCountPerPage}  cpage={cpage} setCpage={setCpage}/>}></Route>
                <Route path='detail/:seq' element={<Detail />}></Route>
            </Routes>
        </div>
    )
}
export default Inquiry;