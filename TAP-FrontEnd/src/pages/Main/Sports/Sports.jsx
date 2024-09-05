// src/components/Sports.jsx

import React from 'react';
import { Silde } from './Silde/Silde';

export const Sports = () => {
  return (
    <div style={{ display: 'flex', height: '50vh' }}>
      <div style={{
        flex: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
        <Silde
          images={['/logo192.png', '/logo192.png', '/logo512.png']}
          interval={3000} // 슬라이더의 이미지 전환 간격 설정 (예: 3000ms)
          onImageClick={(index) => console.log('Clicked image index:', index)}
        />
      </div>
    </div>
  );
};
