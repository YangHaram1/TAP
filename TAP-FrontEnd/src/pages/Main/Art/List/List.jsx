import { useEffect } from 'react';
import styles from './List.module.css'

export const List = ({genre, category})=>{

    useEffect(()=>{
        console.log("변경테스트", genre, category);
    },[genre, category])

    return (
        <div className={styles.container}>
            <div className={styles.search}> 지역 검색 </div>
            <div className={styles.contents}> 목록 출력 구간 5개씩 출력 </div>
        </div>
    );

}