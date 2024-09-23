// import { Caroucel } from '../../../components/Caroucel/Caroucel'
import styles from './Home.module.css'
import { useState } from 'react'
import { Caroucel } from '../../../components/Caroucel/Caroucel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faS,
    faStar,
    faTicket,
    faAngleRight,
    faAngleLeft,
} from '@fortawesome/free-solid-svg-icons'
import Slide from './Slide/Slide'
import { useEffect } from 'react'
const Home = () => {
    const [images, setImages] = useState([])
    const [currentCategory, setCurrentCategory] = useState('musical')
    const [currentTicketIndex, setCurrentTicketIndex] = useState(0)
    const [saleTicketIndex, setSaleTicketIndex] = useState(0)
    const [maxList, setMaxList] = useState(4)
    const handleCategoryChange = category => {
        setCurrentCategory(category)
    }

    const [musical, setMusical] = useState([
        {
            title: ' 뮤지컬 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
        {
            title: ' 뮤지컬 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
        {
            title: ' 뮤지컬 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
        {
            title: ' 뮤지컬 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
        {
            title: ' 뮤지컬 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
    ])

    const [sport, setSport] = useState([
        {
            title: '스포츠 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
        {
            title: ' 스포츠 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
        {
            title: ' 스포츠 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
        {
            title: ' 스포츠 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
        {
            title: ' 스포츠  킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
    ])

    const [concert, setConcert] = useState([
        {
            title: '콘서트 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
        {
            title: ' 콘서트 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
        {
            title: ' 콘서트 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
        {
            title: ' 콘서트 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
        {
            title: ' 콘서트  킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        },
    ])
    const [openTicket, setOpenTicket] = useState([
        {
            release: '콘서트 킹키부츠',
            title: '2024 라포엠 단독 콘서트 [LA POEM SYMPHONY]',
            subtitle: '블루스퀘어 신한카드홀',
        },
        {
            release: '콘서트 킹키부츠',
            title: '2024 라포엠 단독 콘서트 [LA POEM SYMPHONY]',
            subtitle: '블루스퀘어 신한카드홀',
        },
        {
            release: '콘서트 킹키부츠',
            title: '2024 라포엠 단독 콘서트 [LA POEM SYMPHONY]',
            subtitle: '블루스퀘어 신한카드홀',
        },
        {
            release: '콘서트 킹키부츠',
            title: '2024 라포엠 단독 콘서트 [LA POEM SYMPHONY]',
            subtitle: '블루스퀘어 신한카드홀',
        },
        {
            release: '콘서트 킹키부츠',
            title: '2024 라포엠 단독 콘서트 [LA POEM SYMPHONY]',
            subtitle: '블루스퀘어 신한카드홀',
        },
        {
            release: '콘서트 킹키부츠',
            title: '2024 라포엠 단독 콘서트 [LA POEM SYMPHONY]',
            subtitle: '블루스퀘어 신한카드홀',
        },
        {
            release: 'aaaaa',
            title: '2024 라포엠 단독 콘서트 [LA POEM SYMPHONY]',
            subtitle: '블루스퀘어 신한카드홀',
        },
        {
            release: '콘서aaaaa트 킹키부츠',
            title: '2024 라포엠 단독 콘서트 [LA POEM SYMPHONY]',
            subtitle: '블루스퀘어 신한카드홀',
        },
        {
            release: '콘서트 킹키부츠',
            title: '2024 라포엠 단독 콘서트 [LA POEM SYMPHONY]',
            subtitle: '블루스퀘어 신한카드홀',
        },
        {
            release: '콘서트 킹키부츠',
            title: '2024 라포엠 단독 콘서트 [LA POEM SYMPHONY]',
            subtitle: '블루스퀘어 신한카드홀',
        },
        {
            release: '콘서트 킹키부츠',
            title: '2024 라포엠 단독 콘서트 [LA POEM SYMPHONY]',
            subtitle: '블루스퀘어 신한카드홀',
        },
        {
            release: 'adsfasdf',
            title: '2024 라포엠 단독 콘서트 [LA POEM SYMPHONY]',
            subtitle: '블루스퀘어 신한카드홀',
        },
        {
            release: 'adsfasdf',
            title: '2024 라포엠 단독 콘서트 [LA POEM SYMPHONY]',
            subtitle: '블루스퀘어 신한카드홀',
        },
    ])
    const [saleTicket, setSaleTicket] = useState([
        {
            title: '뮤지컬 〈장수탕 선녀님〉 - 서울숲',
            place: '서울숲 씨어터 2관',
            date: '2024.0.0~2024.09.09',
            rate: '83%',
            price: '33,000원',
        },
        {
            title: '뮤지컬 〈장수탕 선녀님〉 - 서울숲',
            place: '서울숲 씨어터 2관',
            date: '2024.0.0~2024.09.09',
            rate: '83%',
            price: '33,000원',
        },
        {
            title: '뮤지컬 〈장수탕 선녀님〉 - 서울숲',
            place: '서울숲 씨어터 2관',
            date: '2024.0.0~2024.09.09',
            rate: '83%',
            price: '33,000원',
        },
        {
            title: '뮤지컬 〈장수탕 선녀님〉 - 서울숲',
            place: '서울숲 씨어터 2관',
            date: '2024.0.0~2024.09.09',
            rate: '83%',
            price: '33,000원',
        },
        {
            title: '뮤지컬 〈장수탕 선녀님〉 - 서울숲',
            place: '서울숲 씨어터 2관',
            date: '2024.0.0~2024.09.09',
            rate: '83%',
            price: '33,000원',
        },
        {
            title: '뮤지컬 〈장수탕 선녀님〉 - 서울숲',
            place: '서울숲 씨어터 2관',
            date: '2024.0.0~2024.09.09',
            rate: '83%',
            price: '33,000원',
        },
    ])
    const [review, setReview] = useState([
        {
            tapSubTxt: '뮤지컬 하데스타운 한국 공연',
            tapTitle: '그럼에도 우린 다시 부르리라',
            tapExplain: `마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면 결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!`,

            userId: 'minjoo',
            score: '9.8',
        },
        {
            tapSubTxt: '뮤지컬 하데스타운 한국 공연',
            tapTitle: '그럼에도 우린 다시 부르리라',
            tapExplain: `마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면 결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!`,

            userId: 'minjoo',
            score: '9.8',
        },
        {
            tapSubTxt: '뮤지컬 하데스타운 한국 공연',
            tapTitle: '그럼에도 우린 다시 부르리라',
            tapExplain: `마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면 결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!`,

            userId: 'minjoo',
            score: '9.8',
        },
        {
            tapSubTxt: '뮤지컬 하데스타운 한국 공연',
            tapTitle: '그럼에도 우린 다시 부르리라',
            tapExplain: `마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면 결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!`,

            userId: 'minjoo',
            score: '9.8',
        },
        {
            tapSubTxt: '뮤지컬 하데스타운 한국 공연',
            tapTitle: '그럼에도 우린 다시 부르리라',
            tapExplain: `마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면 결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!`,

            userId: 'minjoo',
            score: '9.8',
        },
        {
            tapSubTxt: '뮤지컬 하데스타운 한국 공연',
            tapTitle: '그럼에도 우린 다시 부르리라',
            tapExplain: `마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면 결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!`,

            userId: 'minjoo',
            score: '9.8',
        },
        {
            tapSubTxt: '뮤지컬 하데스타운 한국 공연',
            tapTitle: '그럼에도 우린 다시 부르리라',
            tapExplain: `마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면 결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!`,

            userId: 'minjoo',
            score: '9.8',
        },
        {
            tapSubTxt: '뮤지컬 하데스타운 한국 공연',
            tapTitle: '그럼에도 우린 다시 부르리라',
            tapExplain: `마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면 결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!`,

            userId: 'minjoo',
            score: '9.8',
        },
        {
            tapSubTxt: '뮤지컬 하데스타운 한국 공연',
            tapTitle: '그럼에도 우린 다시 부르리라',
            tapExplain: `마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면 결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!`,

            userId: 'minjoo',
            score: '9.8',
        },
        {
            tapSubTxt: '뮤지컬 하데스타운 한국 공연',
            tapTitle: '그럼에도 우린 다시 부르리라',
            tapExplain: `마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면 결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!`,

            userId: 'minjoo',
            score: '9.8',
        },
    ])
    const handlePrev = () => {
        setCurrentTicketIndex(prevIndex =>
            prevIndex - 6 < 0 ? openTicket.length - 6 : prevIndex - 6
        )
    }

    const handleNext = () => {
        setCurrentTicketIndex(prevIndex => {
            return prevIndex + 6 >= openTicket.length ? 0 : prevIndex + 6
        })
    }

    const handleSalePrev = () => {
        setSaleTicketIndex(prevIndex =>
            prevIndex - 4 < 0 ? saleTicket.length - 5 : prevIndex - 5
        )
    }

    const handleSaleNext = () => {
        setSaleTicketIndex(prevIndex => {
            return prevIndex + 5 >= saleTicket.length ? 0 : prevIndex + 5
        })
    }
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext()
        }, 7000)
        return () => clearInterval(interval)
    }, [currentTicketIndex])

    useEffect(() => {
        const saleInterval = setInterval(() => {
            handleSaleNext()
        }, 7000)
        return () => clearInterval(saleInterval)
    }, [saleTicketIndex])

    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <Slide></Slide>
            </div>
            <div className={styles.view}>
                <div className={`${styles.ranking}`}>
                    <div className={styles.rankingTxt}>
                        <div className={styles.rTitle}>장르별 랭킹</div>
                        <div className={styles.rSubTitle}>
                            오늘 뭐볼까? 상위 TOP 5 !
                        </div>
                    </div>
                    <div className={styles.rankingCategory}>
                        <button
                            onClick={() => {
                                handleCategoryChange('musical')
                            }}
                            className={
                                currentCategory === 'musical'
                                    ? styles.sortActive
                                    : styles.sort
                            }
                        >
                            뮤지컬
                        </button>
                        <button
                            onClick={() => {
                                handleCategoryChange('concert')
                            }}
                            className={
                                currentCategory === 'concert'
                                    ? styles.sortActive
                                    : styles.sort
                            }
                        >
                            콘서트
                        </button>
                        <button
                            onClick={() => {
                                handleCategoryChange('sport')
                            }}
                            className={
                                currentCategory === 'sport'
                                    ? styles.sortActive
                                    : styles.sort
                            }
                        >
                            스포츠
                        </button>
                    </div>
                    <div className={styles.rankingImgs}>
                        {currentCategory === 'musical' &&
                            musical.map((item, index) => {
                                return (
                                    <div className={styles.rank} key={index}>
                                        <div className={styles.rankImg}>
                                            <h1 className={styles.rankNum}>
                                                {index + 1}
                                            </h1>
                                        </div>
                                        <div className={styles.rankTitle}>
                                            {item.title}
                                        </div>
                                        <div className={styles.rankSubTitle}>
                                            {item.subtitle}
                                        </div>
                                        <div className={styles.rankDate}>
                                            {item.writedate}
                                        </div>
                                        <div className={styles.rankSub}>
                                            <span>단독판매</span>
                                        </div>
                                    </div>
                                )
                            })}
                        {currentCategory === 'sport' &&
                            sport.map((item, index) => {
                                return (
                                    <div className={styles.rank} key={index}>
                                        <div className={styles.rankImg}>
                                            <h1 className={styles.rankNum}>
                                                {index + 1}
                                            </h1>
                                        </div>
                                        <div className={styles.rankTitle}>
                                            {item.title}
                                        </div>
                                        <div className={styles.rankSubTitle}>
                                            {item.subtitle}
                                        </div>
                                        <div className={styles.rankDate}>
                                            {item.writedate}
                                        </div>
                                        <div className={styles.rankSub}>
                                            <span>단독판매</span>
                                        </div>
                                    </div>
                                )
                            })}
                        {currentCategory === 'concert' &&
                            concert.map((item, index) => {
                                return (
                                    <div className={styles.rank} key={index}>
                                        <div className={styles.rankImg}>
                                            <h1 className={styles.rankNum}>
                                                {index + 1}
                                            </h1>
                                        </div>
                                        <div className={styles.rankTitle}>
                                            {item.title}
                                        </div>
                                        <div className={styles.rankSubTitle}>
                                            {item.subtitle}
                                        </div>
                                        <div className={styles.rankDate}>
                                            {item.writedate}
                                        </div>
                                        <div className={styles.rankSub}>
                                            <span>단독판매</span>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className={styles.tOpen}>
                    <h2 className={styles.oTitle}>
                        {/* <FontAwesomeIcon icon={faTicket} /> */}
                        티켓 오픈
                    </h2>
                    <div className={styles.oCarousel}>
                        <button
                            className={styles.prevButton}
                            onClick={handlePrev}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <div className={styles.oConts}>
                            {openTicket
                                .slice(
                                    currentTicketIndex,
                                    currentTicketIndex + 6
                                )
                                .map((item, index) => {
                                    return (
                                        <div
                                            className={styles.oCont}
                                            key={index}
                                        >
                                            <div className={styles.oImgs}></div>
                                            <div className={styles.oBox}>
                                                <div className={styles.badge}>
                                                    단독판매
                                                </div>
                                                <div className={styles.release}>
                                                    {item.release}
                                                </div>
                                                <div className={styles.title}>
                                                    {item.title}
                                                </div>
                                                <div
                                                    className={styles.subTitle}
                                                >
                                                    {item.subtitle}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                        <button
                            className={styles.nextButton}
                            onClick={handleNext}
                        >
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                </div>
                <div className={styles.sale}>
                    <h2 className={styles.sTitle}>지금 할인 중!</h2>
                    <div className={styles.sCarousel}>
                        <button
                            className={styles.prevButton}
                            onClick={handleSalePrev}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <div className={styles.sConts}>
                            {saleTicket
                                .slice(saleTicketIndex, saleTicketIndex + 5)
                                .map((item, index) => {
                                    return (
                                        <div
                                            className={styles.sCont}
                                            key={index}
                                        >
                                            <div className={styles.sImgs}></div>
                                            <div className={styles.sBox}>
                                                <div className={styles.sBadge}>
                                                    타임딜
                                                </div>
                                                <div className={styles.stitle}>
                                                    {item.title}
                                                </div>
                                                <div className={styles.splace}>
                                                    {item.place}
                                                </div>
                                                <div className={styles.sdate}>
                                                    {item.date}
                                                </div>
                                                <div
                                                    className={styles.sSubTitle}
                                                >
                                                    장지석 할인
                                                </div>
                                                <div className={styles.sSale}>
                                                    <div
                                                        className={styles.rate}
                                                    >
                                                        {item.rate}
                                                    </div>
                                                    <div
                                                        className={styles.price}
                                                    >
                                                        {item.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                        <button
                            className={styles.nextButton}
                            onClick={handleSaleNext}
                        >
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                </div>
                <div className={styles.review}>
                    <h2 className={styles.rTitle}>베스트 관람 후기</h2>
                    <div className={styles.rConts}>
                        {review.slice(0, maxList).map((item, index) => {
                            return (
                                <div key={index} className={styles.rTap}>
                                    <div className={styles.cTap}>
                                        <div className={styles.tapTxt}>
                                            <div className={styles.tapSubTxt}>
                                                {item.tapSubTxt}
                                            </div>
                                            <div className={styles.tapTitle}>
                                                {item.tapTitle}
                                            </div>
                                            <div className={styles.tapExplain}>
                                                {item.tapExplain}
                                            </div>
                                            <div className={styles.userInfo}>
                                                <div className={styles.userId}>
                                                    {item.userId}
                                                </div>
                                                <div>
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                        className={
                                                            styles.faStar
                                                        }
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                        className={
                                                            styles.faStar
                                                        }
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                        className={
                                                            styles.faStar
                                                        }
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                        className={
                                                            styles.faStar
                                                        }
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                        className={
                                                            styles.faStar
                                                        }
                                                    />
                                                </div>
                                                <div className={styles.score}>
                                                    {item.score}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.tapImg}></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {maxList < review.length && (
                        <div
                            className={styles.rMore}
                            onClick={() => {
                                setMaxList(prev => {
                                    return prev + 4
                                })
                            }}
                        >
                            관람후기 더보기
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
