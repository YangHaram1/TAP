import styles from './Inquiry.module.css';
import { useState } from 'react';

const Inquiry = () => {
    const [selected, setSelected] = useState('apple'); // 초기값 설정

    const handleChange = (event) => {
        setSelected(event.target.value); // 선택된 값을 상태로 업데이트
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                1:1 문의하기
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    답변 받을 이메일 주소 <span>*</span>
                </div>
                <div className={styles.input}>
                    <input type="text" />
                </div>
                <div>
                    {true === '' ? '' : (<button className={styles.cancel} onClick={() => { }}>X</button>)}
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    답변 받을 휴대폰 번호 <span>*</span>
                </div>
                <div className={styles.input}>
                    <input type="text" />
                </div>
                <div>
                    {true === '' ? '' : (<button className={styles.cancel} onClick={() => { }}>X</button>)}
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    문의 유형<span>*</span>
                </div>
                <div className={styles.input}>
                    <select className={styles.select} value={selected} onChange={handleChange}>
                        <option value="예매">예매</option>
                        <option value="할인">할인</option>
                        <option value="결제/수수료">결제/수수료</option>
                        <option value="배송/반송">배송/반송</option>
                        <option value="회원가입">회원가입</option>
                        <option value="회원정보변경">회원정보변경</option>
                        <option value="회원탈퇴">회원탈퇴</option>
                        <option value="기타">기타</option>
                    </select>
                </div>

            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    문의 내용 <span>*</span>
                </div>
                <div className={styles.input}>
                    <input type="text" placeholder='제목을 입력해주세요' />
                </div>
                <div className={styles.input}>
                    <input type="text" placeholder='문의 내용을 자세히 입력해주세요' />
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    첨부 파일
                </div>
                <div className={styles.input}>
                    <input type="file" multiple />
                </div>
                <div className={styles.detail}>
                    <p>- 사진 및 파일은 최대 5개까지 등록 가능해요.</p>
                    <p>- 10MB 이내의 모든 이미지 및 PDF, TXT, MS office 문서 및 zip파일을 업로드해주세요.</p>
                    <p>- 첨부 파일 형식 및 내용이 1:1 문의 내용과 맞지 않는 경우(비방, 음란, 고유식별정보 포함 등) 관리자에 의해 자동 삭제 될 수 있습니다.</p>
                </div>
            </div>

            <div className={styles.contents}>
                <div className={styles.title}>
                    안내 사항
                </div>
                <div className={styles.detail}>
                    <p>- 로그인 후 등록한 문의에 한해 인터파크 고객센터 "내 문의내역" 에서 확인할 수 있어요.</p>
                    <p>- 비회원 문의 또는 로그인 하지 않은 상태의 1:1 문의 답변은 메일로만 전달되니 회원이시라면 로그인 후 문의해주세요.</p>
                    <p>- 업무시간 내 순차적으로 답변드리니 조금만 기다려주세요. (상품 유형에 따라 고객센터 운영 시간에 차이가 있습니다.)</p>
                </div>
            </div>

            <div className={styles.contents}>
                <div className={styles.title}>
                    <div>
                        <input type="checkbox"/>
                    </div>
                    <div>
                        전체 동의
                    </div>
                </div>
                <div className={styles.check}>
                    <div className={styles.check1}>
                        <div>
                            <input type="checkbox" />
                        </div>
                        <div>
                            {`(필수) 개인정보 수집 - 이용동의 >`}
                        </div>
                    </div>
                    <div className={styles.chekc2}>
                        <div>
                            <input type="checkbox" />
                        </div>
                        <div>
                            {`(필수) 개인정보 제 3자 제공 동의 >`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Inquiry;