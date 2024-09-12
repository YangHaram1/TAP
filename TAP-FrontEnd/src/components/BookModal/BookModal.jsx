import { useEffect, useState } from 'react';
import styles from './BookModal.module.css';
import { PreventMacro } from './PreventMacro/PreventMacro';
import { api } from '../../config/config';

export const BookModal = ({ isOpen, onClose }) =>{

    const [macroModal, setMacroModal] = useState(true);

    let placeShape = '직선형';
    // let placeShape = '원형';
    let sections = ['section1','section2','section3'];
    let maxTicket = 6;
    const [seats, setSeats] = useState({row:0,col:0}); 
    const [section, setSection] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([]); // 선택된 좌석 상태

    const [seatsLevel, setSeatsLevel] = useState([{level:"VIP", price:150000}, {level:"R", price:130000}, {level:"S", price:110000}, {level:"A", price:90000}])

    // seq => 상품 번호
    // 상품 번호로 해당 공연장 가져오기
    // 현재 예매 좌석 정보도 가져와야 함.
    // 그러기 위해서는 orders 테이블 에서 상품정보코드로 상품명 조회해서 목록 추출 후
    // 해당 배열을 book에 있는 예매 정보에 join해서 가지고 와야함.

    // api.get(`/place/{seq}`)
    // .then(()=>{
    //     // place에 대한 정보 -> 좌석 모양, 총 좌석 수 
    //     // section에 대한 정보 -> 섹션 수, 섹션 별 행,열 수
    // })
    // .catch(()=>{

    // })
    // 장소 (총좌석수, 좌석 모양) -> 

    // 매크로 모달 활성화 코드 // 예매 코드 완료 후 주석 풀 예정
    const isMacroModalOpen = ()=>{
        setMacroModal(true);
    }

    const closeMacroModal=()=>{
        setMacroModal(false);
    }

    // BookModal 모달을 닫을 때, PreventMacro 모달도 초기화
    const handleCloseBookModal = () => {
        setMacroModal(true);   // PreventMacro 모달을 다시 열리도록 상태 초기화
        onClose();             // 부모로부터 받은 onClose로 BookModal 닫음
    }

    // 우측 상단 섹션(층수) 선택 시 좌측 세부 좌석이 바뀜
    const handleSection =(section)=>{
        //받아온 section 값을 통해 섹션 데이터 확인
        setSection(section);

        if(section === 'section1'){
            setSeats({row:10, col:5});
            console.log(section,seats);
        }else if(section === 'section2'){
            setSeats({row:15, col:10});
            console.log(section,seats);
        }else if(section === 'section3'){
            setSeats({row:10, col:15});
            console.log(section,seats);
        }else{
            setSeats({row:1, col:1});
            console.log(section,seats);
        }
    }

    // 좌석 선택 코드
    const toggleSeatSelection = (row, col) => {
        // 최대 예매 수
        const seatId = `${row}-${col}`; // 좌석 ID 생성
        if (selectedSeats.includes(seatId)) {
            // 이미 선택된 좌석이라면 해제
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
        } else {
            // 선택되지 않은 좌석이라면 추가
            if(selectedSeats.length < maxTicket){
            setSelectedSeats([...selectedSeats, seatId]);
            }else{
                alert("최대 예매수를 초과하였습니다.");
                console.log(selectedSeats);
            }
        }
    };

    // useEffect(()=>{},[selectedSeats])

    useEffect(()=>{
        setSelectedSeats([]);
    },[section]);

    const getBackgroundColor = (level) => {
        switch (level) {
            case 'VIP':
                return 'gold';
            case 'R':
                return 'silver';
            case 'S':
                return 'brown';
            case 'A':
                return 'lightblue';
            default:
                return 'lightgray';
        }
    };

    if (!isOpen) return null;

    return(
        <div className={styles.overlay}>
            {/* PreventMacro 모달이 열려있을 때만 렌더링 */}
            {/* {macroModal && <PreventMacro onClose={closeMacroModal} />} */}
            
            {/* {!macroModal && (
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        <div className={styles.header_title}></div>
                        <button className={styles.closeButton} onClick={handleCloseBookModal}>×</button>
                    </div>
                    모달창 띄우기
                </div>
            )} */}

                {/* ui 구성하는 동안은 매크로 방지 제거 */}
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        <div className={styles.header_title}>
                            STEP 1
                        </div>
                        <div className={styles.header_middle}>
                            <p><span style={{fontSize:"18px", fontWeight:"700"}}> 뮤지컬 &lt;킹키부츠&gt;</span><span style={{color:"lightgray", fontSize:"12px"}}>&nbsp;&nbsp;| 블루스퀘어홀</span></p>
                            <div className={styles.header_middle_select}>
                                <p>선택한 날짜</p> &nbsp;
                                <select>
                                    <option>2024년 09월 10일(수)</option>
                                    <option>2024년 09월 11일(목)</option>
                                    <option>2024년 09월 12일(금)</option>
                                </select>&nbsp;
                                <select>
                                    <option>12시 00분</option>
                                    <option>19시 00분</option>
                                </select>

                            </div>
                        </div>
                        <div className={styles.header_end}>
                            <button className={styles.closeButton} onClick={handleCloseBookModal}>×</button>
                        </div>
                    </div>

                    <div className={styles.main}>

                        {/* 여기 컴포넌트를 갈아 끼워야 됨 */}

                        <div className={styles.main_left}>
                            {(() => {
                                let buttons = [];
                                for (let i = 0; i < seats.row; i++) {
                                    let rowButtons = [];
                                    for (let j = 0; j < seats.col; j++) {
                                        const seatId = `${i}-${j}`; // 좌석 ID
                                        const isSelected = selectedSeats.includes(seatId); // 좌석 선택 여부

                                        rowButtons.push(
                                            <button
                                                key={seatId}
                                                className={styles.seat_btn}
                                                style={{ backgroundColor: isSelected ? 'red' : 'lightgray' }} // 선택된 좌석만 빨간색
                                                onClick={() => toggleSeatSelection(i, j)}
                                            >
                                                {j + 1}
                                            </button>
                                        );
                                    }
                                    buttons.push(
                                        <div key={`row-${i}`} className={styles.row}>
                                            <p>{i + 1}행</p>
                                            {rowButtons}
                                        </div>
                                    );
                                }
                                return buttons;
                            })()}
                        </div>
                        <div className={styles.main_right}>
                            <div className={styles.main_right_header}>
                                원하시는 좌석을 선택해주세요
                            </div>
                            <div className={styles.main_right_section}>
                                <div className={styles.main_right_section_img}>
                                {
                                    sections.map((section, i)=>{
                                        return(<button key={i} className={styles.section_btns} onClick={()=>{handleSection(section)}}>{section}</button>);
                                    })
                               }
                                </div>
                            </div>
                            <div className={styles.seats_level}>
                                <div className={styles.seats_level_text}> 좌석 등급 / 잔여석 </div>
                                
                                <div className={styles.seats_level_box}>
                                {seatsLevel.map((level, i) => (
                                    <div key={i} className={styles.level_box_data}>
                                        <div className={styles.seats_level_color} style={{ backgroundColor: getBackgroundColor(level.level) }}></div>
                                        {level.level}석 {level.price.toLocaleString()}원
                                    </div>
                                ))}
                                </div>
                                {/* 등급에 대해서는 고민필요
                                    1. 만약 열에 대해 등급을 고정시킬 경우 (ex> 상영관 상관없이 1층 10행 열전체는 vip, 1층 나머지는 r)
                                       db를 수정할 필요없이 랜더링 시 조건 부여해서 출력하면 될것같음. 
                                    2. db에 등급을 넣을 경우 확실히 확장성이 늘어남, 근데 어떻게 db에 넣어야할지 감이 안잡힌다. 
                                */}    
                            </div>
                            <div className={styles.seat_selected}>
                                <div className={styles.seat_selected_title}>
                                    <div className={styles.seat_selected_title_left}>
                                        선택 좌석
                                    </div>
                                    <div className={styles.seat_selected_title_right}>
                                        총 {selectedSeats.length}석이 선택되었습니다.
                                    </div>
                                </div>
                                <div className={styles.seat_selected_main}>
                                    <div className={styles.seat_selected_header}>
                                        <div className={styles.seat_selected_header_text1}>좌석등급</div>
                                        <div className={styles.seat_selected_header_text2}>좌석번호</div>
                                    </div>
                                    <div className={styles.seat_selected_content}>
                                    {
                                        selectedSeats.map((seat)=>{
                                            return(
                                                <div className={styles.seat_selected_content_box}>
                                                    <div className={styles.seat_selected_content_text1}>level</div>
                                                    <div className={styles.seat_selected_content_text2}>{seat}</div>
                                                </div>
                                            );
                                        })
                                    }
                                    </div>
                                </div>
                            </div>
                            <div className={styles.next_page}>
                                <button style={{textAlign:"center"}} onClick={()=>{}}>다음페이지</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );

}