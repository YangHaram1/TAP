import styles from './Guide.module.css';
import Mybutton from './../../../MyButton/Mybutton';
import { useState } from 'react';
import  Swal  from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Guide = ({ checkDetail, handleCheck }) => {
    const [check,setCheck]=useState(false);
    const navi =useNavigate();

    const handleConfirm=()=>{
        if(!check){
            Swal.fire({
                icon:'error',
                title:'회원 탈퇴 안내',
                text:'회원 탈퇴 안내사항 확인을 선택해주세요'
            })
        }else{
            handleCheck(1);
        }
    }
    const handleUpdate=()=>{
        navi('/mypage/menus');
    }
    const handlePassword=()=>{
        navi('/mypage/menus/password');
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
                    <p><span>TAP(Ticket And Place)</span></p>
                    <p>서비스를 이용하시는데</p>
                    <p><span style={{color:"red"}}>불편함</span>이 있으셨나요?</p>
                </div>
                <div className={styles.infoDetail}>
                    <p>개인정보에 대해 불편을 느끼셨다면,</p>
                    <p>아래의 방법을 통해 회원님의 불편을 해결 하실 수 있습니다.</p>
                </div>
                <div className={styles.infoBtn}>
                    <button onClick={handleUpdate}>회원정보 수정</button>
                    <button onClick={handlePassword}>비밀번호 변경</button>
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.contentsTitle}>
                    회원 탈퇴 안내
                </div>
                <div className={styles.warning}>
                    탈퇴시 주의사항
                </div>
                <div className={styles.content}>
                    <div className={styles.contentTitle}>
                        적립금/혜택 소멸 및 재가입시 복구 불가
                    </div>
                    <div className={styles.contentDetail}>
                        회원 탈퇴 시, 회원님 아이디에 등록된 적립금과 우수고객등급에 따른 혜택은 모두 소멸되어, 재가입하더라도 복구되지 않습니다. (영화/공연/문화 예매권, 할인쿠폰 등)
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentTitle}>
                        관계법령에 따른 주문번호는 회원 탈퇴 후 5년간 보존
                    </div>
                    <div className={styles.contentDetail}>
                        전자상거래 등에서의 소비자 보호에 관한 법률 제6조(거래기록의 보존 등)에 의거, 주문정보는 회원 탈퇴 후 5년간 보존됩니다.
                        티켓 예매 후 탈퇴 시에 공연 관람은 가능하나 예매번호, 예매내역을 볼 수 없으며, 예매취소 및 배송지 변경은 예매번호를 가지고 고객센터를 통해서만 진행가능합니다.
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentTitle}>
                        탈퇴 처리 및 재가입 제한 정책 안내
                    </div>
                    <div className={styles.contentDetail}>
                        회원 탈퇴 시, 즉시 탈퇴 처리되며 탈퇴 후 7일간 휴대전화번호/이메일주소/개인식별정보(CI/DI)가 보관됩니다.
                        탈퇴 후, 7일간 신규 계정에 동일한 명의로 본인인증 진행이 불가합니다. 본인인증이 진행되지 않는 경우 TAP 티켓의 모든 예매 서비스를 이용하실 수 없습니다.
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentTitle}>
                        게시글 안내사항
                    </div>
                    <div className={styles.contentDetail}>
                        상품리뷰와 1:1 문의와 같은 게시판형 서비스에 등록된 게시물은 탈퇴 후에도 자동 삭제 되지 않습니다. 탈퇴 후에는 회원정보 삭제로 인해 작성자 본인 여부를 확인할 수 없으므로, 게시글 편집 및 삭제 처리가 원천적으로 불가능합니다. 삭제를 원하는 게시글이 있을 경우, 먼저 해당 게시글을 삭제 하신 후, 탈퇴를 신청하시기 바랍니다.
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.check}>
                    <input type="checkbox" checked={check} onChange={(e)=>{setCheck(e.target.checked)}}/> 상기 사항을 모두 확인하였습니다.
                </div>
                <div className={styles.footerDetail}>
                   <p> 회원 탈퇴 시 적립금 및 지급된 혜택은 소멸되어 재가입에 따른 복구가 불가하며 5년간 기존 아이디의 재사용 불가 및 <span>7일이내 동일명의의 본인인증 불가</span> 에 대한 사항에 동의 합니다.</p>
                </div>
            </div>
            <Mybutton handleConfirm={handleConfirm} setcheck={null} title={'동의'}/>
        </div>
    )
}
export default Guide; 