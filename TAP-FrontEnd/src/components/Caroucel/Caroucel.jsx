import React, { useEffect, useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import styles from './Caroucel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { url } from '../../config/config';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const Caroucel = ({category, images})=>{

    const navi = useNavigate();

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [settings, setSettings] = useState({
      chevronWidth: 40, // 버튼과 컨텐츠 간 간격
      numberOfCards: 5, // 한 번에 보여줄 카드 수
      height: 350 // 카드 높이
    });
    const [autoPlay, setAutoPlay] = useState(false); // 카드 1개씩 자동 넘김 (현재 3초당 1개씩 전환)
    // 만약 여러개의 카드를 넘기고 싶거나, 속도 조정필요시 setting2 if문으로 추가

    //setting1 useeffect ( 화면 출력 카드수, 카드 간격, 카드 높이)
    useEffect(() => {
      // console.log(category);
        if (category === "art1") {
          setSettings({
            chevronWidth: 40,
            numberOfCards: 4,
            height: 400
        });
        setAutoPlay(true);
        }else if(category === "art2" && category === "art3"){
          setSettings({
            chevronWidth: 40,
            numberOfCards: 5,
            height: 400
        });
        setAutoPlay(false);
        } else if (category === "sport") {
          setSettings({
            chevronWidth: 40,
            numberOfCards: 5,
            height: 350
        });
        setAutoPlay(true);
        }
        setActiveItemIndex(0);
      }, []); // category가 바뀔 때만 상태 업데이트

    //setting2 useeffect ( 카드 전환 설정)  
    useEffect(() => {
      if (autoPlay) {
        // console.log("category", category);
        const interval = setInterval(() => {
          setActiveItemIndex((prevIndex) => (prevIndex + 1) % images.length);
          // setActiveItemIndex((prevIndex) => (prevIndex + 1) % 7);
        }, 3000); // 1초마다 슬라이드 전환  
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
      }
    }, [autoPlay, images.length]);

    // 클릭 시 세부 페이지 이동 => 상품 번호만 보내주면 됨.
    const handleMove = (seq)=>{
      // console.log("상품번호", seq);
      navi("/detail", { state: { seq } });
    }

    if(category === "art1"){

        return (
            <div style={{ padding: `0 ${settings.chevronWidth}px` }}>
              <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={settings.numberOfCards} // 출력할 카드 수
                gutter={5} // 카드 간 간격
                leftChevron={<button className={styles.caroucel}><FontAwesomeIcon icon={faChevronLeft}/></button>} // 왼쪽 버튼 
                rightChevron={<button className={styles.caroucel}><FontAwesomeIcon icon={faChevronRight}/></button>} //오른쪽 버튼
                outsideChevron={false}
                chevronWidth={settings.chevronWidth}
                infiniteLoop={true} // 무제한 반복
              //   disableSwipe={true} // 스와이프 가능 유무
              >
                {
                  images.map((image)=>{
                    return(
                    <div key={image.application_seq} onClick={()=>{handleMove(`${image.application_seq}`)}} style={{ height: settings.height, background: `url(${image.files_sysname}) no-repeat center/cover`, color:'white' }} className={styles.card}>
                        <div className={styles.overlay}></div> {/* 오버레이 추가 */}
                        <h2 style={{overflow:"hidden",whiteSpace: "nowrap",textOverflow: "ellipsis", maxWidth: "300px" }}>{image.name}</h2>
                        <p>{image.place_name}</p>
                        <p>{format(new Date(image.start_date), 'yyyy.MM.dd')} - &nbsp; 
                        {format(new Date(image.end_date), 'yyyy.MM.dd')}</p>
                    </div>
                    );
                  }) 
                }
             
              </ItemsCarousel>
            </div>
          );

    }else if(category === "sport"){
      return (
        <div style={{ padding: `0 ${settings.chevronWidth}px` }}>
          <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={settings.numberOfCards} // 출력할 카드 수
            gutter={5} // 카드 간 간격
            leftChevron={<button className={styles.caroucel}><FontAwesomeIcon icon={faChevronLeft}/></button>} // 왼쪽 버튼 
            rightChevron={<button className={styles.caroucel}><FontAwesomeIcon icon={faChevronRight}/></button>} //오른쪽 버튼
            outsideChevron
            chevronWidth={settings.chevronWidth}
            infiniteLoop={true} // 무제한 반복
          //   disableSwipe={true} // 스와이프 가능 유무
          >
  
          <div style={{ height: settings.height, background: "url('/logo192.png') no-repeat center/cover" }} className={styles.card}>
              <h2>상품명</h2>
              <p>세종대학교 대양홀</p>
              <p>2024.09.04 - 2024.09.27</p>
          </div>

          </ItemsCarousel>
        </div>
      );
    }else if(category === "art2"){
      return (
          <div style={{ padding: `0 ${settings.chevronWidth}px` }}>
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={settings.numberOfCards} // 출력할 카드 수
              gutter={5} // 카드 간 간격
              leftChevron={<button className={styles.caroucel}><FontAwesomeIcon icon={faChevronLeft}/></button>} // 왼쪽 버튼 
                rightChevron={<button className={styles.caroucel}><FontAwesomeIcon icon={faChevronRight}/></button>} //오른쪽 버튼
              outsideChevron
              chevronWidth={settings.chevronWidth}
              infiniteLoop={false} // 무제한 반복
            >
    
            <div style={{ height: settings.height, marginTop:"20px"}} className={styles.card}>
                <div className={styles.poster}>
                  <img src={`${url}/musical/a52ee2d8-7191-435a-acb6-8d9e23e28c0d`}></img>
                </div>
                <p style={{fontSize:"18px", fontWeight:"600"}}>뮤지컬 &lt;킹키부츠&gt; </p>
                <p style={{marginBottom:"0"}}>캐러셀2-1</p>
                <p style={{marginTop:"0"}}>2024.09.04 - 2024.09.27</p>
                <p><span style={{color:"red", fontWeight:"600"}}>25% </span><span style={{fontWeight:"600"}}>52,500원</span></p>
            </div>
            </ItemsCarousel>
          </div>
        );

    }else if(category === "art3"){
      return (
          <div style={{ padding: `0 ${settings.chevronWidth}px` }}>
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={settings.numberOfCards} // 출력할 카드 수
              gutter={5} // 카드 간 간격
              leftChevron={<button className={styles.caroucel}><FontAwesomeIcon icon={faChevronLeft}/></button>} // 왼쪽 버튼 
                rightChevron={<button className={styles.caroucel}><FontAwesomeIcon icon={faChevronRight}/></button>} //오른쪽 버튼
              outsideChevron
              chevronWidth={settings.chevronWidth}
              infiniteLoop={false} // 무제한 반복
            >

            {
              images.map((image)=>{
                return(
                  <div key={image.application_seq} style={{ height: settings.height}} className={styles.card} onClick={()=>{handleMove(`${image.application_seq}`)}}> 
                    <div className={styles.poster}>
                      <img src={image.files_sysname}></img>
                    </div>
                    <p style={{color:"purple", fontWeight:"600", marginBottom:"0px",fontSize:"18px"}}>{format(new Date(image.start_date), 'MM.dd(EEE) HH:mm', { locale: ko })}</p>
                    <p style={{fontSize:"18px", fontWeight:"600", height:"25px", overflow:"hidden",whiteSpace: "nowrap",textOverflow: "ellipsis", maxWidth: "250px" }}>{image.name}</p>
                    <p>{image.place_name}</p>
                  </div>
                );
              })
            }
            </ItemsCarousel>
          </div>
        );

    }else{
        return (<p>홈으로 이동</p>);
    }

    
    
}