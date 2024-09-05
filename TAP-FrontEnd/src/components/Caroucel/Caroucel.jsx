import React, { useEffect, useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import styles from './Caroucel.module.css';

export const Caroucel = ({category, images})=>{

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [chevronWidth, setChevronWidth] = useState(0); // 버튼과 컨텐츠 간 간격
    const [numberOfCards, setNumberOfCards] = useState(0); // 한 번에 보여줄 카드 수
    const [height, setHeight] = useState(0); //카드 높이

    //setting
    useEffect(() => {
        if (category === "art") {
          setChevronWidth(50);
          setNumberOfCards(5);
          setHeight(350);
        } else if (category === "sport") {
          setChevronWidth(50);
          setNumberOfCards(5);
          setHeight(300);
        }
      }, [category]); // category가 바뀔 때만 상태 업데이트

    useEffect(() => {
        const interval = setInterval(() => {
        //   setActiveItemIndex((prevIndex) => (prevIndex + 1) % images.length);
          setActiveItemIndex((prevIndex) => (prevIndex + 1) % 7);
        }, 3000); // 1초마다 슬라이드 전환
    
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
    }, [images.length]);

    if(category === "art"){

        return (
            <div style={{ padding: `0 ${chevronWidth}px` }}>
              <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={numberOfCards} // 출력할 카드 수
                gutter={5} // 카드 간 간격
                leftChevron={<button>{'<'}</button>} // 왼쪽 버튼 
                rightChevron={<button>{'>'}</button>} //오른쪽 버튼
                outsideChevron
                chevronWidth={chevronWidth}
                infiniteLoop={true} // 무제한 반복
              //   disableSwipe={true} // 스와이프 가능 유무
              >
      
              <a href='#'>
              <div style={{ height: height, background: "url('/logo192.png') no-repeat center/cover" }} className={styles.card}>
                  <h2>상품명</h2>
                  <p>세종대학교 대양홀</p>
                  <p>2024.09.04 - 2024.09.27</p>
              </div>
              </a>
              <a href='#'>
              <div style={{ height: height, background: "url('/logo192.png') no-repeat center/cover" }} className={styles.card}>
                  <h2>상품명</h2>
                  <p>세종대학교 대양홀</p>
                  <p>2024.09.04 - 2024.09.27</p>
              </div>
              </a>
              <a href='#'>
              <div style={{ height: height, background: "url('/logo192.png') no-repeat center/cover" }} className={styles.card}>
                  <h2>상품명</h2>
                  <p>세종대학교 대양홀</p>
                  <p>2024.09.04 - 2024.09.27</p>
              </div>
              </a>
              <a href='#'>
              <div style={{ height: height, background: "url('/logo192.png') no-repeat center/cover" }} className={styles.card}>
                  <h2>상품명</h2>
                  <p>세종대학교 대양홀</p>
                  <p>2024.09.04 - 2024.09.27</p>
              </div>
              </a>
              <a href='#'>
              <div style={{ height: height, background: "url('/logo192.png') no-repeat center/cover" }} className={styles.card}>
                  <h2>상품명</h2>
                  <p>세종대학교 대양홀</p>
                  <p>2024.09.04 - 2024.09.27</p>
              </div>
              </a>
              <a href='#'>
              <div style={{ height: height, background: "url('/logo192.png') no-repeat center/cover" }} className={styles.card}>
                  <h2>상품명</h2>
                  <p>세종대학교 대양홀</p>
                  <p>2024.09.04 - 2024.09.27</p>
              </div>
              </a>
              </ItemsCarousel>
            </div>
          );

    }else if(category === "sport"){
        
        return (
            <div style={{ padding: `0 ${chevronWidth}px` }}>
              <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={numberOfCards} // 출력할 카드 수
                gutter={5} // 카드 간 간격
                leftChevron={<button>{'<'}</button>} // 왼쪽 버튼 
                rightChevron={<button>{'>'}</button>} //오른쪽 버튼
                outsideChevron
                chevronWidth={chevronWidth}
                infiniteLoop={true} // 무제한 반복
              //   disableSwipe={true} // 스와이프 가능 유무
              >
      
              <a href='#'>
              <div style={{ height: height, background: "url('/logo192.png') no-repeat center/cover" }} className={styles.card}>
                  <h2>상품명</h2>
                  <p>세종대학교 대양홀</p>
                  <p>2024.09.04 - 2024.09.27</p>
              </div>
              </a>
              <a href='#'>
              <div style={{ height: height, background: "url('/logo192.png') no-repeat center/cover" }} className={styles.card}>
                  <h2>상품명</h2>
                  <p>세종대학교 대양홀</p>
                  <p>2024.09.04 - 2024.09.27</p>
              </div>
              </a>
              <a href='#'>
              <div style={{ height: height, background: "url('/logo192.png') no-repeat center/cover" }} className={styles.card}>
                  <h2>상품명</h2>
                  <p>세종대학교 대양홀</p>
                  <p>2024.09.04 - 2024.09.27</p>
              </div>
              </a>
              <a href='#'>
              <div style={{ height: height, background: "url('/logo192.png') no-repeat center/cover" }} className={styles.card}>
                  <h2>상품명</h2>
                  <p>세종대학교 대양홀</p>
                  <p>2024.09.04 - 2024.09.27</p>
              </div>
              </a>
              <a href='#'>
              <div style={{ height: height, background: "url('/logo192.png') no-repeat center/cover" }} className={styles.card}>
                  <h2>상품명</h2>
                  <p>세종대학교 대양홀</p>
                  <p>2024.09.04 - 2024.09.27</p>
              </div>
              </a>
              <a href='#'>
              <div style={{ height: height, background: "url('/logo192.png') no-repeat center/cover" }} className={styles.card}>
                  <h2>상품명</h2>
                  <p>세종대학교 대양홀</p>
                  <p>2024.09.04 - 2024.09.27</p>
              </div>
              </a>
              </ItemsCarousel>
            </div>
          );
    }else{
        return (<p>홈으로 이동</p>);
    }

    
    
}