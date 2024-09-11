import styles from './ModalReject.module.css';

export const ModalReject =({show, onClose, rejectionReason}) =>{
    if(!show) return null;

    return(
        <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2>반려 사유</h2>
          <p>{rejectionReason}</p>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    )
}