import { useEffect } from 'react';
import styles from './List.module.css'

export const List = ({genre, category})=>{

    useEffect(()=>{
        console.log("변경테스트", genre, category);
    },[genre, category])

    return (
        <div className={styles.container}>
            {/* <div className={styles.search}> 랭킹순 /지역 검색 </div> */}
            <div className={styles.contents}>
                <div className={styles.card}>
                <a href='#'>
                    <div className={styles.poster}>
                        <img src='/logo192.png'></img>
                    </div>
                    <p style={{fontSize:"18px", fontWeight:"600"}}>뮤지컬 &lt;킹키부츠&gt; </p>
                    <p style={{marginBottom:"0"}}>캐러셀2-1</p>
                    <p style={{marginTop:"0"}}>2024.09.04 - 2024.09.27</p>
                </a>
                </div>
                <div className={styles.card}>
                <a href='#'>
                    <div className={styles.poster}>
                        <img src='/logo192.png'></img>
                    </div>
                    <p style={{fontSize:"18px", fontWeight:"600"}}>뮤지컬 &lt;킹키부츠&gt; </p>
                    <p style={{marginBottom:"0"}}>캐러셀2-1</p>
                    <p style={{marginTop:"0"}}>2024.09.04 - 2024.09.27</p>
                </a>
                </div>
                <div className={styles.card}>
                <a href='#'>
                    <div className={styles.poster}>
                        <img src='/logo192.png'></img>
                    </div>
                    <p style={{fontSize:"18px", fontWeight:"600"}}>뮤지컬 &lt;킹키부츠&gt; </p>
                    <p style={{marginBottom:"0"}}>캐러셀2-1</p>
                    <p style={{marginTop:"0"}}>2024.09.04 - 2024.09.27</p>
                </a>
                </div>
                <div className={styles.card}>
                <a href='#'>
                    <div className={styles.poster}>
                        <img src='/logo192.png'></img>
                    </div>
                    <p style={{fontSize:"18px", fontWeight:"600"}}>뮤지컬 &lt;킹키부츠&gt; </p>
                    <p style={{marginBottom:"0"}}>캐러셀2-1</p>
                    <p style={{marginTop:"0"}}>2024.09.04 - 2024.09.27</p>
                </a>
                </div>
                <div className={styles.card}>
                <a href='#'>
                    <div className={styles.poster}>
                        <img src='/logo192.png'></img>
                    </div>
                    <p style={{fontSize:"18px", fontWeight:"600"}}>뮤지컬 &lt;킹키부츠&gt; </p>
                    <p style={{marginBottom:"0"}}>캐러셀2-1</p>
                    <p style={{marginTop:"0"}}>2024.09.04 - 2024.09.27</p>
                </a>
                </div>
                <div className={styles.card}>
                <a href='#'>
                    <div className={styles.poster}>
                        <img src='/logo192.png'></img>
                    </div>
                    <p style={{fontSize:"18px", fontWeight:"600"}}>뮤지컬 &lt;킹키부츠&gt; </p>
                    <p style={{marginBottom:"0"}}>캐러셀2-1</p>
                    <p style={{marginTop:"0"}}>2024.09.04 - 2024.09.27</p>
                </a>
                </div>
            </div>
        </div>
    );

}