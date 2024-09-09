import { useEffect, useState } from 'react';
import styles from './Withdrawal.module.css';
import Guide from './Guide/Guide';
import Reason from './Reason/Reason';
import Complete from './Complete/Complete';
import { Route, Routes } from 'react-router-dom';
const Withdrawal = () => {
    const [checkDetail, setCheckDetail] = useState([true, false, false]);
    const handleCheck=(index)=>{
        setCheckDetail((prev)=>{
            return(
                prev.map((item,i)=>{
                    if(i===index){
                        return true;
                    }
                    return false;
                })
            )
        })
    }
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[checkDetail])
    return (
        <div className={styles.container}>
          {checkDetail[0]&&( <Guide checkDetail={checkDetail} handleCheck={handleCheck}/>)}
          {checkDetail[1]&&( <Reason checkDetail={checkDetail} handleCheck={handleCheck}/>)}
          {checkDetail[2]&&( <Complete checkDetail={checkDetail} handleCheck={handleCheck}/>)}
        </div>
    )
}
export default Withdrawal;