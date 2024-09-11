import { useState } from 'react';
import styles from './BookModal.module.css';
import { PreventMacro } from './PreventMacro/PreventMacro';

export const BookModal = ({ isOpen, onClose }) =>{

    const [macroModal, setMacroModal] = useState(true);

    // const isMacroModalOpen = ()=>{
    //     setMacroModal(true);
    // }

    const closeMacroModal=()=>{
        setMacroModal(false);
    }

    // BookModal 모달을 닫을 때, PreventMacro 모달도 초기화
    const handleCloseBookModal = () => {
        setMacroModal(true);   // PreventMacro 모달을 다시 열리도록 상태 초기화
        onClose();             // 부모로부터 받은 onClose로 BookModal 닫음
    }

    if (!isOpen) return null;

    return(
        <div className={styles.overlay}>
            {/* PreventMacro 모달이 열려있을 때만 렌더링 */}
            {macroModal && <PreventMacro onClose={closeMacroModal} />}
            
            {!macroModal && (
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.closeButton} onClick={handleCloseBookModal}>×</button>
                    모달창 띄우기
                </div>
            )}
        </div>
    );

}