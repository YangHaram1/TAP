// import { Caroucel } from '../../../components/Caroucel/Caroucel'
import styles from './Home.module.css'
import { useState } from 'react'
const Home = () => {
    const [images, setImages] = useState([])
    return (
        <div className={styles.container}>
            <div className={styles.banner}></div>
            <div className={styles.ranking}>
                <div className={styles.rankingTxt}>
                    <div className={styles.rTitle}>장르별 랭킹</div>
                    <div className={styles.rSubTitle}>
                        오늘 뭐볼까? 상위 TOP 5 !
                    </div>
                </div>
                <div className={styles.rankingCategory}>
                    <div className={styles.sort}>뮤지컬</div>
                    <div className={styles.sort}>콘서트</div>
                    <div className={styles.sort}>스포츠</div>
                </div>
                <div className={styles.rankingImgs}>
                    <div className={styles.rank}>
                        <div className={styles.rankImg}></div>
                        <div className={styles.rankTitle}>
                            뮤지컬 '킹키부츠'
                        </div>
                        <div className={styles.rankSubTitle}>
                            블루스퀘어 신한카드홀
                        </div>
                        <div className={styles.rankDate}>2024.9.7 ~ 11.10</div>
                        <div className={styles.rankSub}>
                            <span>단독판매</span>
                        </div>
                    </div>
                    <div className={styles.rank}>
                        <div className={styles.rankImg}></div>
                        <div className={styles.rankTitle}>
                            뮤지컬 '킹키부츠'
                        </div>
                        <div className={styles.rankSubTitle}>
                            블루스퀘어 신한카드홀
                        </div>
                        <div className={styles.rankDate}>2024.9.7 ~ 11.10</div>
                        <div className={styles.rankSub}>
                            <span>단독판매</span>
                        </div>
                    </div>
                    <div className={styles.rank}>
                        <div className={styles.rankImg}></div>
                        <div className={styles.rankTitle}>
                            뮤지컬 '킹키부츠'
                        </div>
                        <div className={styles.rankSubTitle}>
                            블루스퀘어 신한카드홀
                        </div>
                        <div className={styles.rankDate}>2024.9.7 ~ 11.10</div>
                        <div className={styles.rankSub}>
                            <span>단독판매</span>
                        </div>
                    </div>
                    <div className={styles.rank}>
                        <div className={styles.rankImg}></div>
                        <div className={styles.rankTitle}>
                            뮤지컬 '킹키부츠'
                        </div>
                        <div className={styles.rankSubTitle}>
                            블루스퀘어 신한카드홀
                        </div>
                        <div className={styles.rankDate}>2024.9.7 ~ 11.10</div>
                        <div className={styles.rankSub}>
                            <span>단독판매</span>
                        </div>
                    </div>
                    <div className={styles.rank}>
                        <div className={styles.rankImg}></div>
                        <div className={styles.rankTitle}>
                            뮤지컬 '킹키부츠'
                        </div>
                        <div className={styles.rankSubTitle}>
                            블루스퀘어 신한카드홀
                        </div>
                        <div className={styles.rankDate}>2024.9.7 ~ 11.10</div>
                        <div className={styles.rankSub}>
                            <span>단독판매</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.tOpen}>티켓 오픈</div>
            <div className={styles.sale}>지금 할인중!</div>
            <div className={styles.review}>베스트 관람 후기</div>
        </div>
    )
}

export default Home
