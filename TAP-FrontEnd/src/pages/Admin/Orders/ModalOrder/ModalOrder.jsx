import styles from './ModalOrder.module.css';

export const ModalOrder=()=>{

    return (
        <div className={styles.container}>
            <div className={styles.container}>
            <div className={styles.title}>
                멤버 정보 수정
            </div>
            <div className={styles.subtitle}>
                    선택된 사원명에 대해서, 
            </div>
            <div className={styles.changeStatus}>
                <div className={styles.statusTitle}>
                    
                </div>
                <div className={styles.statusSelect}>
                   <select>
                    <option>gdkf</option>
                    <option>gdkf</option>
                    <option>gdkf</option>
                   </select>
                  
                </div>
            </div>
            <div className={styles.btnstyle}>
                <button className={styles.save} >저장</button>
                <button className={styles.cancel} >취소</button>
            </div>
        </div>
        </div>
    )
}