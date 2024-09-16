import styles from "./Post.module.css";

export const Post = ()=>{
    return(
        <div className={styles.container}>
            <h3>배송지 확인</h3>
            <div className={styles.post_address}>
                <label><input type="radio" name="address"/>서울특별시 어쩌구 저쩌구</label><br></br>    
                <label><input type="radio" name="address"/>서울특별시 어쩌구 저쩌구</label><br></br>    
                <label><input type="radio" name="address"/>서울특별시 어쩌구 저쩌구</label><br></br>    
            </div>
        </div>
    );    
}