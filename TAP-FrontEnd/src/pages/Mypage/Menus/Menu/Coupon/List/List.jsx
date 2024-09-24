import { useEffect, useState } from 'react';
import styles from './List.module.css';
import { api } from '../../../../../../config/config';
import { format } from 'date-fns';

const List = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        api.get(`coupon`).then((resp) => {
            setList(resp.data);
            console.log(resp.data)
        })
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div >
                    쿠폰
                </div>
                <div >
                    할인 금액
                </div>
                <div >
                    발급날짜
                </div>
                <div >
                    유효기간
                </div>
                <div>
                    상태
                </div>

            </div>

            {
                list.map((item, index) => {
                    const issueDate = format(new Date(item.issue_date), 'yyyy-MM-dd');
                    const expireDate = format(new Date(item.expire_date), 'yyyy-MM-dd');
                    return (
                        <div className={styles.contents} key={index}>

                            <div className={styles.title}>
                                {item.title}
                            </div>
                            <div className={styles.discount}>
                                {item.discount}
                            </div>
                            <div className={styles.issueDate}>
                                {issueDate}
                            </div>
                            <div className={styles.expireDate}>
                                {expireDate}
                            </div>
                            <div className={styles.state}>
                                {item.state === 1 ? <span style={{color:'blue'}}>사용 가능</span> : <span style={{color:'red'}}>이미 사용</span>}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default List;