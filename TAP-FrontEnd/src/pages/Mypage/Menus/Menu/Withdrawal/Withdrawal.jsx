import { useState } from 'react';
import styles from './Withdrawal.module.css';
import Guide from './Guide/Guide';
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
    return (
        <div className={styles.container}>
          {checkDetail[0]&&( <Guide checkDetail={checkDetail} handleCheck={handleCheck}/>)}
          {checkDetail[1]&&( <Guide checkDetail={checkDetail} handleCheck={handleCheck}/>)}
          {checkDetail[2]&&( <Guide checkDetail={checkDetail} handleCheck={handleCheck}/>)}
        </div>
    )
}
export default Withdrawal;