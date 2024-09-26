import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.topTxt}>
                <div>
                    <span className={styles.tapInfoTitle}>(주)TAP</span>

                    <p className={styles.tapInfoSubTitle}>
                        주소 서울 서초구 강남대로 447 남서울빌딩 6층<br></br>
                        사업자등록번호 824-11-11111 사업자정보확인<br></br>
                        통신판매업신고 2024-서울서초-1111 관광사업증 등록번호 :
                        제2024-000000호 호스팅서비스제공자<br></br>
                        (주)TAP트리플｜대표이사 정하윤
                    </p>
                </div>
                <div>
                    <span className={styles.tapInfoTitle}>고객센터</span>

                    <p className={styles.tapInfoSubTitle}>
                        티켓 1544-1555 <br></br>팩스 02-111-1111｜이메일
                        tap@tap.com
                        <br></br>
                    </p>
                </div>
                <div>
                    <span className={styles.tapInfoTitle}>
                        전자금융거래 분쟁처리 담당
                    </span>

                    <p className={styles.tapInfoSubTitle}>
                        티켓 1544-1111<br></br> 팩스 02-111-1111｜이메일
                        tap@tap.com
                        <br></br>개인정보보호책임자 cpo@tap.com
                    </p>
                </div>
            </div>
            <div className={styles.botTxt}>
                (주)TAP트리플은 항공사가 제공하는 개별 항공권 및 여행사가
                제공하는 일부 여행상품에 대하여 통신판매중개자의 지위를 가지며,
                해당상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게
                있습니다. <br></br>항공권 또는 항공권이 포함된 경우, 표시되는
                상품요금은 예상 유류할증료와 제세공과금이 포함된 가격이며,
                발권일/환율 등에 따라 변동될 수 있습니다.<br></br>{' '}
                (주)TAP트리플은 TAP티켓, TAP투어의 통신판매중개자로서 통신판매의
                당사자가 아니므로, 개별 판매자가 등록한 오픈마켓 상품에 대해서
                (주)TAP트리플은 일체 책임을 지지 않습니다.<br></br> Copyright ⓒ
                tap Corp. All Rights Reserved.
            </div>
        </footer>
    )
}
export default Footer
