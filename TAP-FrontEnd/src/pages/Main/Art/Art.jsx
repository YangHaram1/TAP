import { useEffect, useRef, useState } from 'react';
import { Caroucel } from '../../../components/Caroucel/Caroucel';
import styles from './Art.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { List } from './List/List';
import { api } from '../../../config/config';

export const Art = ({category})=>{

    // DB에 있는 카테고리 및 세부카테고리 불러오기
    const [genres, setGenres] = useState([]);
    // 탭에서 선택된 장르
    const [genre, setGenre] = useState('');

    console.log(category); // musical, concert
    // 메인 캐러셀 이미지 배열
    const [images, setImages] = useState([]);
    // 할인 캐러셀 이미지 배열 (category = musical일 때만 받아오기)
    const [discountContents, setDiscountContents] = useState([]);
    // 오픈 예정 캐러셀 이미지 배열
    const [openContents, setOpenContents] = useState([]);

    const btnsRef = useRef(null);


    useEffect(()=>{
        
        if(category === "musical"){
            // console.log("뮤지컬 정보 불러오기");
            category = 1;
        }else if(category === "concert"){
            // console.log("콘서트 정보 불러오기");
            category = 2;
        }else{
            console.log("잘못된 접근 확인 필요");
        }

        // 승인 받은 내역 추출 (추후 데이터 많아지면 오픈 예정 컨텐츠는 제외)
        api.get(`/artlist/${category}`)
        .then((resp)=>{
            console.log(resp.data);
            setImages(resp.data);
        })
        .catch((err)=>{
            console.log("데이터를 불러오지 못하는 중");
        })

        // 오픈 예정 리스트 추출
        api.get(`/artlist/openContents/${category}`)
        .then((resp)=>{
            console.log(resp.data);
            setOpenContents(resp.data);
        })
        .catch((err)=>{
            console.log("데이터를 불러오지 못하는 중");
        })

         // 장르 받아오기
         api.get(`/genre/${category}`)
         .then((resp)=>{
            //  console.log("장르받아오기 테스트",resp.data);
             setGenres(resp.data);
         })
         .catch(()=>{
             console.log("데이터를 불러오지 못하는 중");
         })

    },[category])
    

    // 스크롤 함수
    const scrollToBtns = () => {
        if (btnsRef.current) {
            window.scrollTo({
                top: btnsRef.current.offsetTop - 150, behavior: 'smooth'
            });
        }
    };

    return (
        <div className={styles.container}>
            
            {/* 카드 케러셀 */}
            <div className={styles.caroucel}>
                <Caroucel images={images} category={"art1"}/>
            </div>
            
            {/* 버튼 -> 아래 목록으로 이동*/} 
            <div className={styles.links}>
                <button onClick={()=>{setGenre(""); scrollToBtns();}}>전체보기 &nbsp; <FontAwesomeIcon icon={faChevronRight}/></button>
                {
                    genres.map((genre)=>{
                        return(
                            <button onClick={()=>{setGenre(genre.genre_seq); scrollToBtns();}}>{genre.genre_name} &nbsp; <FontAwesomeIcon icon={faChevronRight}/></button>
                        );
                    })
                }
            </div>

            {/* 이벤트 -> 할까 말까*/}
            {/* <div className={styles.event_box}>
                <div className={styles.event}>이벤트</div>
                <div className={styles.event}>넣을까</div>
                <div className={styles.event}>말까</div>
            </div> */}

            {/* 할인 정보 -> 뮤지컬 일 때만 출력 */}
            {/* {category === "musical"? */}

             {/* <h2>지금 할인 중!</h2>
             <div className={styles.saleEvent}>
                 <div className={styles.caroucel}>
                     <Caroucel images={images} category={"art2"}/>
                 </div>
             </div> */}
            

            {/* 오픈 정보*/}
            <h2>티켓 오픈</h2>
            <div className={styles.saleEvent}>
                {/* 카드 케러셀 */}
                { openContents.length > 0 
                ? <Caroucel images={openContents} category={"art3"}/>
                : <div className={styles.nonContents}>
                    <h3 style={{textAlign:"center"}}> 현재 오픈 예정된 {category === "musical"?"뮤지컬이":"콘서트가"}  없습니다.</h3>
                </div>
                }
            </div>

            {/* 뮤지컬 둘러보기 정보*/}
            <h2 style={{marginTop:"50px"}} ref={btnsRef}>{category ==="musical"?"뮤지컬":"콘서트"} 둘러보기</h2>
            <div className={styles.btns}>
                <button onClick={()=>{setGenre("")}}>전체</button>
                {
                    genres.map((genre)=>{
                        return(
                            <button onClick={()=>{setGenre(genre.genre_seq)}}>{genre.genre_name}</button>
                        );
                    })
                }
            </div>
            <hr className={styles.art_hr}></hr>
            {/* 버튼이 눌릴 때마다 genre 값이 바뀌면서 검색 내용 불러오기 */}
            <List genre={genre} category={category}/>
        </div>
    );

}