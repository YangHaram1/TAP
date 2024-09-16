import styles from './Default.module.css';

const Default = () => {
    const handleChange=()=>{

    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                   고객님계서 최근 6개월간 사용하신 주소가 없습니다.
                </div>
                <div>
                    {/* <button onClick={handleChange}>기본 주소록 설정</button> */}
                </div>
            </div>
        </div>
    )
}

export default Default;