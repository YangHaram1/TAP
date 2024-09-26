import { useEffect } from 'react';
import { useOrder, useUserData } from '../../../store/store';
import styles from './Pay.module.css';
import { api } from '../../../config/config';

export const Pay = ()=>{

    const {payMethod, setPayMethod, point, setPoint, totalPrice} = useOrder();
    const {user} = useUserData();

    useEffect(()=>{
        if(payMethod === 'point'){
            api.get(`/order/getPoint`)
            .then((resp)=>{
            
                setPoint(resp.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },[payMethod])

    const handleMain = (tap) => {
        setPayMethod(tap);
        console.log(user);
    }

    return(
        <div className={styles.container}>
            <div className={styles.side}>
                <h3 style={{marginTop:'35px', marginBottom:'0px'}}>결재 방식 선택</h3>
                <ul>
                    <li onClick={()=>{handleMain("point")}}> 포인트 사용 </li>
                    {/* <li onClick={()=>{handleMain("kakao")}}> 카카오 페이 </li> */}
                </ul>
            </div>
            <div className={styles.main}>
                <h2>결제 수단 입력</h2>
                <div className={styles.main_box}>
                    <div className={styles.main_header}>
                        <h3 style={{textIndent:"10px"}}> &gt; {payMethod === 'point'?  "TAP 포인트 사용" : "카카오페이"}</h3>
                        {
                            payMethod === 'point'? 
                            // 일반 포인트 결제일 경우
                            <div className={styles.point_box}>
                               <div className={styles.mypoint}>
                                    <div className={styles.title}>사용가능포인트</div>
                                    <div className={styles.content}>{point !== null? point.toLocaleString():''}</div>
                                </div>
                                <div className={styles.usepoint}>
                                    <div className={styles.title}>사용포인트</div>
                                    <div className={styles.input}>
                                        <input type='text' value={totalPrice !== null? totalPrice.toLocaleString():''} disabled/>
                                    </div>
                                    <button>적용하기</button>
                                </div>
                            </div>
                            :  // 카카오페이 결제일 경우
                            <div className={styles.kakao_box}>
                                <div className={styles.mypoint}>
                                    <div className={styles.title}>결제 금액</div>
                                    <div className={styles.content}>{totalPrice !== null? totalPrice.toLocaleString():''}</div>
                                </div>
                            </div>
                        }

                        {
                             payMethod === 'point'? 
                             <div className={styles.point_info_box}>
                                <p> - TAP 포인트는 TAP 홈페이지에서만 이용 가능</p>
                             </div>
                             :<div className={styles.kakao_info_box}>
                                <p> - 카카오페이는 카카오톡 안에서 개인 신용카드(체크카드포함)를 등록하여 카카오페이 비밀번호로 결제할 수 있는 간편결제 입니다.</p>
                                <p> - 200만원 이상 결제 시에는 ARS 추가 인증이 필요합니다.</p>
                                <p> - 카카오페이 무이자 할부는 일부 신용카드 정책과 상이할 수 있으며, 카카오페이를 통해 확인이 가능합니다.</p>
                                <p> - 부분 취소 불가하며, 취소 시 결제금액과 할인금액의 비율만큼 할인 금액 차감됩니다.</p>
                             </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}