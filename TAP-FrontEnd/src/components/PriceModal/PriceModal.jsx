import { useEffect } from 'react';
import styles from './PriceModal.module.css';

export const PriceModal = ({ isOpen, onClose, onBookClose })=>{

    useEffect(()=>{
        // console.log("좌석 예매 페이지 언마운트");
        // onBookClose();
    },[])

    const handleClosePriceModal = ()=>{
        onClose();
        onBookClose();
        // setMacroModal(true);
    }

    return(
        <div className={styles.overlay}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        <div className={styles.header_title}>
                            STEP 3
                        </div>
                        <div className={styles.header_middle}>
                            <p><span style={{fontSize:"18px", fontWeight:"700"}}> 뮤지컬 &lt;킹키부츠&gt;</span><span style={{color:"lightgray", fontSize:"12px"}}>&nbsp;&nbsp;| 블루스퀘어홀</span></p>
                            <div className={styles.header_middle_select}>
                            </div>
                        </div>
                        <div className={styles.header_end}>
                            <button className={styles.closeButton} onClick={handleClosePriceModal}>×</button>
                        </div>
                    </div>

                    <div className={styles.main}>
                        <div className={styles.main_left}>
                           가격 표시 
                        </div>
                        <div className={styles.main_right}>
                            <div className={styles.main_right_header}>
                                선택한 뮤지컬
                            </div>
                            <div className={styles.next_page}>
                                <button style={{textAlign:"center"}}>다음페이지</button>
                            </div>
                        </div>
                    </div>
                    {/* 모달 끼워넣기 */}
                </div>
        </div>
        
    );
}