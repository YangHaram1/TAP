import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../../store/store';
import styles from './Popup.module.css';
import { api } from '../../../config/config';

const Popup = ({ onClose, application_seq }) => {
  const { loginID, isAuth } = useAuthStore(); // 로그인 정보 가져오기
  const [description, setDescription] = useState(''); // 상품 공지사항 저장하기
  const [loading, setLoading] = useState(true);

  const fetchDescription = async () => {
    try {
      const response = await api.get(`/admin/products/event_popup?application_seq=${application_seq}`);

      if (response.status === 204) {
        // 데이터가 없으면 팝업 표시 안 함
        onClose();
        return;
      }

      setDescription(response.data); // HTML 데이터를 그대로 사용
      setLoading(false);
    } catch (error) {
      console.error('Error fetching description:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDescription(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, [application_seq]);

  const handleDoNotShowToday = () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 오늘 날짜 저장

    if (loginID && isAuth) {
      console.log("로컬 로그인 o", loginID);
      localStorage.setItem(`hidePopup_${loginID}_${application_seq}`, today); // 로그인 사용자는 loginID 기반으로 저장
    } else {
      console.log("로컬 로그인 x");
      localStorage.setItem(`hidePopup_guest_${application_seq}`, today); // 비로그인 사용자는 guest로 저장
    }

    onClose(); // 팝업 닫기
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.popupBody}>
          <h2 className={styles.leftAlign}>예매 안내</h2> {/* h2 왼쪽 정렬 */}
          <hr />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className={styles.descriptionText} dangerouslySetInnerHTML={{ __html: description }} />
          )}
          <div className={styles.checkboxContainer}>
            <button className={styles.doNotShowButton} onClick={handleDoNotShowToday}>
              오늘 하루 보지 않기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
