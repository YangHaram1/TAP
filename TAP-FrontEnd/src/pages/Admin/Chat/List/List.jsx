import React, { useEffect, useState } from 'react';
import styles from './List.module.css';

const List=()=>{
    const [list,setList]=useState([]);
    useEffect(()=>{

    },[])
    return(
        <React.Fragment>
            <div className={styles.title}>
                사용자 목록
            </div>
            <div className={styles.contents}>
                {
                    list.map((item,index)=>{
                        return(
                            <div className={styles.content} key={index}>
                                
                            </div>
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}
export default List;