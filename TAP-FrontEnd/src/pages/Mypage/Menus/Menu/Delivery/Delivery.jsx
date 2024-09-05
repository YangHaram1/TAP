import { useState } from 'react';
import styles from './Delivery.module.css';
import Default from './Default/Default';
import List from './List/List';
const Delivery = () => {
    const [check,setCheck]= useState(true);
    const hanldeCheck=(value)=>{
        setCheck(value);
    }
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                배송지관리
            </div>
            <div className={styles.body}>
                <div className={styles.contents}>
                    <div className={check?styles.content:styles.contentReverse} onClick={()=>{hanldeCheck(true)}}>
                        나의 주소록
                    </div>
                    <div className={!check?styles.content:styles.contentReverse} onClick={()=>{hanldeCheck(false)}}>
                        기본 주소록
                    </div>
                </div>
                <div>
                    {check?<List/>:<Default/>}
                </div>
            </div>
        </div>
    )
}
export default Delivery;