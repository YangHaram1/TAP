import { useState } from 'react';
import styles from './ModalStatus.module.css';
import { api } from '../../../../../../config/config';

export const ModalStatus = ({ onClose, applicationSeq }) => {
    const [rejectReason, setRejectReason] = useState(''); // 반려 사유 상태 관리

    const handleRejectConfirm = async () => {
        if (!rejectReason.trim()) {
            alert("반려 사유를 입력해 주세요.");
            return;
        }

        try {
            const response = await api.put(`/admin/products/apply/reject`, {
                application_seq: applicationSeq,
                reject_reason: rejectReason  // 반려 사유도 서버로 전달
            });

            if (response.status === 200) {
                alert("상품이 성공적으로 반려되었습니다.");
                onClose();  // 모달 닫기
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
                    <p>해당 상품 (application_seq: {applicationSeq})을 반려하시겠습니까?</p>
                    <textarea
                        className={styles.textarea}
                        placeholder="반려 사유를 입력해 주세요."
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)} // 반려 사유 업데이트
                    />
                    <button className={styles.btn} onClick={handleRejectConfirm}>확인</button>
                    <button className={styles.btn} onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};