import Swal from 'sweetalert2';
import { api } from '../../../../../../config/config';
import AddForm from './AddForm/AddForm';
import styles from './List.module.css';
import React, { useEffect, useState } from 'react';
const List = () => {
    const [check, setCheck] = useState(false);
    const [list, setList] = useState([]);

    const handleDelivery = () => {
        if (list.length > 9) {
            Swal.fire({
                icon: 'error',
                title: '배송',
                text: '최대 10개까지만 저장가능합니다'
            })
        }
        else {
            setCheck(true);
        }

    }
    useEffect(() => {
        api.get(`/delivery`).then((resp) => {
            setList(resp.data);
        })
    }, [])
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
                    <div className={styles.type}>
                        <div className={styles.address}>
                            주소
                        </div>
                        <div className={styles.zipcode}>
                            우편번호
                        </div>
                        <div className={styles.name}>
                            이름
                        </div>
                        <div className={styles.phone}>
                            번호
                        </div>
                    </div>
                    {
                        list.map((item, index) => {

                            return (
                                <div className={styles.contents}>
                                    <div className={styles.address}>
                                        <div>
                                            {item.address}
                                        </div>
                                        <div>
                                            {item.detailed_address}
                                        </div>
                                    </div>
                                    <div className={styles.zipcode}>
                                        {item.zipcode}
                                    </div>
                                    <div className={styles.name}>
                                        {item.name}
                                    </div>
                                    <div className={styles.phone}>
                                        {item.phone}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {check && (<AddForm setCheck={setCheck} setList={setList} />)}
        </React.Fragment>

    )
}
export default List;