import styles from './Home.module.css'

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.banner}>배너</div>
            <div className={styles.ranking}>랭킹</div>
            <div className={styles.tOpen}>티켓 오픈</div>
            <div className={styles.sale}>지금 할인중!</div>
            <div className={styles.review}>베스트 관람 후기</div>
        </div>
    )
}

export default Home
