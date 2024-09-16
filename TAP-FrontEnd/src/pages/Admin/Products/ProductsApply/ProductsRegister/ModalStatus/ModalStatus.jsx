import { useState } from "react";
import styles from './ModalStatus.module.css'

export const ModalStatus = ({ setIsModalOpen, onConfirm, onReject, productName }) => {
    const [rejectionReason, setRejectionReason] = useState(""); // 반려 사유 상태 관리
    const closeModal = () => setIsModalOpen(false);
    return (
        <div className={styles.container}>
            <div className={styles.container}>
                <h2>상품 상태 변경</h2>
                <div className={styles.p}>{productName} 상품을 승인하시겠습니까?</div>
                <div className={styles.modalActions}>
                    <button className={styles.cancelButton} onClick={closeModal}>
                        취소
                    </button>
                    <button className={styles.confirmButton} onClick={onConfirm}>
                        승인
                    </button>
                </div>

                <div className={styles.rejectSection}>
                    <h3>반려 사유</h3>
                    <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="반려 사유를 입력하세요"
                    />
                    <button
                        className={styles.rejectButton}
                        onClick={() => onReject(rejectionReason)}
                        disabled={!rejectionReason} // 반려 사유가 없으면 버튼 비활성화
                    >
                        반려
                    </button>
                </div>
            </div>
        </div>
    );
};