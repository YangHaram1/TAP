import { useState } from 'react';
import styles from './Apply.module.css';
import { useEffect } from 'react';
import { api } from './../../../../../../config/config';

const Apply = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        api.get(`/search/myApply`).then((resp) => {
            setList(resp.data)
        })
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    이름
                </div>
                <div>
                    장소
                </div>
                <div>
                    유형
                </div>
                <div>
                    공연날짜
                </div>
                <div>
                    상태
                </div>
            </div>

            {
                list.map((item, index) => {
                    return (
                        <div className={styles.contents} key={index}>
                            <div>
                                {item.name}
                            </div>
                            <div>
                                {item.place_name}
                            </div>
                            <div>
                                {item.sub_category_name}
                            </div>
                            <div>
                                {item.start_date}
                            </div>
                            <div>
                                {item.status}
                            </div>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default Apply;