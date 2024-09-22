import React from 'react'
import styles from './Modal.module.css'
const Modal = ({ onClose, children }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {children}
                <button className={styles.closeButton} onClick={onClose}>
                    X
                </button>
            </div>
        </div>
    )
}
export default Modal
