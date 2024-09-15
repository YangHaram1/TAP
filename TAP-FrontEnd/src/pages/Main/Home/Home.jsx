// import { Caroucel } from '../../../components/Caroucel/Caroucel'
import styles from './Home.module.css'
import { useState } from 'react'
import { Caroucel } from '../../../components/Caroucel/Caroucel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faS, faStar } from '@fortawesome/free-solid-svg-icons'
import Slide from './Slide/Slide'
const Home = () => {
    const [images, setImages] = useState([])
    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <Slide></Slide>
            </div>
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
            <div className={styles.tOpen}>
                <h2 className={styles.oTitle}>티켓 오픈</h2>
                <div className={styles.oConts}>
                    {/* 카드 케러셀 */}
                    <Caroucel images={images} category={'art3'} />
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
                                    하데스타운의 매력인것 같아요. 그럼에도 우린
                                    다시 부르리라!!
                                </div>
                                <div className={styles.userInfo}>
                                    <div className={styles.userId}>minjoo</div>
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
                                    하데스타운의 매력인것 같아요. 그럼에도 우린
                                    다시 부르리라!!
                                </div>
                                <div className={styles.userInfo}>
                                    <div className={styles.userId}>minjoo</div>
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
                                    하데스타운의 매력인것 같아요. 그럼에도 우린
                                    다시 부르리라!!
                                </div>
                                <div className={styles.userInfo}>
                                    <div className={styles.userId}>minjoo</div>
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
                                    하데스타운의 매력인것 같아요. 그럼에도 우린
                                    다시 부르리라!!
                                </div>
                                <div className={styles.userInfo}>
                                    <div className={styles.userId}>minjoo</div>
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
                                    하데스타운의 매력인것 같아요. 그럼에도 우린
                                    다시 부르리라!!
                                </div>
                                <div className={styles.userInfo}>
                                    <div className={styles.userId}>minjoo</div>
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
                                    하데스타운의 매력인것 같아요. 그럼에도 우린
                                    다시 부르리라!!
                                </div>
                                <div className={styles.userInfo}>
                                    <div className={styles.userId}>minjoo</div>
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
                                    하데스타운의 매력인것 같아요. 그럼에도 우린
                                    다시 부르리라!!
                                </div>
                                <div className={styles.userInfo}>
                                    <div className={styles.userId}>minjoo</div>
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
                                    하데스타운의 매력인것 같아요. 그럼에도 우린
                                    다시 부르리라!!
                                </div>
                                <div className={styles.userInfo}>
                                    <div className={styles.userId}>minjoo</div>
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
    )
}

export default Home
