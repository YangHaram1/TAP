import { useState } from 'react';
import styles from './Reason.module.css';
import Mybutton from '../../../MyButton/Mybutton';
import { useAuthStore } from './../../../../../../store/store';
import SweetAlert from './../../../../../../components/SweetAlert/SweetAlert';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Reason = ({ checkDetail, handleCheck }) => {
    const [check, setCheck] = useState([false, false, false, false, false, false]);
    const { logout } = useAuthStore();
    const navi = useNavigate();
    const handleConfirm = () => {
        const count = check.filter((item,index)=>{
            return item;
        }).length;
        if(count>0){
            SweetAlert('warning', '회원탈퇴', '정말로 탈퇴 하시겠습니까?', handleWithdrawal, null);
        }
        else{
            Swal.fire({
                icon:'error',
                title:'회원탈퇴',
                text:'하나 이상 선택해주세요'
            })
        }
       
    }

    const handleWithdrawal = () => {
        sessionStorage.removeItem('token');
        handleCheck(2);
        setTimeout(() => {
            logout();
            navi('/')
          }, 5000);
    }

    const handleChecked = (index) => {
        setCheck((prev) => {
            return (
                prev.map((item, i) => {
                    if (i === index) {
                        return !item;
                    }
                    return item;
                })
            )
        })
    }
    return (
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
                    <p><span>TAP(Ticket And Place)</span>를</p>
                    <p>이용하시면서 <span style={{ color: "red" }}>불만족스러웠던 점</span>을</p>
                    <p>남겨주시면 더 나은 서비스로 찾아뵙겠습니다.</p>
                </div>
                <div className={styles.infoDetail}>
                    <p>TAP 서비스 이용 중 불편사항을 하나 이상 선택해주세요.</p>
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.content}>
                    사이트 이용 관련
                </div>
                <div className={styles.contentDetail}>
                    <input type="checkbox" checked={check[0]} onChange={(e) => { handleChecked(0) }} />  상품 다양성, 가격 품질 불만
                </div>
                <div className={styles.contentDetail}>
                    <input type="checkbox" checked={check[1]} onChange={(e) => handleChecked(1)} /> 혜택 부족
                </div>
                <div className={styles.contentDetail}>
                    <input type="checkbox" checked={check[2]} onChange={(e) => handleChecked(2)} />  사이트 이용 불편
                </div>
                <div className={styles.contentDetail}>
                    <input type="checkbox" checked={check[3]} onChange={(e) => handleChecked(3)} />  이용 빈도 낮음
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.content}>
                    서비스 이용 관련
                </div>
                <div className={styles.contentDetail}>
                    <input type="checkbox" checked={check[4]} onChange={(e) => handleChecked(4)} />    취소 및 환불 절차 불만
                </div>
                <div className={styles.contentDetail}>
                    <input type="checkbox" checked={check[5]} onChange={(e) => handleChecked(5)} />  고객 대응 불만족
                </div>
            </div>
            <Mybutton handleConfirm={handleConfirm} setcheck={null} title={'탈퇴'} />
        </div>
    )
}
export default Reason;