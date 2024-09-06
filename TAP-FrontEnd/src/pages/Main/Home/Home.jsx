import { Caroucel } from '../../../components/Caroucel/Caroucel'
import styles from './Home.module.css'
import { useState } from 'react'
const Home = () => {
    const [images, setImages] = useState([])
    return (
        <div className={styles.container}>
            <div className={styles.banner}></div>
            <div className={styles.ranking}>
                <div className={styles.rankingTxt}>
                    <span className={styles.rTitle}>티켓 랭킹</span>
                    <span className={styles.rSubTitle}>
                        오늘 뭐볼까? 지금 HOT한 공연
                    </span>
                </div>
                <div className={styles.rankingCategory}>
                    <div className={styles.sort}>뮤지컬</div>
                    <div className={styles.sort}>콘서트</div>
                    <div className={styles.sort}>스포츠</div>
                </div>
                <div className={styles.rankingImgs}>
                    <Caroucel images={images} category={'art'} />
                </div>
            </div>
            <div className={styles.tOpen}>티켓 오픈</div>
            <div className={styles.sale}>지금 할인중!</div>
            <div className={styles.review}>베스트 관람 후기</div>
        </div>
    )
}

export default Home
