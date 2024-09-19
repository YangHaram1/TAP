import styles from './Mybutton.module.css';
import { useNavigate } from 'react-router-dom';
const Mybutton=({handleConfirm,setcheck,title,checkAll})=>{
    const navi=useNavigate();
    const handleCancel = () => {
        if(setcheck!=null){
            setcheck(false);
        }
        else{
            navi('/mypage');
        }
    
    }
    return(
        <div className={styles.buttonDiv}>
        <div className={styles.cancel}>
            <button onClick={handleCancel}>취소</button>
        </div>
        <div className={(checkAll!==undefined)?checkAll?styles.confirm:styles.none:styles.none}>
            <button onClick={handleConfirm}>{title||'확인'}</button>
        </div>
    </div>
    )
}
export default Mybutton;