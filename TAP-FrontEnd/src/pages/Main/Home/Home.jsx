// import { Caroucel } from '../../../components/Caroucel/Caroucel'
import styles from './Home.module.css'
import { useState } from 'react'
import { Caroucel } from '../../../components/Caroucel/Caroucel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faS, faStar } from '@fortawesome/free-solid-svg-icons'
import Slide from './Slide/Slide'
const Home = () => {
    const [images, setImages] = useState([])
    const [currentCategory, setCurrentCategory] = useState('musical')
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
                    <h2 className={styles.oTitle}>티켓 오픈</h2>
                    <div className={styles.oConts}>
                        <div className={styles.oImgs}></div>
                        <div className={styles.oBox}></div>
                    </div>
                </div>
                <div className={styles.sale}>
                    <h2 className={styles.sTitle}>지금 할인 중!</h2>

                    <div className={styles.sConts}>
                        {/* 카드 케러셀 */}
                        <Caroucel images={images} category={'art3'} />
                    </div>
                </div>
                <div className={styles.review}>
                    <h2 className={styles.rTitle}>베스트 관람 후기</h2>
                    <div className={styles.rConts}>
                        <div className={styles.rTap}>
                            <div className={styles.cTap}>
                                <div className={styles.tapTxt}>
                                    <div className={styles.tapSubTxt}>
                                        뮤지컬 '하데스타운' 한국 공연
                                    </div>
                                    <div className={styles.tapTitle}>
                                        그럼에도 우린 다시 부르리라
                                    </div>
                                    <div className={styles.tapExplain}>
                                        마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면,결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!
                                    </div>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userId}>
                                            minjoo
                                        </div>
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                        </div>
                                        <div>9.8</div>
                                    </div>
                                </div>
                                <div className={styles.tapImg}>img</div>
                            </div>
                            <div className={styles.cTap}>
                                <div className={styles.tapTxt}>
                                    <div className={styles.tapSubTxt}>
                                        뮤지컬 '하데스타운' 한국 공연
                                    </div>
                                    <div className={styles.tapTitle}>
                                        그럼에도 우린 다시 부르리라
                                    </div>
                                    <div className={styles.tapExplain}>
                                        마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면,결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!
                                    </div>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userId}>
                                            minjoo
                                        </div>
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                        </div>
                                        <div>9.8</div>
                                    </div>
                                </div>
                                <div className={styles.tapImg}>img</div>
                            </div>
                        </div>
                        <div className={styles.rTap}>
                            <div className={styles.cTap}>
                                <div className={styles.tapTxt}>
                                    <div className={styles.tapSubTxt}>
                                        뮤지컬 '하데스타운' 한국 공연
                                    </div>
                                    <div className={styles.tapTitle}>
                                        그럼에도 우린 다시 부르리라
                                    </div>
                                    <div className={styles.tapExplain}>
                                        마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면,결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!
                                    </div>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userId}>
                                            minjoo
                                        </div>
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                        </div>
                                        <div>9.8</div>
                                    </div>
                                </div>
                                <div className={styles.tapImg}>img</div>
                            </div>
                            <div className={styles.cTap}>
                                <div className={styles.tapTxt}>
                                    <div className={styles.tapSubTxt}>
                                        뮤지컬 '하데스타운' 한국 공연
                                    </div>
                                    <div className={styles.tapTitle}>
                                        그럼에도 우린 다시 부르리라
                                    </div>
                                    <div className={styles.tapExplain}>
                                        마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면,결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!
                                    </div>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userId}>
                                            minjoo
                                        </div>
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                        </div>
                                        <div>9.8</div>
                                    </div>
                                </div>
                                <div className={styles.tapImg}>img</div>
                            </div>
                        </div>
                        <div className={styles.rTap}>
                            <div className={styles.cTap}>
                                <div className={styles.tapTxt}>
                                    <div className={styles.tapSubTxt}>
                                        뮤지컬 '하데스타운' 한국 공연
                                    </div>
                                    <div className={styles.tapTitle}>
                                        그럼에도 우린 다시 부르리라
                                    </div>
                                    <div className={styles.tapExplain}>
                                        마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면,결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!
                                    </div>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userId}>
                                            minjoo
                                        </div>
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                        </div>
                                        <div>9.8</div>
                                    </div>
                                </div>
                                <div className={styles.tapImg}>img</div>
                            </div>
                            <div className={styles.cTap}>
                                <div className={styles.tapTxt}>
                                    <div className={styles.tapSubTxt}>
                                        뮤지컬 '하데스타운' 한국 공연
                                    </div>
                                    <div className={styles.tapTitle}>
                                        그럼에도 우린 다시 부르리라
                                    </div>
                                    <div className={styles.tapExplain}>
                                        마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면,결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!
                                    </div>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userId}>
                                            minjoo
                                        </div>
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                        </div>
                                        <div>9.8</div>
                                    </div>
                                </div>
                                <div className={styles.tapImg}>img</div>
                            </div>
                        </div>
                        <div className={styles.rTap}>
                            <div className={styles.cTap}>
                                <div className={styles.tapTxt}>
                                    <div className={styles.tapSubTxt}>
                                        뮤지컬 '하데스타운' 한국 공연
                                    </div>
                                    <div className={styles.tapTitle}>
                                        그럼에도 우린 다시 부르리라
                                    </div>
                                    <div className={styles.tapExplain}>
                                        마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면,결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!
                                    </div>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userId}>
                                            minjoo
                                        </div>
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                        </div>
                                        <div>9.8</div>
                                    </div>
                                </div>
                                <div className={styles.tapImg}>img</div>
                            </div>
                            <div className={styles.cTap}>
                                <div className={styles.tapTxt}>
                                    <div className={styles.tapSubTxt}>
                                        뮤지컬 '하데스타운' 한국 공연
                                    </div>
                                    <div className={styles.tapTitle}>
                                        그럼에도 우린 다시 부르리라
                                    </div>
                                    <div className={styles.tapExplain}>
                                        마지막의 헤르메스가 하는 말을 듣고 다시
                                        공연장을 찾으면,결말을 알면서도 이번에는
                                        다르길 바라면서 극을 봅니다. 그게
                                        하데스타운의 매력인것 같아요. 그럼에도
                                        우린 다시 부르리라!!
                                    </div>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userId}>
                                            minjoo
                                        </div>
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.faStar}
                                            />
                                        </div>
                                        <div>9.8</div>
                                    </div>
                                </div>
                                <div className={styles.tapImg}>img</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
