import styles from './ProductData.module.css'

export const ProductData = ()=> {
    return (
        <div className={styles.container}>
            <div className={styles.com_info}>
                <h2>상품관련 정보</h2>
                <table>
                    <colgroup>
                        <col className={styles.col1}  style={{width:"140px"}}></col>
                        <col className={styles.col2}  style={{width:"280px"}}></col>
                        <col className={styles.col3}  style={{width:"140px"}}></col>
                        <col className={styles.col4}  style={{width:"280px"}}></col>
                    </colgroup>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>주최/기획</th>
                            <td>어쩌구저쩌구</td>
                            <th>고객문의</th>
                            <td>1588-1235</td>
                        </tr>
                        <tr>
                            <th>공연시간</th>
                            <td>150분(인터미션 : 20분)</td>
                            <th>관람등급</th>
                            <td>만 7세 이상 관람 가능</td>
                        </tr>
                        <tr>
                            <th>주연</th>
                            <td>어쩌구,저쩌구,어쩌구,저쩌구,어쩌구,저쩌구,어쩌구,저쩌구
                                ,어쩌구,저쩌구,어쩌구,저쩌구,어쩌구,저쩌구,어쩌구,저쩌구
                                ,어쩌구,저쩌구,어쩌구,저쩌구,어쩌구,저쩌구</td>
                            <th>공연장소</th>
                            <td>블루스퀘어 신한카드 홀</td>
                        </tr>
                        <tr>
                            <th>예매수수료</th>
                            <td>장당 2,000원</td>
                            <th>배송료</th>
                            <td>현장수령 무료 (배송불가요..?)</td>
                        </tr>
                        <tr>
                            <th>유효기간/이용조건</th>
                            <td colSpan={3}> 예매한 전날 / 예매한 공연 날짜, 회차에 한해 이용가능</td>
                        </tr>
                        <tr>
                            <th>예매 취소 조건</th>
                            <td colSpan={3} className={styles.tables}> 취소일자에 따라서 아래와 같이 취소 수수료가 부과됩니다. 예매 일 기준보다 관람일 기준이 우선 적용됩니다. 단, 예매 당일 밤 12시 이전 취소 시에는 취소 수수료가 없으며, 예매 수수료도 환불됩니다. (취소 기한 내에 한함)
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
                            </td>
                        </tr>
                        <tr>
                            <th>취소환불방법</th>
                            <td colSpan={3}> 
                                <ul>
                                    <li> My티켓 &gt; 예매/취소내역에서 직접 취소 또는 고객센터 (1544-1555)를 통해서 예매를 취소할 수 있습니다.</li>
                                    <li> 티켓이 배송된 이후에는 인터넷 취소가 안되며, 취소마감 시간 이전에 티켓이 Tap 티켓 고객센터로 반송되어야 취소 가능합니다. 취소수수료는 도착일자 기준으로 부과되며, 배송료는 환불되지 않습니다.</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th>배송티켓안내</th>
                            <td colSpan={3}>
                                <ul>
                                    <li> 티켓 배송 (배송상태 : 배송 준비중 이후) 후에는 주소 변경이 불가합니다.</li>
                                    <li> 부득이하게 주소 변경이 필요하신 경우 각 배송사에 수취 거절 요청 후,
                                    고객센터(1544-1555)로 재배송 신청할 수 있습니다.(배송비 3,200원 추가 부과)</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* 판매자 정보 */}
                <h2>판매자 정보</h2>
                <table>
                    <colgroup>
                        <col className={styles.col1}  style={{width:"140px"}}></col>
                        <col className={styles.col2}  style={{width:"280px"}}></col>
                        <col className={styles.col3}  style={{width:"140px"}}></col>
                        <col className={styles.col4}  style={{width:"280px"}}></col>
                    </colgroup>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>상호</th>
                            <td>어쩌구저쩌구</td>
                            <th>대표자명</th>
                            <td>1588-1235</td>
                        </tr>
                        <tr>
                            <th>사업자등록번호</th>
                            <td>220-87-43278</td>
                            <th>E-mail</th>
                            <td>test@email.com</td>
                        </tr>
                        <tr>
                            <th>연락처</th>
                            <td colSpan={3}> 1588-1234 </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td colSpan={3}> 서울특별시 강남구 논현로154길 </td>
                        </tr>
                    </tbody>
                </table>

                {/* 예매 유의사항 */}
                <h2>예매 유의사항</h2>
                <ul>
                    <li>다른 이용자의 원활한 예매 및 취소에 지장을 초래할 정도로 반복적인 행위를 지속하는 경우 회원의 서비스 이용을 제한할 수 있습니다.</li>
                    <li>일부 상품의 판매 오픈 시 원활한 서비스 제공을 위하여 인터파크페이, I-point, NOL 포인트, 문화예매권 등의 특정 결제수단 이용이 제한될 수 있습니다.</li>
                </ul>

                {/* 티켓 수령 안내 */}
                <h2>티켓 수령 안내</h2>
                <p>예약번호 입장</p>
                <ul>
                    <li>공연 당일 현장 교부처에서 예약번호 및 본인 확인 후 티켓을 수령하실 수 있습니다.</li>
                    <li>상단 예매확인/취소 메뉴에서 예매내역을 프린트하여 가시면 편리합니다.</li>
                </ul>
                <p>티켓배송</p>
                <ul>
                    <li>예매완료(결제익일) 기준 4~5일 이내에 배송됩니다. (주말, 공휴일을 제외한 영업일 기준)</li>
                    <li>배송 중 전달 불가사항이 발생할 시에는 반송되며, 본인 수령 불가 시 경우에 따라 대리 수령도 가능합니다.</li>
                    <li>공연 3일 전까지 티켓을 배송받지 못하신 경우 고객센터(1544-1555)로 연락 주시기 바랍니다.</li>
                    <li>반송이 확인되지 않은 티켓은 현장에서도 수령하실 수 없으며, 공연 관람 및 환불이 불가합니다..</li>
                    <li>티켓 배송 (배송상태 : 배송 준비중 이후) 후에는 주소 변경이 불가합니다.</li>
                    <li>부득이하게 주소 변경이 필요하신 경우 각 배송사에 수취 거절 요청 후, 고객센터(1544-1555)로 재배송 신청할 수 있습니다.
                    (배송비 3,200원 추가 부과)</li>
                </ul>


            </div>
            
        </div>
    );
}