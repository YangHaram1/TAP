import { useState } from 'react';
import styles from './ModalBiz.module.css';
import { api } from '../../../../../config/config';

export const ModalBiz = ({ resetCheckboxes, checkedOrders, onClose, fetchOrders  }) => {
    const [newStatus, setNewStatus] = useState('발송'); // 기본값을 '발송'으로 설정

    // 주문 상태 변경 요청 함수
    const updateOrderStatus = async () => {
        console.log('선택된 기업 승인 대기 번호:', checkedOrders); // checkedOrders 값 확인

        try {
            // 선택된 주문 번호를 서버로 전송하여 상태를 "발송 완료"로 업데이트
            const response = await api.put('/admin/bizmem/update_status', {
                orderSeqs: checkedOrders, // 체크된 주문 목록
                newStatus: '발송 완료' // 상태를 "발송 완료"로 고정
            });

            if (response.status === 200) {
                alert('기업 회원 가입이 승인되었습니다.');
                resetCheckboxes(); // 체크박스 리셋
                onClose(); // 모달 닫기
                fetchOrders();
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('주문 상태 업데이트 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                기업 가입 승인 처리
            </div>
            <div className={styles.subtitle}>
                {checkedOrders.length}개의 가입 승인 대기 기업회원에 대해서
            </div>
            <div className={styles.changeStatus}>
                <div className={styles.statusTitle}>
                    상태 변경:
                </div>
                <div className={styles.statusSelect}>
                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                        <option value="welcome">가입 승인</option>
                    </select>
                </div>
            </div>
            <div className={styles.btnstyle}>
                <button className={styles.save} onClick={updateOrderStatus}>
                    저장
                </button>
                <button className={styles.cancel} onClick={onClose}>
                    취소
                </button>
            </div>
        </div>
    );
};
