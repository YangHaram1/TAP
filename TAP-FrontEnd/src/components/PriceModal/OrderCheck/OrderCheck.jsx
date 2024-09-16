import { useState } from 'react';
import styles from './OrderChec.module.css';
import { Place } from './Place/Place';
import { Post } from './Post/Post';

export const OrderCheck = ()=>{

    const [tap, setTap] = useState("place");

    const handleMain = (tap) => {
        setTap(tap);
    }

    return(
        <div className={styles.container}>
            <div className={styles.side}>
                <h3 style={{marginTop:'35px', marginBottom:'0px'}}>티켓 수령 방법</h3>
                <ul>
                    <li onClick={()=>{handleMain("place")}}> 현장 수령</li>
                    <li onClick={()=>{handleMain("post")}}> 배송 (3,200원) </li>
                </ul>
            </div>
            <div className={styles.main}>
                {
                    tap === 'place' ? 
                    <Place/>
                    :
                    <>
                    <Place/>
                    <Post/>
                    </>
                }
            </div>
        </div>
    );
}