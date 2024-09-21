import { useEffect, useState } from "react";
import { api } from "../../../../config/config";
import { useOrder, useUserData } from "../../../../store/store";
import styles from "./Post.module.css";

export const Post = ()=>{

    const {user} = useUserData();
    const [addressList, setAddressList] = useState([]); // 전체 주소
    const {setAddress} = useOrder(); // 선택주소

    useEffect(()=>{
        // setAddress(null);
        api.get(`/delivery`)
        .then((resp)=>{
            console.log(resp.data);
            setAddressList(resp.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[user])

    const handleAddress = (index)=>{
        console.log("주소 추가하는 중");
        setAddress(addressList[index]);
    }

    return(
        <div className={styles.container}>
            <h3>배송지 확인</h3>
            <div className={styles.post_address}>
                {
                    addressList.map((address,index)=>{
                        return(
                            <>
                            <label><input key={index} type="radio" name="address" onClick={()=>{handleAddress(index)}}/>{address.address} {address.detailed_address}</label><br></br>
                            </>
                        );
                    })
                }     
            </div>
        </div>
    );    
}