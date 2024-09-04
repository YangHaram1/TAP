import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';

export const Caroucel = ()=>{
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40; // 버튼과 컨텐츠 간 간격
    
    return (
      <div style={{ padding: `0 ${chevronWidth}px` }}>
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={5} // 출력할 카드 수
          gutter={30} // 카드 간 간격
          leftChevron={<button>{'<'}</button>} // 왼쪽 버튼 
          rightChevron={<button>{'>'}</button>} //오른쪽 버튼
          outsideChevron
          chevronWidth={chevronWidth}
          infiniteLoop={true} // 무제한 반복
          disableSwipe={true} // 스와이프 가능 유무
        >
          <div style={{ height: 200, background: '#EEE' }}>First card</div>
          <div style={{ height: 200, background: '#EEE' }}>Second card</div>
          <div style={{ height: 200, background: '#EEE' }}>Third card</div>
          <div style={{ height: 200, background: '#EEE' }}>1 card</div>
          <div style={{ height: 200, background: '#EEE' }}>2 card</div>
          <div style={{ height: 200, background: '#EEE' }}>4 card</div>
          <div style={{ height: 200, background: '#EEE' }}>5 card</div>
        </ItemsCarousel>
      </div>
    );
}