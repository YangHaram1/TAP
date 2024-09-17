import styles from './ModalOrder.module.css';

export const ModalOrder=({ resetCheckboxes,  checkedOrders})=>{

    return (
        <div className={styles.container}>
            <div className={styles.container}>
            <div className={styles.title}>
                주문 발송 처리
            </div>
            <div className={styles.subtitle}>
                    {checkedOrders.length} 선택된 미발송 주문 건에 대해서, 
            </div>
            <div className={styles.changeStatus}>
                <div className={styles.statusTitle}>
                    
                </div>
                <div className={styles.statusSelect}>
                   <select>
                    <option>발송</option>
                    <option>주문 취소</option>
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