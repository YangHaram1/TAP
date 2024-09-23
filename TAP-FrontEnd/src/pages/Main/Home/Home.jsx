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
import { api } from '../../../config/config'
import { format } from 'date-fns';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'; // solid 아이콘
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'; // regular 아이콘
import { faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons'; // 반별
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [images, setImages] = useState([])
    const [currentCategory, setCurrentCategory] = useState('musical')
    const [currentTicketIndex, setCurrentTicketIndex] = useState(0)
    const [saleTicketIndex, setSaleTicketIndex] = useState(0)
    const [maxList, setMaxList] = useState(4)
    const [openList,setOepnList] = useState([]);
    const [reviewList,setReviewList] = useState([]);
    const [musicalList, setMusicalList] = useState([]);
    const [concertList, setConcertList] = useState([]);
    const navi = useNavigate();

    const handleCategoryChange = category => {
        setCurrentCategory(category)
    }

    useState(()=>{
        api.get(`/artlist/getHomeData`)
        .then((resp)=>{
            console.log("홈 목록",resp.data);
            setOepnList(resp.data.openList);
            setReviewList(resp.data.reviewList);
            setConcertList(resp.data.concertList);
            setMusicalList(resp.data.musicalList);
        })
        .catch((err)=>{

        })
    },[])

    const [musical, setMusical] = useState([
        {
            title: ' 뮤지컬 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        }
    ])

    const [sport, setSport] = useState([
        {
            title: '스포츠 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        }
    ])

    const [concert, setConcert] = useState([
        {
            title: '콘서트 킹키부츠',
            subtitle: '블루스퀘어 신한카드홀',
            writedate: '2024.9.7 ~ 11.10',
        }
    ])

    const [saleTicket, setSaleTicket] = useState([
        {
            title: '뮤지컬 〈장수탕 선녀님〉 - 서울숲',
            place: '서울숲 씨어터 2관',
            date: '2024.0.0~2024.09.09',
            rate: '83%',
            price: '33,000원',
        },
        
    ])

    const handlePrev = () => {
        setCurrentTicketIndex(prevIndex =>
            prevIndex - 6 < 0 ? openList.length - 6 : prevIndex - 6
        )
    }

    const handleNext = () => {
        setCurrentTicketIndex(prevIndex => {
            return prevIndex + 6 >= openList.length ? 0 : prevIndex + 6
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


    const renderStars = (starsAvg) => {
        const stars = [];
        const fullStars = Math.floor(starsAvg); // 꽉 찬 별 개수
        const hasHalfStar = starsAvg - fullStars >= 0.5; // 반 별 여부
    
        // 꽉 찬 별 추가
        for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon icon={solidStar} key={`full-${i}`} color="#FFD700"/>);
        }
    
        // 반 별 추가 (있다면)
        if (hasHalfStar) {
        stars.push(<FontAwesomeIcon icon={halfStar} key="half" color="#FFD700"/>);
        }
    
        // 빈 별 추가
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
        stars.push(<FontAwesomeIcon icon={regularStar} key={`empty-${i}`} color="#FFD700" />);
        }
    
        return stars;
    };

    const handleMove = (seq)=>{
        // console.log("상품번호", seq);
        navi("/detail", { state: { seq } });
      }


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
                        {/* <button
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
                        </button> */}
                    </div>
                    <div className={styles.rankingImgs}>
                        {currentCategory === 'musical' &&
                            musicalList.map((item, index) => {
                                return (
                                    <div className={styles.rank} key={index}>
                                        <div className={styles.rankImg} style={{background: `url(${item.files_sysname}) no-repeat center/cover`}}>
                                            <h1 className={styles.rankNum}>
                                                {index + 1}
                                            </h1>
                                        </div>
                                        <div className={styles.rankTitle}>
                                            {item.name}
                                        </div>
                                        <div className={styles.rankSubTitle}>
                                            {item.place_name}
                                        </div>
                                        <div className={styles.rankDate}>

                                            {(() => {
                                                const date = new Date(item.start_date);
                                                return isNaN(date) ? "Invalid Date"+ item.start_date+"1" : format(date, 'yyyy.MM.dd');
                                            })()}
                                            &nbsp; - &nbsp;
                                            {(() => {
                                                const date = new Date(item.end_date);
                                                return isNaN(date) ? "Invalid Date"+ item.start_date+"1" : format(date, 'yyyy.MM.dd');
                                            })()}
                                    
                                        </div>
                                        {/* <div className={styles.rankSub}>
                                            <span>단독판매</span>
                                        </div> */}
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
                                            {item.name}
                                        </div>
                                        <div className={styles.rankSubTitle}>
                                            {item.place_name}
                                        </div>
                                        <div className={styles.rankDate}>
                                        {format(new Date(item.start_date), 'yyyy.MM.dd')}
                                            &nbsp; - &nbsp;
                                            {format(new Date(item.end_date), 'yyyy.MM.dd')}
                                        </div>
                                        {/* <div className={styles.rankSub}>
                                            <span>단독판매</span>
                                        </div> */}
                                    </div>
                                )
                            })}
                        {currentCategory === 'concert' &&
                            concertList.map((item, index) => {
                                return (
                                    <div className={styles.rank} key={index}>
                                        <div className={styles.rankImg} style={{background: `url(${item.files_sysname}) no-repeat center/cover`}}>
                                            <h1 className={styles.rankNum}>
                                                {index + 1}
                                            </h1>
                                        </div>
                                        <div className={styles.rankTitle}>
                                            {item.name}
                                        </div>
                                        <div className={styles.rankSubTitle}>
                                            {item.place_name}
                                        </div>
                                        <div className={styles.rankDate}>
                                            {(() => {
                                                const date = new Date(item.start_date);
                                                return isNaN(date) ? "Invalid Date"+ item.start_date+"1" : format(date, 'yyyy.MM.dd');
                                            })()}
                                            &nbsp; - &nbsp;
                                            {(() => {
                                                const date = new Date(item.end_date);
                                                return isNaN(date) ? "Invalid Date"+ item.start_date+"1" : format(date, 'yyyy.MM.dd');
                                            })()}
                                        </div>
                                        {/* <div className={styles.rankSub}>
                                            <span>단독판매</span>
                                        </div> */}
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className={styles.tOpen}>
                    <h2 className={styles.oTitle}>
                        {/* <FontAwesomeIcon icon={faTicket} /> */}
                        티켓 오픈 예정
                    </h2>
                    <div className={styles.oCarousel}>
                        <button
                            className={styles.prevButton}
                            onClick={handlePrev}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <div className={styles.oConts} >
                            {openList.slice(currentTicketIndex,currentTicketIndex + 6)
                                .map((item, index) => {
                                    return (
                                        <div className={styles.oCont} key={index} onClick={()=>{handleMove(`${item.application_seq}`)}}>
                                            <div className={styles.oImgs}>
                                                <img src={item.files_sysname}/>
                                            </div>
                                            <div className={styles.oBox}>
                                                {/* <div className={styles.badge}>
                                                    단독판매
                                                </div> */}
                                                <div className={styles.release}>
                                                {format(new Date(item.open_date), 'yyyy.MM.dd')}
                                                </div>
                                                <div className={styles.title}>
                                                    {item.name}
                                                </div>
                                                <div
                                                    className={styles.subTitle}
                                                >
                                                    {item.place_name}
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
                {/* <div className={styles.sale}>
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
                </div> */}
                <div className={styles.review}>
                    <h2 className={styles.rTitle}>베스트 관람 후기</h2>
                    <div className={styles.rConts}>
                        {reviewList.slice(0, maxList).map((item, index) => {
                            return (
                                <div key={index} className={styles.rTap}>
                                    <div className={styles.cTap}>
                                        <div className={styles.tapTxt}>
                                            <div className={styles.tapSubTxt}>
                                                {item.name}
                                            </div>
                                            <div className={styles.tapTitle}>
                                                {item.review_title}
                                            </div>
                                            <div className={styles.tapExplain}>
                                                {item.review}
                                            </div>
                                            <div className={styles.userInfo}>
                                                <div className={styles.userId}>
                                                    {item.member_id}
                                                </div>
                                                <div>
                                                    {renderStars(item.stars)}
                                                </div>
                                                <div className={styles.score}>
                                                    {item.stars}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.tapImg}>
                                            <img src={item.files_sysname}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {maxList < reviewList.length && (
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
