import { useEffect, useState } from 'react';
import styles from './BookModal.module.css';
import { PreventMacro } from './PreventMacro/PreventMacro';
import { api } from '../../config/config';
import { PriceModal } from '../PriceModal/PriceModal';
import Swal from 'sweetalert2';
import { useAuthStore, useOrder } from '../../store/store';

export const BookModal = ({ isOpen, onClose}) =>{

    const [macroModal, setMacroModal] = useState(true);

    const [seats, setSeats] = useState({}); 
    const [maxTicket, setMaxTicket] = useState(0);
    
    const [selectedSeats, setSelectedSeats] = useState([]); // 선택된 좌석 상태
    const [priceModal, setPriceModal] = useState(false);

    const {token} = useAuthStore();
    const {date, time, seq, setDate, setTime, storageSeats , setStorageSeats, setStorageSection, mainData} = useOrder(); //저장소 데이터
    const [dateList, setDateList] = useState([]);
    const [timeList, setTimeList] = useState([]);
    

    //==============================좌석 관련 세팅 ==============================
    const [shape, setShape] = useState("");
    const [selectSection, setSelectSection] = useState({}); // 선택한층
    const [section, setSection] = useState([]); // 1층, 2층
    const [sectionInnerData, setSectionInnerDate] = useState([]);
    const [seatsLevel, setSeatsLevel] = useState([]); // 좌석 등급, 등급별가격 

    const [bookSeats, setBookSeats] = useState([]); // 예약된 좌석

    // 등급 추가 시 색깔 지정해줘야 함.
    const getBackgroundColor = (grade) => {
        // console.log("grade", grade);
        switch (grade) {
            case 'VIP석':
                return 'sandybrown';
            case 'R석':
                return 'silver';
            case 'S석':
                return 'plum';
            case 'A석':
                return 'lightblue';
            case '스탠딩석':
                return 'forestGreen';
            default:
                return 'lightgray';
        }
    };

    useEffect(()=>{
        if(token !== null){
        if(mainData !== null){
        api.get(`/order/${mainData.place_seq}`)
        .then((resp)=>{
            console.log("좌석 예약 정보",resp.data, mainData);
            // 상태 값이 변경될 때만 업데이트
            
                setMaxTicket(mainData.max_ticket);
            
            if (resp.data.section[0].place_shape !== shape) {
                setShape(resp.data.section[0].place_shape); // 공연장 모양
            }
            if (resp.data.section !== section) {
                setSection(resp.data.section); // 섹션 정보
            }
            if (resp.data.sectionInnerData !== sectionInnerData) {
                setSectionInnerDate(resp.data.sectionInnerData); // 섹션 세부 정보
            }
            if(resp.data.seats){
                const newSeatsLevel = resp.data.seats.map(seat => ({
                    grade: seat.place_seat_level,  // 좌석 등급
                    price: seat.price_seat,          // 좌석 가격
                    color: getBackgroundColor(seat.place_seat_level)
                }));
                setSeatsLevel(newSeatsLevel); 
            }
            // 최대 예매수 추가로 뽑아와야함.
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    }},[mainData])


    //======================== 매크로 모달 활성화 ======================
    // 매크로 모달 활성화 코드 // 예매 코드 완료 후 주석 풀 예정
    const isMacroModalOpen = ()=>{setMacroModal(true);}

    const closeMacroModal=()=>{setMacroModal(false);
    }

    // BookModal 모달을 닫을 때, PreventMacro 모달도 초기화
    const handleCloseBookModal = () => {
        setMacroModal(true);   // PreventMacro 모달을 다시 열리도록 상태 초기화
        onClose();             // 부모로부터 받은 onClose로 BookModal 닫음
        // console.log("전체 페이지 닫히는 중",macroModal);
    }

    //============================== 예매 좌석 세팅 ==============================

    useEffect(()=>{
        api.get(`/order/getBookSeats?date=${date}&time=${time}&seq=${seq}`)
        .then((resp)=>{
            console.log(resp.data);
            setBookSeats(resp.data);
        })
        .catch((err)=>{
            console.log(err);
        })

    },[isOpen,date,time,storageSeats])

    //======================== 좌석 세팅 ======================

    // 우측 상단 섹션(층수) 선택 시 좌측 세부 좌석이 바뀜
    const handleSection =(section_seq)=>{
        //받아온 section 값을 통해 섹션 데이터 확인
        setSelectSection(section_seq);

        // console.log("선택된 섹션 정보",section_seq);
        const selectedSection = section.find(section => section.section_seq === section_seq);
        if (selectedSection) {
            setSeats({
                row: selectedSection.selection_row,
                col: selectedSection.selection_col
            });
        }
        // console.log(seats);
    }

    // 좌석 선택 코드
    const toggleSeatSelection = (row, col) => {
        // 최대 예매 수
        const seatId = `${row}-${col}`; // 좌석 ID 생성
        const seatGrade = getSeatGrade(row, col);

         // 예매된 좌석인지 확인
        if (bookSeats.some(bookedSeat => 
            bookedSeat.book_row === row && 
            bookedSeat.book_col === col && 
            bookedSeat.section_seq === selectSection)) {
            alert("이미 예매된 좌석입니다.");
            return;
        }

        if (selectedSeats.some(seat => seat.seatId === seatId)) {
            // 이미 선택된 좌석이라면 해제
            setSelectedSeats(selectedSeats.filter(seat => seat.seatId !== seatId));
        } else {
            // 선택되지 않은 좌석이라면 추가
            if(selectedSeats.length < maxTicket){
                setSelectedSeats([...selectedSeats, { seatId, grade: seatGrade }]);
            }else{
                alert("최대 예매수를 초과하였습니다.");
                console.log(selectedSeats);
            }
        }
    };

    // useEffect(()=>{},[selectedSeats])

    useEffect(()=>{
        setSelectedSeats([]);
    },[selectSection, macroModal, storageSeats]);

    

    const generateSeats = () => {
        let seatButtons = [];
        for (let i = 0; i < seats.row; i++) {
            let rowButtons = [];
            for (let j = 0; j < seats.col; j++) {
                const seatId = `${i + 1}-${j + 1}`;
                const seatGrade = getSeatGrade(i + 1, j + 1);
    
                // 해당 좌석이 이미 예매된 좌석인지 확인
                const isBooked = bookSeats.some(bookedSeat => 
                    bookedSeat.book_row === i + 1 && 
                    bookedSeat.book_col === j + 1 && 
                    bookedSeat.section_seq === selectSection
                );
    
                const isSelected = selectedSeats.some(seat => seat.seatId === seatId);
    
                rowButtons.push(
                    <button
                        key={seatId}
                        className={styles.seat_btn}
                        style={{
                            backgroundColor: isBooked ? 'gray' : (isSelected ? 'red' : getBackgroundColor(seatGrade)),
                            cursor: isBooked ? 'not-allowed' : 'pointer'
                        }}
                        disabled={isBooked} // 예매된 좌석은 클릭 불가
                        onClick={() => !isBooked && toggleSeatSelection(i + 1, j + 1)}
                    >
                        {j + 1}
                    </button>
                );
            }
            seatButtons.push(
                <div key={`row-${i}`} className={styles.row}>
                    <p>{i + 1}행</p>
                    {rowButtons}
                </div>
            );
        }
        return seatButtons;
    };

    const getSeatGrade = (row, col) => {
        // console.log("찾는 정보",row,col);
        const seatGradeData = sectionInnerData.find(data =>
            row === data.seat_row && // 좌석의 행 번호가 일치해야 함
            col >= data.seat_col_start && // 좌석의 열 번호가 시작 열 번호보다 크거나 같아야 함
            col <= data.seat_col_end && // 좌석의 열 번호가 끝 열 번호보다 작거나 같아야 함
            data.section_seq === selectSection // 선택된 섹션과 일치해야 함
        );
        return seatGradeData ? seatGradeData.seat_grade : '기타';
    };

    //============================== 날짜 세팅 ==============================

    useEffect(()=>{
        if(token !== null){
        if(seq !== null){
            api.get(`/order/getDate?seq=${seq}`)
        .then((resp)=>{
            console.log("상품번호",seq);
            console.log(resp.data.dateList);
            setDateList(resp.data.dateList);
        })
        .catch((err)=>{
            console.log(err);
        });
        }
    }
    },[seq]);

    useEffect(()=>{
        if(token !== null){
        if(seq !== null && date !== null){
        api.get(`/order/getTime?date=${date}&seq=${seq}`)
        .then((resp)=>{
            console.log("날짜 받고있는중",resp.data);
            console.log(resp.data);
            setTimeList(resp.data);
        })
        .catch((err)=>{
            console.log(err);
        }); 
    }}
    },[date])

    //======================== 다음 페이지 세팅 ======================

    const handlePriceModal = async()=>{
        if(selectedSeats.length < 1){
            await Swal.fire(
                { 
                  icon: 'warning',
                  title: '좌석을 선택해주세요.',
                  showConfirmButton: false,
                  timer: 1500
                }
            )
        }else{
            setStorageSeats(selectedSeats);
            setStorageSection(selectSection);
            setPriceModal(true);
        }
        // onClose();
    }

    const handleClosePriceModal = ()=>{
        setPriceModal(false);
    }

    if (!isOpen) return null;

    return(
        <div className={styles.overlay}>
            {/* PreventMacro 모달이 열려있을 때만 렌더링 */}
            {macroModal && <PreventMacro onClose={closeMacroModal} />}
            
            {!macroModal && (
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.header_title}>
                        STEP 2
                    </div>
                    <div className={styles.header_middle}>
                        <p><span style={{fontSize:"18px", fontWeight:"700"}}>{mainData.name}</span><span style={{color:"lightgray", fontSize:"12px"}}>&nbsp;&nbsp;| {mainData.place_name}</span></p>
                        <div className={styles.header_middle_select}>
                            <p>선택한 날짜</p> &nbsp;
                            <select value={date || ''} onChange={(e) => setDate(e.target.value)}>
                                {
                                    dateList.map((date, index)=>{
                                        return(
                                            <option key={index} value={`${date.SCHEDULE_DATE} (${date.DAY})`}>{date.SCHEDULE_DATE} ({date.DAY})</option>
                                        );
                                    })
                                }
                            </select>&nbsp;
                            <select value={time || ''} onChange={(e) => setTime(e.target.value)}>
                                {
                                    timeList.map((time, index)=>{
                                        return(
                                            <option key={index} value={`${time}`}>{time}</option>
                                        );
                                    })
                                }
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
                        {generateSeats()}
                    </div>
                    <div className={styles.main_right}>
                        <div className={styles.main_right_header}>
                            원하시는 좌석을 선택해주세요
                        </div>
                        <div className={styles.main_right_section}>
                            <div className={shape === '직선형' ? styles.main_right_section_img : styles.main_right_section_img_circle}>
                                {shape === '직선형' ? (
                                section.map((section, i) => (
                                    <button key={i} className={styles.section_btns} onClick={() => { handleSection(section.section_seq); }}>
                                    {section.section_name}
                                    </button>
                                ))
                                ) : (
                                Array.from({ length: Math.ceil(section.length / 2) }, (_, rowIndex) => (
                                    <div key={rowIndex} className={styles.row}>
                                    {section.slice(rowIndex * 2, rowIndex * 2 + 2).map((sec, index) => (
                                        <button key={index} className={styles.section_btns_circle} onClick={() => { handleSection(sec.section_seq); }}>
                                        {sec.section_name}
                                        </button>
                                    ))}
                                    </div>
                                ))
                                )}
                            </div>
                        </div>
                        <div className={styles.seats_level}>
                            <div className={styles.seats_level_text}> 좌석 등급 / 잔여석 </div>
                            
                            <div className={styles.seats_level_box}>
                            {seatsLevel.map((grade, i) => (
                                <div key={i} className={styles.level_box_data}>
                                    <div className={styles.seats_level_color} style={{ backgroundColor: getBackgroundColor(grade.grade) }}></div>
                                    {grade.grade} {grade.price.toLocaleString()}원
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
                                    <div className={styles.seat_selected_header_text2}>좌석번호(구역-행-열)</div>
                                </div>
                                <div className={styles.seat_selected_content}>
                                {
                                    selectedSeats.map((seat, index)=>{
                                        return(
                                            <div className={styles.seat_selected_content_box} key={index}>
                                                <div className={styles.seat_selected_content_text1}>{seat.grade}</div>
                                                <div className={styles.seat_selected_content_text2}>{selectSection}-{seat.seatId}</div>
                                            </div>
                                        );
                                    })
                                }
                                </div>
                            </div>
                        </div>
                        <div className={styles.next_page}>
                            <button style={{textAlign:"center"}} onClick={handlePriceModal}>다음페이지</button>
                        </div>
                    </div>
                </div>
                 <PriceModal isOpen={priceModal} onClose={handleClosePriceModal} onBookClose={handleCloseBookModal}/>
            </div>
            )}
        </div>
    );

}