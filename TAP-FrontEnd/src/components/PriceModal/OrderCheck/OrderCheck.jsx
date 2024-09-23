import { useEffect, useState } from 'react';
import styles from './OrderChec.module.css';
import { Place } from './Place/Place';
import { Post } from './Post/Post';
import { useOrder, useUserData } from '../../../store/store';
import { api } from '../../../config/config';

export const OrderCheck = ({inputBrith,setinputBirth,delivery_tax})=>{

    const [tap, setTap] = useState("place"); // 배송방법
    const {user,setUser} = useUserData();
    const {setDeliveryMethod} = useOrder();

    useEffect(()=>{
        api.get(`/members`)
        .then((resp)=>{
            setUser(resp.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const handleMain = (tap) => {
        setTap(tap);
        setDeliveryMethod(tap);
    }

    return(
        <div className={styles.container}>
            <div className={styles.side}>
                <h3 style={{marginTop:'35px', marginBottom:'0px'}}>티켓 수령 방법</h3>
                <ul>
                    <li onClick={()=>{handleMain("place")}}> 현장 수령</li>
                    <li onClick={()=>{handleMain("post")}}> 배송 ({delivery_tax.toLocaleString()}원) </li>
                </ul>
            </div>
            <div className={styles.main}>
                <Place inputBrith={inputBrith} setinputBirth={setinputBirth} />
                { tap === 'post' ? <Post/>:""}
            </div>
        </div>
    );
}