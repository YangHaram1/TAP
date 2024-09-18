import { useState } from 'react';
import styles from './ModalSale.module.css'
import { api } from '../../../../../../config/config';
import { useNavigate } from 'react-router-dom';

export const ModalSale = ({ onClose, applicationSeq }) => {
    const [rejectReason, setRejectReason] = useState(''); // 반려 사유 상태 관리
    const maxChars = 500;
    const navigate = useNavigate(); 

    const handleRejectConfirm = async () => {
        if (!rejectReason.trim()) {
            alert("반려 사유를 입력해 주세요.");
            return;
        }

        try {
            const response = await api.put(`/admin/products/sale/reject`, {
                application_seq: applicationSeq,
                reject_reason: rejectReason  // 반려 사유도 서버로 전달
            });

            if (response.status === 200) {
                alert("상품이 성공적으로 반려되었습니다.");
                onClose();  // 모달 닫기
                navigate('/products/apply'); 
            }
        } catch (error) {
            console.error('Error rejecting product:', error);
            alert("반려 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <div>
                <button className={styles.close} onClick={onClose}>X</button>
                </div>
                <div className="modal">
                    <p>해당 상품 (application_seq: {applicationSeq})의 할인 신청을 반려하시겠습니까?</p>
                    <textarea
                        className={styles.textarea}
                        placeholder="반려 사유를 입력해 주세요."
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)} // 반려 사유
                        maxLength={maxChars} 
                    />
                    <p>{rejectReason.length}/{maxChars} 글자</p> 
                    <button className={styles.btn} onClick={handleRejectConfirm}>확인</button>
                    <button className={styles.btn} onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};