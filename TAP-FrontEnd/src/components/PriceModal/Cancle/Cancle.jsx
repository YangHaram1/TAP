import { useEffect, useState } from 'react';
import { useOrder } from '../../../store/store';
import styles from './Cancle.module.css';

export const Cancle = ({setCheck})=>{

    const {company, payMethod, totalPrice, address} = useOrder();

    const [firstChecked, setFirstChecked] = useState(false);
    const [secondChecked, setSecondChecked] = useState(false);

    const handleFirstCheck = () => {
        // console.log("주소 확인",address);
        setFirstChecked(!firstChecked);
    };

    const handleSecondCheck = () => {
        setSecondChecked(!secondChecked);
    };

    // 두 체크박스가 모두 체크되면 check 상태를 true로 변경
    useEffect(() => {
        if (firstChecked && secondChecked) {
            setCheck(true);
        } else {
            setCheck(false);
        }
    }, [firstChecked, secondChecked]);

    return(
        <div className={styles.container}>
            <h3>취소 수수료 동의 후 '결재하기' 버튼을 클릭해주세요</h3>
            <div className={styles.cancle_box}>
                <h4>취소 수수료</h4>
                <div className={styles.cancle_tax_box}>
                    <table className={styles.tables}>
                        <thead>
                            <tr>
                                <th>취소일</th>
                                <th>취소 수수료</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>예매 후 7일 이내</td>
                                <td>없음</td>
                            </tr>
                            <tr>
                                <td>예매 후 8일~관람일 10일전까지</td>
                                <td>장당 4,000원(티켓금액의 10%한도)</td>
                            </tr>
                            <tr>
                                <td>관람일 9일전~7일전까지</td>
                                <td>티켓금액의 10%</td>
                            </tr>
                            <tr>
                                <td>관람일 6일전~3일전까지</td>
                                <td>티켓금액의 20%</td>
                            </tr>
                            <tr>
                                <td>관람일 2일전</td>
                                <td>티켓금액의 30%</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>

                <h4>개인정보 제 3자 정보 제공</h4>
                <div className={styles.data_box}>
                    <p>(주)TAP 은 기획사와 이용자 간의 상품 거래를 중개하는 통신판매 중개자입니다. 
                        거래관계가 이루어진 이후의 고객응대 및 공연정보 안내등을 위하여 관련한 정보는 필요한 범위 내에서 거래 당사자에게 아래와 같이 제공됩니다.</p>

                    <p>1. 개인정보 제공 동의<br></br>
                    TAP은 개인정보보호법에 따라 이용자의 개인정보에 있어 아래와 같이 알리고 동의를 받아 상품의 기획사에 제공합니다.
                    </p>
                    <p>2. 개인정보 제공받는자<br></br>
                    주식회사 {company.name}
                    </p>
                    <p>3. 개인정보 이용 목적<br></br>
                    기획사 : 티켓 현장발권, 공연/경기취소 등에 대한 고객 안내, 티켓 정당 예매 확인 및 관련 업무 수행    
                    </p>
                    <p>4. 개인정보 제공 항목<br></br>
                        성명, 이이디, 전화번호, 휴대폰번호, 이메일주소, 주문/배송 정보, 예매번호
                    </p>
                    <p>5. 개인정보 보유 및 이용 기간<br></br>
                        개인정보 이용목적 달성 시까지 (단, 관계 법령의 규정에 의해 보존의 필요가 있는 경우 및 사전 동의를 득한 경우 해당 보유기간까지)
                    </p>
                    <p>※ 위 개인정보 제공에 대한 동의를 거부할 권리가 있으며, 만약 동의를 거부할 경우 티켓 예매서비스 이용에 제한을 받을 수 있습니다. </p>
                </div>

                <div className={styles.check_box}>
                    <p><input type='checkbox' checked={firstChecked} onChange={handleFirstCheck}/> (필수) 취소수수료/취소기한을 확인하였으며, 동의합니다.</p>
                    <p><input type='checkbox' checked={secondChecked} onChange={handleSecondCheck}  /> (필수) 제3자 정보제공 내용에 동의합니다.</p>
                </div>
                
                <h4>결제정보</h4>
                <div className={styles.paymethod_box}>
                    <table className={styles.tables}>
                        <colgroup>
                            <col className={styles.col1} style={{width:"50%"}}></col>
                            <col className={styles.col2} style={{width:"50%"}}></col>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>결제방법</th>
                                <th>결제할 금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{payMethod === 'point' ? "TAP 포인트 결제" : "카카오페이" }</td>
                                <td style={{color:"red"}}>{totalPrice.toLocaleString()}원</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}