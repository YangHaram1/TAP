import { useState } from 'react';
import { Caroucel } from '../../../components/Caroucel/Caroucel';
import styles from './Art.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { List } from './List/List';

export const Art = ({category})=>{

    const [genre, setGenre] = useState('');

    console.log(category); // musical, concert
    const [images, setImages] = useState([]);

    if(category === "musical"){
        console.log("뮤지컬 정보 불러오기");
    }else if(category === "concert"){
        console.log("콘서트 정보 불러오기");
    }else{
        console.log("잘못된 접근 확인 필요");
    }

    return (
        <div className={styles.container}>
            
            {/* 카드 케러셀 */}
            <div className={styles.caroucel}>
                <Caroucel images={images} category={"art1"}/>
            </div>
            
            {/* 버튼 -> 아래 목록으로 이동*/} 
            {category === "musical"?
            <div className={styles.links}>
                <button>전체보기 &nbsp; <FontAwesomeIcon icon={faChevronRight}/></button>
                <button>내한공연 &nbsp; <FontAwesomeIcon icon={faChevronRight}/></button>
                <button>라이선스 &nbsp; <FontAwesomeIcon icon={faChevronRight}/></button>
                <button>창작뮤지컬 &nbsp; <FontAwesomeIcon icon={faChevronRight}/></button>
            </div> :
             category === "concert"?
             <div className={styles.links}>
                <button>전체보기 &nbsp; <FontAwesomeIcon icon={faChevronRight}/></button>
                <button>발라드 &nbsp; <FontAwesomeIcon icon={faChevronRight}/></button>
                <button>내한공연 &nbsp; <FontAwesomeIcon icon={faChevronRight}/></button>
                <button>팬미팅 &nbsp; <FontAwesomeIcon icon={faChevronRight}/></button>
             </div> :
             <div className={styles.links}>옳지 않은 접근</div>    
            }

            {/* 이벤트 -> 할까 말까*/}
            <div className={styles.event_box}>
                <div className={styles.event}>이벤트</div>
                <div className={styles.event}>넣을까</div>
                <div className={styles.event}>말까</div>
            </div>

            {/* 할인 정보 -> 뮤지컬 일 때만 출력 */}
            {category === "musical"?
            <><h2>지금 할인 중!</h2>
            <div className={styles.saleEvent}>
                {/* 카드 케러셀 */}
                <div className={styles.caroucel}>
                    <Caroucel images={images} category={"art2"}/>
                </div>
            </div></>
            :<></>}

            {/* 오픈 정보*/}
            <h2>티켓 오픈</h2>
            <div className={styles.saleEvent}>
                {/* 카드 케러셀 */}
                <Caroucel images={images} category={"art3"}/>
            </div>

            {/* 뮤지컬 둘러보기 정보*/}
            <h2 style={{marginTop:"50px"}}>{category ==="musical"?"뮤지컬":"콘서트"} 둘러보기</h2>
            { category === "musical"
                ?<div className={styles.btns}>
                <button onClick={()=>{setGenre("")}}>전체</button>
                <button onClick={()=>{setGenre("1")}}>오리지널/내한</button>
                <button onClick={()=>{setGenre("2")}}>라이선스</button>
                <button onClick={()=>{setGenre("3")}}>창작뮤지컬</button>
                </div>
                :<div className={styles.btns}>
                <button onClick={()=>{setGenre("")}}>전체</button>
                <button onClick={()=>{setGenre("4")}}>발라드</button>
                <button onClick={()=>{setGenre("5")}}>내한공연</button>
                <button onClick={()=>{setGenre("6")}}>팬클럽/팬미팅</button>
                </div>
            }

            <hr className={styles.art_hr}></hr>
            {/* 버튼이 눌릴 때마다 genre 값이 바뀌면서 검색 내용 불러오기 */}
            <List genre={genre} category={category}/>
        </div>
    );

}