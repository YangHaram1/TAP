import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../../store/store';
import styles from './Popup.module.css'
import { api } from '../../../config/config';

const Popup = ({ onClose }) => {
  const { loginID } = useAuthStore(); // 로그인 정보 가져오기
  const [description, setDescription] = useState(''); // 상품 공지사항 저장하기
  const [loading, setLoading] = useState(true);

    // HTML 태그 제거 함수
    const stripHTML = (html) => {
        return html.replace(/<\/?[^>]+(>|$)/g, ""); // 정규 표현식을 사용하여 태그 제거
      };

// 상품 공지사항 가져오기 
const fetchDescription = async () => {
    try {
        const response = await api.get(`/admin/products/event_popup?application_seq=1016`);
        setDescription(stripHTML(response.data));
        setLoading(false);
    } catch (error) {
        console.error('Error description:', error);
        setLoading(false);
    }
};


useEffect(() => {
    fetchDescription(); // 컴포넌트가 마운트될 때 데이터 가져오기
}, []);

  const handleDoNotShowToday = () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 오늘 날짜 저장

    if (loginID) {
      localStorage.setItem(`hidePopup_${loginID}`, today); // 로그인 사용자는 loginID 기반으로 저장
    } else {
      localStorage.setItem('hidePopup_guest', today); // 비로그인 사용자는 guest로 저장
    }

    onClose(); // 팝업 닫기
  };

  return (
    <div className={styles.overlay} >
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <div className={styles.popupBody}>
          <h2>Popup Window</h2>
          {loading ? (
            <p>Loading...</p> 
          ) : (
            <p>{description}</p> // 가져온 데이터를 화면에 표시
          )}
          <button className={styles.doNotShowButton} onClick={handleDoNotShowToday}>
            오늘 하루 보지 않기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
