import { useState } from 'react';
import styles from './Withdrawal.module.css';
import Guide from './Guide/Guide';
const Withdrawal = () => {
    const [checkDetail, setCheckDetail] = useState([true, false, false]);

    return (
        <div className={styles.container}>
           <Guide checkDetail={checkDetail} setCheckDetail={setCheckDetail}/>
        </div>
    )
}
export default Withdrawal;