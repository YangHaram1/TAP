import styles from './Complete.module.css';

const Complete=({checkDetail,handleCheck})=>{
    return(
        <div className={styles.container}>
        <div className={styles.title}>
            회원탈퇴
        </div>
        <div className={styles.header}>
            <div className={checkDetail[0] ? styles.detailCheck : styles.detail}>
                1. 탈퇴안내
            </div>
            <div className={checkDetail[1] ? styles.detailCheck : styles.detail}>
                2. 탈퇴사유
            </div>
            <div className={checkDetail[2] ? styles.detailCheck : styles.detail}>
                3. 탈퇴완료
            </div>
        </div>
        <div className={styles.info}>
            <div className={styles.infoTitle}>
                <p><span>TAP(Ticket And Place)</span></p>
                <p>탈퇴 완료 되었습니다</p>
            </div>
            <div className={styles.infoDetail}>
                <p>지금까지 TAP 서비스를 이용해주셔서 감사합니다</p>
                <p><span style={{color:"red"}}>잠시후 로그아웃 됩니다</span></p>
            </div>
        </div>
    </div>
    )
}
export default Complete;