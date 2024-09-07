import { useEffect, useRef, useState } from "react";
import styles from './EventApply.module.css';
import { api } from "../../../config/config";
import { useAuthStore } from '../../../store/store';
import MyEditor from "../../../components/MyEditor/MyEditor";

export const EventApply = () => {
    const { login, loginID, setAuth, role } = useAuthStore();
    const editorRef = useRef();
    const [category, setCategory] = useState()
    const [isRunningTimeEnabled, setIsRunningTimeEnabled] = useState(false); // New state variable
   
    const [formData, SetFormData] = useState({
        id: loginID, 
        name: '', 
        place_seq: '', 
        sub_category_seq: '', 
        genre_seq: '',
        age_limit: '', 
        start_date: '', 
        end_date: '', 
        running_time: '', 
        running_intertime: '', 
        expected_open_date:'',
        expected_open_time:'',
       // open_date: '', // 여기서 날짜랑 시간 합쳐서 SPRING BOOT , timestamp 형태로 보내기 
        max_ticket: '', 
        away_team_seq: ''
    });

    const [selectedPlace, setSelectedPlace] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filteredGenres, setFilteredGenres] = useState([]);
    const [teams, setTeams] = useState([]);
    const [allLocations, setAllLocations] = useState([]);
    const [teamLocations, setTeamLocations] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState([]);
    const [selectedTeamType, setSelectedTeamType] = useState([]);

    const [selectedDay, setSelectedDay] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [scheduleList, setScheduleList] = useState([]);
    const [selectedExceptDay, setSelectedExceptDay] = useState("");
    const [scheduleExceptList, setScheduleExceptList] = useState([]);
    const [content, setContent] = useState('');
    const [content2, setContent2] = useState('');
    const contentRef = useRef(null);
    useEffect(() => {
        api.get(`/biz/application/category`).then((resp) => {
            setCategories(resp.data);
        }).catch(() => {
            alert("이상 오류");
        });

        api.get(`/biz/application/subcategory`).then((resp) => {
            setSubCategories(resp.data);
        }).catch(() => {
            alert("이상 오류");
        });

        api.get(`/biz/application/team`).then((resp) => {
            setTeams(resp.data);
        }).catch(() => {
            alert("이상 오류");
        });

        api.get(`/biz/application/genre`).then((resp) => {
            setGenres(resp.data);
            setFilteredGenres(resp.data);
        }).catch(() => {
            alert("이상 오류");
        });

        api.get(`/biz/application/location`).then((resp) => {
            setAllLocations(resp.data);
        }).catch(() => {
            alert("이상 오류");
        });

        api.get(`/biz/application/teamlocation`).then((resp) => {
            setTeamLocations(resp.data);
        }).catch(() => {
            alert("이상 오류");
        });

        api.get(`/biz/application/description`).then((resp) => {
            setContent(resp.data[1].description_content);
            setContent2(resp.data[2].description_content);
            contentRef.current.innerHTML = resp.data[1].description_content;
        }).catch(() => {
            alert("이상 오류");
        });
    }, []);
    
    const handleCategory = (e) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        setCategory(selectedValue);
        SetFormData({ ...formData, sub_category_seq: "", genre_seq: "", away_team_seq:"" });

        setSelectedPlace("");
        setSelectedTeam("");
        setSelectedTeamType("")
        setFilteredGenres([]);
    };

    const handleSubCategoryChange = (e) => {
        const selectedSubCategory = e.target.value;
        SetFormData({ ...formData, sub_category_seq: selectedSubCategory, genre_seq: "" });

        const filteredGenres = genres.filter(
            (genre) => genre.SUB_CATEGORY_SEQ.toString() === selectedSubCategory
        );
        setFilteredGenres(filteredGenres);
    };

    useEffect(() => {
        console.log("Updated formData:", formData);
    }, [formData]);

    //=======================================================
    // 요일 배열
    const [weekdays, setWeekdays] = useState([]);
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    // 두 날짜 사이의 요일 구하기
    const getDaysBetweenDates = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        let currentDate = new Date(startDate);
        const daySet = new Set();

        // 시작일부터 종료일까지의 날짜 계산
        while (currentDate <= endDate) {
            daySet.add(currentDate.getDay());
            currentDate.setDate(currentDate.getDate() + 1);
        }
        // 요일을 배열로 변환하여 반환
        const weekdaysArray = Array.from(daySet).sort();
        return ["전체", ...weekdaysArray];
    };
    //=======================================================
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // 시작일과 종료일에 대한 유효성 검사
        if (name === 'start_date' && formData.end_date && value > formData.end_date) {
            alert('시작일은 종료일보다 이후일 수 없습니다.');
            return;
        }
        if (name === 'end_date' && formData.start_date && value < formData.start_date) {
            alert('종료일은 시작일보다 이전일 수 없습니다.');
            return;
        }

        SetFormData({ ...formData, [name]: value });

        //===============================
        // 요일 계산
        if (name === 'start_date' && formData.end_date) {
            const weekdays = getDaysBetweenDates(value, formData.end_date);
            setWeekdays(weekdays);
            // 스케줄 초기화
            setScheduleList([]);
            setScheduleExceptList([]);
        } else if (name === 'end_date' && formData.start_date) {
            const weekdays = getDaysBetweenDates(formData.start_date, value);
            setWeekdays(weekdays);
            // 스케줄 초기화
            setScheduleList([]);
            setScheduleExceptList([]);
        }
    };

    const handleSelectPlace = (e) => {
        const selectedValue = e.target.value;
        setSelectedPlace(selectedValue);

        SetFormData({ ...formData, place_seq: selectedValue});
        
        const selectedPlaceData = teamLocations.find((location) => location.PLACE_SEQ.toString() === selectedValue);
        setSelectedTeam(selectedPlaceData ? selectedPlaceData.TEAM_NAME : '');
        setSelectedTeamType(selectedPlaceData ? selectedPlaceData.TEAM_TYPE : '');
    };


    // 요일 선택 옵션 비활성화를 위한 상태 추가
    const [isDisabled, setIsDisabled] = useState(false);
    const handleAddSchedule = () => {
        if (selectedDay === "전체") {
            // "전체"가 선택되었고, scheduleList가 비어있지 않을 경우
            if (scheduleList.length > 0) {
              const confirmClear = window.confirm(
                "'전체'를 선택하면 기존 스케줄이 초기화됩니다. 계속하시겠습니까?"
              );
              if (confirmClear) {
                // 확인을 누르면 리스트를 초기화하고 "전체" 추가
                setScheduleList([{ day: "전체", time: selectedTime }]);
                setIsDisabled(true); // 다른 요일 옵션 비활성화
                setSelectedDay(""); // 요일 초기화
                setSelectedTime(""); // 시간 초기화
              }
            } else {
              // "전체"만 추가
              setScheduleList([{ day: "전체", time: selectedTime }]);
              setIsDisabled(true); // 다른 요일 옵션 비활성화
              setSelectedDay(""); // 요일 초기화
              setSelectedTime(""); // 시간 초기화
            }
          } else {
            // "전체"가 아닌 경우
            if (!scheduleList.find((item) => item.day === "전체")) {
              // "전체"가 리스트에 없을 때만 추가
              setScheduleList([...scheduleList, { day: selectedDay, time: selectedTime }]);
              setSelectedDay(""); // 초기화
              setSelectedTime(""); // 초기화
            } else {
              alert("이미 '전체'가 선택되어 다른 요일을 추가할 수 없습니다.");
            }
          }
        
          // 스케줄 리스트가 비어있으면 다시 옵션 활성화
          if (scheduleList.length === 0) {
            setIsDisabled(false);
          }
        // if (selectedDay && selectedTime) {
        //     setScheduleList([...scheduleList, { day: selectedDay, time: selectedTime }]);
        //     setSelectedDay(""); // 초기화
        //     setSelectedTime(""); // 초기화
        // } else {
        //     alert("요일과 시간을 모두 선택해주세요.");
        // }
    };
    // 스케쥴 리스트에 있는거 삭제하기
    const handleRemoveSchedule =(indexToRemove)=>{
        // setScheduleList(scheduleList.filter((_, index) => index !== indexToRemove));
        const updatedScheduleList = scheduleList.filter((_, index) => index !== indexToRemove);
        setScheduleList(updatedScheduleList);

        // 스케줄 리스트가 비어 있으면 옵션 활성화
        if (updatedScheduleList.length === 0 || !updatedScheduleList.some(item => item.day === "전체")) {
            setIsDisabled(false);
        }
    }

    // 제외일 변경 함수: 시작일과 종료일 사이인지 확인
    const handleExceptDateChange = (e) => {
        const selectedDate = e.target.value;
        const startDate = new Date(formData.start_date);
        const endDate = new Date(formData.end_date);
        const currentDate = new Date(selectedDate);

        // 시작일과 종료일 사이의 날짜인지 확인
        if (currentDate < startDate || currentDate > endDate) {
            alert('제외일은 시작일과 종료일 사이에 있어야 합니다.');
            return;
        }
        setSelectedExceptDay(selectedDate);
    };

    // 제외일 삭제 함수
    const handleRemoveException = (indexToRemove) => {
        setScheduleExceptList(scheduleExceptList.filter((_, index) => index !== indexToRemove));
    };
    const handleAddException = () => {
        if (selectedExceptDay) {
            setScheduleExceptList([...scheduleExceptList, { day: selectedExceptDay }]);
            setSelectedExceptDay(""); // 초기화
        } else {
            alert("제외일을 선택해주세요.");
        }
    };

    const getSubCategoryOptions = () => {
        const filteredSubCategories = subCategories.filter(
            (subCategory) => subCategory.CATEGORY_SEQ.toString() === category
        );

        return filteredSubCategories.map((subCategory) => (
            <option key={subCategory.SUB_CATEGORY_SEQ} value={subCategory.SUB_CATEGORY_SEQ}>
                {subCategory.SUB_CATEGORY_NAME}
            </option>
        ));
    };

    const getLocationOptions = () => {
        if (category && formData.sub_category_seq) {
           if (category === "2") {
            // team_type이랑 sub_category_seq랑 같은 거 filter
            const filteredTeamLocations = teamLocations.filter(place => place.TEAM_TYPE === formData.sub_category_seq);
            return filteredTeamLocations.map(place => (
                <option key={place.PLACE_SEQ} value={place.PLACE_SEQ}>
                    {place.PLACE_NAME}
                </option>
            ));
            } else if (category === "1") {
                return allLocations.map(place => (
                    <option key={place.PLACE_SEQ} value={place.PLACE_SEQ}>
                        {place.PLACE_NAME}
                    </option>
                ));
            }
        }
        // 카테고리 2개 선택안하면 디폴트 '선택'으로
        return <option value="">선택</option>;
    };

    const getAwayTeams = () => {
        return teams.filter((team) => team.TEAM_TYPE === selectedTeamType && team.TEAM_NAME !== selectedTeam)
            .map(team => (
                <option key={team.TEAM_SEQ} value={team.TEAM_SEQ}>{team.TEAM_NAME}</option>
            ));
    };

    const getGenres = () => {
         if (category && formData.sub_category_seq) {
            return filteredGenres.map((genre) => (
                <option key={genre.GENRE_SEQ} value={genre.GENRE_SEQ}>
                    {genre.GENRE_NAME}
                </option>
            ));
        } else {
            return <option value="">선택</option>;
        }
    };
    // Handle radio button change to enable or disable running time inputs
    const handleRunningTimeChange = (e) => {
        setIsRunningTimeEnabled(e.target.value === "yes");
    };

    const handleSubmit = () => {
        api.post(`/biz/application`, formData).then((resp) => {

        }).catch(() => {
            alert("잘못됨");
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.imgContent}>
            <div className={styles.viewCont} ref={contentRef}></div>
            <p>abc하이abc</p>
                {/* db에서 이미지태그 집어넣은거 확인해보기. gcs의 URL은 출력안됨. 일반 URL은 출력됨 */}
                <div dangerouslySetInnerHTML={{ __html: content }} />
                <div dangerouslySetInnerHTML={{ __html: content2 }} />
            </div>
            <div className={styles.header}>
                <h2>상품 신규 등록</h2>
            </div>
            <div className={styles.title}>
                <p>기초 정보 입력</p>
            </div>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <td>상품 카테고리</td>
                            <td>
                                1차: <select name="categories" onChange={handleCategory}>
                                    <option value="">선택</option>
                                    {categories.map(cate => (
                                        <option key={cate.CATEGORY_SEQ} value={cate.CATEGORY_SEQ}>
                                            {cate.CATEGORY_NAME}
                                        </option>
                                    ))}
                                </select>
                                <span className={styles.Gap}></span>
                                2차: <select name="sub_category_seq" value={formData.sub_category_seq} onChange={handleSubCategoryChange}>
                                    <option value="">선택</option>
                                    {getSubCategoryOptions()}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>장르</td>
                            <td>
                                <select name="genre_seq" value={formData.genre_seq} onChange={handleChange}>
                                    <option value="">선택</option>
                                    {getGenres()}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>상품명</td>
                            <td>
                                <input type="text" placeholder="상품명 입력" name="name" value={formData.name} onChange={handleChange}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>관람등급</td>
                            <td>
                                <select name="age_limit" value={formData.age_limit} onChange={handleChange}>
                                    <option value="">선택</option>
                                    <option value="ALL">ALL</option>
                                    <option value="8세">8세</option>
                                    <option value="12세">12세</option>
                                    <option value="18세">18세</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>장소</td>
                            <td>
                                <select onChange={handleSelectPlace}>
                                    <option value="">선택</option>
                                    {getLocationOptions()}
                                </select>
                            </td>
                        </tr>
                        {category === "2" &&
                            <tr>
                                <td> 경기 팀</td>
                                <td>
                                    {selectedPlace 
                                        ? selectedTeam 
                                        : <input type="text" placeholder="장소 선택시 출력됩니다" disabled />  
                                    }
                                    <span className={styles.Gap}></span>
                                    VS
                                    <span className={styles.Gap}></span>
                                    <select name="away_team_seq" value={formData.away_team_seq} onChange={handleChange}>
                                        <option value="">원정팀 선택</option>
                                        {getAwayTeams()}
                                    </select>
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>좌석 등급 및 가격</td>
                            <td>
                                {/* 장소 선택 시 자동 설정되게 */}
                            </td>
                        </tr>
                        <tr>
                            <td>일자</td>
                            <td>
                                시작일: <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} className={styles.shortInput}></input>
                                <span className={styles.Gap}></span>
                                종료일: <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} className={styles.shortInput}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>시작시간( 스케쥴 테이블에 )</td>
                            <td>
                                <select className={styles.shortInput} value={selectedDay} 
                                onChange={(e) => setSelectedDay(e.target.value)}
                                disabled={isDisabled && selectedDay !== "전체"} 
                                >
                                    <option value="">요일</option>
                                    {weekdays.map((day, index) => (
                                    <option key={index} value={day === "전체" ? "전체" : daysOfWeek[day]}
                                    disabled={isDisabled && day !== "전체"} 
                                    >
                                        {day === "전체" ? "전체" : daysOfWeek[day]}
                                    </option>
                                    ))}
                                </select>
                                <span className={styles.Gap}></span>
                                시간: <input type="time" step="300" required className={styles.shortInput} value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}></input>
                                <span className={styles.Gap}></span>
                                <button onClick={handleAddSchedule}>추가</button>
                                <br></br>
                                <ul>
                                    {scheduleList.map((schedule, index) => (
                                        <li key={index}>
                                            {schedule.day} - {schedule.time} 
                                            <button onClick={() => handleRemoveSchedule(index)}>x</button>
                                        </li>
                                    ))}
                                </ul>
                                <br></br>
                                제외일: <input type="date" value={selectedExceptDay} onChange={handleExceptDateChange}></input>
                                <span className={styles.Gap}></span>
                                <button onClick={handleAddException}>추가</button>
                                <br></br>
                                <ul>
                                    {scheduleExceptList.map((schedule, index) => (
                                        <li key={index} style={{ color: "red" }}>
                                            {schedule.day}
                                            <button onClick={() => handleRemoveException(index)}>x</button>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>러닝타임</td>
                            <td>
                                <input type="radio"  name="running"  value="yes"  onChange={handleRunningTimeChange} />
                                러닝타임(인터미션 포함) : 
                                <input 
                                    type="text" 
                                    name="running_time" 
                                    value={formData.running_time} 
                                    onChange={handleChange} 
                                    style={{ width: "50px" }} 
                                    disabled={!isRunningTimeEnabled} // Disable based on state
                                /> 분
                                <span style={{ fontSize: "13px" }}>
                                (인터미션: 
                                <input 
                                    type="text" 
                                    name="running_intertime" 
                                    value={formData.running_intertime} 
                                    onChange={handleChange} 
                                    style={{ width: "50px" }} 
                                    disabled={!isRunningTimeEnabled} // Disable based on state
                                /> 분)
                                </span>
                                <br></br>
                                <input type="radio" name="running" value="no"
                                 onChange={() => SetFormData({ ...formData, running_time: '0', running_intertime: '0' })} />러닝타임없음
                            </td>
                        </tr>
                        <tr>
                            <td>최대 티켓 수량</td>
                            <td>
                                <select name="max_ticket"
                                    value={formData.max_ticket}
                                    onChange={handleChange}>
                                 {[...Array(20).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>티켓 오픈 희망일</td>
                            <td>
                                <input type="date" name="expected_open_date" value={formData.expected_open_date} onChange={handleChange} />
                                <span className={styles.Gap}></span>
                                <input type="time" name="expected_open_time" value={formData.expected_open_time} onChange={handleChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={styles.title}>
                <p>상세 정보 입력</p>
            </div>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td>공지사항</td>
                        <td>
                            글자 색상 변경만 되고 텍스트만 입려되게
                            {/* <MyEditor editorRef={editorRef} /> */}
                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr>
                        <td>메인 포스터</td>
                        <td><input type="file" placeholder="메인포스터 1하나만 "></input></td>
                    </tr>
                    <tr>
                        <td>상세페이지</td>
                        <td>
                            에디터 적용 - 미리보기 플러그인도 추가
                        </td>
                    </tr>
                    <tr>
                        <td>캐스팅 이미지</td>
                        <td>
                            <input type="file" />
                            <input type="text" placeholder="배우 이름" className={styles.shortInput} />
                            <span className={styles.Gap}></span>
                            <input type="text" placeholder="역할" className={styles.shortInput} />
                            <span className={styles.Gap}></span>
                            <button>추가버튼</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button onClick={handleSubmit}>신청</button>
            <button>임시저장</button>
            <button>취소</button>

        </div>
    );
};
