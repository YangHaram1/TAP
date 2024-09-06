import { useLocation } from 'react-router-dom';
import styles from './Detail.module.css'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // solid 아이콘
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // regular 아이콘
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { url } from '../../../../config/config';
import { useState } from 'react';
import { Notice } from './Notice/Notice';
import { ProductData } from './ProductData/ProductData';
import { Casting } from './Casting/Casting';
import { Review } from './Review/Review';
import { Excite } from './Excite/Excite';


export const Detail = ()=>{

    const location = useLocation();
    const { seq } = location.state || {};  // 전달된 state가 있으면 가져옴
    const [tap, setTap] = useState(0);

    return(
        <div className={styles.container}>
            {/* <h1>Detail Page</h1>
            <p>Sequence: {seq}</p> */}
            <div className={styles.left}>
                {/* <h2>상품명</h2> */}
                <h2>상품명</h2>
                <div className={styles.header_data}>
                    <div className={styles.header_data_left}>
                        <img src={`${url}/31d8a1ec-913e-4808-8004-091734d77744`}></img>
                        <div className={styles.likes}>
                            {
                                'like' === 'like' 
                                ?<FontAwesomeIcon icon={regularHeart} />
                                :<FontAwesomeIcon icon={solidHeart} />

                            }
                            &nbsp; 관심등록</div>
                    </div>
                    <div className={styles.header_data_right}>
                        <div className={styles.datas}>
                            <div className={styles.data_title}>장소</div>
                            <div className={styles.data_content}>블루스퀘어홀</div>
                        </div>
                        <div className={styles.datas}>
                            <div className={styles.data_title}>공연기간</div>
                            <div className={styles.data_content}>2024.10.11 ~ 2024.10.30</div>
                        </div>
                        <div className={styles.datas}>
                            <div className={styles.data_title}>공연시간</div>
                            <div className={styles.data_content}>120분</div>
                        </div>
                        <div className={styles.datas}>
                            <div className={styles.data_title}>관람연령</div>
                            <div className={styles.data_content}>8세 이상</div>
                        </div>
                        <div className={styles.datas}>
                            <div className={styles.data_title}>가격</div>
                            <div className={styles.data_content}>
                                <div className={styles.data_sub_content}><span style={{color:"gray"}}>VIP석</span><span> &nbsp;140,000원</span></div>
                                <div className={styles.data_sub_content}><span style={{color:"gray"}}>R석</span><span> &nbsp; &nbsp; 140,000원</span></div>
                                <div className={styles.data_sub_content}><span style={{color:"gray"}}>S석</span><span> &nbsp; &nbsp; 140,000원</span></div>
                                <div className={styles.data_sub_content}><span style={{color:"gray"}}>A석</span><span> &nbsp; &nbsp; 140,000원</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            <div className={styles.btns}>
                <button onClick={()=>{setTap(0)}}>공지사항</button>
                <button onClick={()=>{setTap(1)}}>캐스팅정보</button>
                <button onClick={()=>{setTap(2)}}>판매정보</button>
                <button onClick={()=>{setTap(3)}}>관람후기 (0)</button>
                <button onClick={()=>{setTap(4)}}>기대평 (0)</button>
            </div>

            <div className={styles.detail_page}>
                {
                    tap === 1 ? <Casting/> :
                    tap === 2 ? <ProductData/> : 
                    tap === 3 ? <Review/> : 
                    tap === 4 ? <Excite/> : 
                    <Notice/>

                }
            </div>


            </div>
            <div className={styles.right}>
                <div className={styles.bubble}>
                    <div className={styles.text}><span style={{color:"purple", fontWeight:600, fontSize:"20px"}}>Step 1</span><span style={{fontWeight:600, fontSize:"19px"}}> 날짜 선택</span></div>
                    <div className={styles.calendar}>캘린더 들어갈 자리</div>
                    <div className={styles.time}>회차</div>
                    <div className={styles.seats}>잔여석</div>                
                </div>
            </div>
        </div>
    );

}