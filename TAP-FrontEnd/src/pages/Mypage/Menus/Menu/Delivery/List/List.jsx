import AddForm from './AddForm/AddForm';
import styles from './List.module.css';
import React, { useState } from 'react';
const List = () => {
    const [check,setCheck]=useState(false);
    const handleDelivery = () => {
        setCheck(true);
    }
    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        나의 주소록은 최대 10개까지 저장할 수 있습니다.
                    </div>
                    <div>
                        <button onClick={handleDelivery}>+ 새 배송지 추가</button>
                    </div>
                </div>
                <div className={styles.body}>

                </div>
            </div>
            {check&&(<AddForm setCheck={setCheck}/>)}
        </React.Fragment>

    )
}
export default List;