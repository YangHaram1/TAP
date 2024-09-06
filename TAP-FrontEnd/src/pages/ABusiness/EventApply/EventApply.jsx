import { useEffect, useState } from "react"
import styles from './EventApply.module.css'
import { api } from "../../../config/config";
import { useAuthStore } from '../../../store/store'
// import MyEditor from "../../../components/MyEditor/MyEditor";


export const EventApply =()=>{
    const { login, loginID, setAuth, role } = useAuthStore();
    const [age, setAge] = useState();   // '전연령', '8세', '15세'

    const [formData, SetFormData] = useState({
        id: loginID, 
        name: '', 
        place_seq: '', 
        sub_category_seq: '', 
        genre_seq:'',
        age_limit: '', 
        start_date: '', 
        end_date: '', 
        running_time: '', 
        running_intertime: '', 
        open_date: '', // 여기서 날짜랑 시간 합쳐서 SPRING BOOT , timestamp 형태로 보내기 
        max_ticket: '', 
        away_team_seq: ''
      });

    // db에서 location, category 테이블 정보 받아와서 setLocation, setCategory해주기 - location에 map 으로 select option값 넣기 . 
    const [selectedPlace, setSelectedPlace] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [genres, setGenres] = useState([]);
    const [teams, setTeams] = useState([]);
    const [artLocations, setArtLocations] = useState([]);
    const [teamLocations, setTeamLocations] = useState([]);
    const [selectedTeam ,setSelectedTeam] = useState([]);
    const [selectedTeamType ,setSelectedTeamType] = useState([]);

    // 스케쥴 변수
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [scheduleList, setScheduleList] = useState([]);
    // 예외 스케쥴 변수
    const [selectedExceptDay, setSelectedExceptDay] = useState("");
    const [scheduleExceptList, setScheduleExceptList] = useState([]);


    useEffect(()=>{
        // // 장소, 카테고리, 세부카테고리, 장르, 팀 db에서 가져오기. 
        api.get(`/biz/application/category`).then((resp) => {
            setCategories(resp.data);
          }).catch((resp) => {
            alert("이상 오류")
          })
        api.get(`/biz/application/subcategory`).then((resp) => {
            setSubCategories(resp.data);
            console.log(resp.data)
            }).catch((resp) => {
            alert("이상 오류")
            })
        api.get(`/biz/application/team`).then((resp) => {
            setTeams(resp.data);
            }).catch((resp) => {
            alert("이상 오류")
            })
        api.get(`/biz/application/genre`).then((resp) => {
            setGenres(resp.data);
            }).catch((resp) => {
            alert("이상 오류")
            })
        api.get(`/biz/application/location`).then((resp) => {
            setArtLocations(resp.data);
            }).catch((resp) => {
            alert("이상 오류")
            })
        api.get(`/biz/application/teamlocation`).then((resp) => {
            setTeamLocations(resp.data);
            }).catch((resp) => {
            alert("이상 오류")
            })
    },[])
   
    const handleCategory =(e)=>{
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        setCategory(selectedValue);
        SetFormData({ ...formData, sub_category: "" });
        console.log(selectedValue);
    }
    const handleChange=(e)=>{
        const {name, value} = e.target;
        SetFormData({...formData, [name]:value});
        console.log(formData)
    }
    const handleSelectPlace =(e)=>{
        console.log(e.target.value)
        const selectedValue = e.target.value;
        setSelectedPlace(selectedValue);

        const selectedPlaceData = teamLocations.find((location) => location.PLACE_SEQ.toString() === selectedValue);
        setSelectedTeam(selectedPlaceData ? selectedPlaceData.TEAM_NAME : '')
        setSelectedTeamType(selectedPlaceData ? selectedPlaceData.TEAM_TYPE : '');
    }
    const handleAddSchedule = () => {
        if (selectedDay && selectedTime) {
            setScheduleList([...scheduleList, { day: selectedDay, time: selectedTime }]);
            setSelectedDay(""); // 초기화
            setSelectedTime(""); // 초기화
        } else {
            alert("요일과 시간을 모두 선택해주세요.");
        }
    };
    const handleAddException=()=>{
        if(selectedExceptDay){
            setScheduleExceptList([...scheduleExceptList, {day: selectedExceptDay}]);
            setSelectedExceptDay(""); // 초기화
        }else {
            alert("제외일을 선택해주세요.");
        }
    }

     // 2차 카테고리 옵션 생성
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
     // 장소 선택 옵션 생성
    const getLocationOptions = () => {
        if (category === "2") {
            return teamLocations.map(place => (
                <option key={place.PLACE_SEQ} value={place.PLACE_SEQ}>
                    {place.PLACE_NAME}
                </option>
            ));
        }else if(category === "1"){
            return artLocations.map(place => (
                <option key={place.PLACE_SEQ} value={place.PLACE_SEQ}>
                    {place.PLACE_NAME}
                </option>
            ));
        } 
    }
    // 원정팀 선택 옵션 생성
    const getAwayTeams=()=>{
        return teams.filter((team) =>  team.TEAM_TYPE === selectedTeamType && team.TEAM_NAME !== selectedTeam)
                    .map(team =>(
                        <option key={team.TEAM_SEQ} value={team.TEAM_SEQ}>{team.TEAM_NAME}</option>
                    ))
    }

    const handleSubmit=()=>{
        api.post(`/biz/application`, formData).then((resp)=>{

        }).catch((resp)=>{
            alert("잘못됨")
        })
    }
    return(
        <div className={styles.container}>
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
                                <option>선택</option>
                                {categories.map(cate => (
                                    <option key={cate.CATEGORY_SEQ} value={cate.CATEGORY_SEQ}>
                                        {cate.CATEGORY_NAME}
                                    </option>
                                ))}
                            </select>
                            <span className={styles.Gap}></span>
                             2차: <select name="sub_category_seq" value={formData.sub_category_seq} onChange={handleChange}>
                                <option value="">선택</option>
                                {getSubCategoryOptions()}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>상품명</td>
                        <td>
                            <input type="text" placeholder="상품명 입력" name="eventName" value={formData.eventName} onChange={handleChange}></input>
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
                    {category === "2"  && 
                    <tr>
                        <td> 경기 팀</td>
                        <td>
                            {selectedPlace === "" 
                                ? <input type="text" placeholder="장소 선택시 출력됩니다" disabled /> 
                                : selectedTeam
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
                        <td>일자</td>  {/* 일자는 무조건 기입 */}
                        <td>
                            시작일: <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} className={styles.shortInput}></input>
                            <span className={styles.Gap}></span>
                            종료일: <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} className={styles.shortInput}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>시작시간( 스케쥴 테이블에 )</td>
                        <td>
                            <select className={styles.shortInput} value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                                <option value="">요일</option>
                                <option value="월">월</option>
                                <option value="화">화</option>
                                <option value="수">수</option>
                                <option value="목">목</option>
                                <option value="금">금</option>
                                <option value="토">토</option>
                                <option value="일">일</option>
                            </select>
                            <span className={styles.Gap}></span>
                            시간: <input type="time" step="300" required className={styles.shortInput} value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}></input>
                            <span className={styles.Gap}></span>
                            <button onClick={handleAddSchedule}>추가</button>
                            <br></br>
                            <ul>
                                {scheduleList.map((schedule, index) => (
                                    <li key={index}>{schedule.day} - {schedule.time} <button>x</button></li> 
                                ))}
                            </ul>
                            <br></br>
                            제외일: <input type="date" value={selectedExceptDay} onChange={(e)=> setSelectedExceptDay(e.target.value)}></input>
                            <span className={styles.Gap}></span>
                            <button onClick={handleAddException}>추가</button>
                            <br></br>
                            <ul>
                                {scheduleExceptList.map((schedule, index) => (
                                    <li key={index} style={{color:"red"}} > 
                                        {schedule.day}
                                        <button>x</button> 
                                    </li> 
                                ))}
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>러닝타임</td>
                        <td>
                            <input type="radio" name="running" value="yes"/>러닝타임(인터미션 포함) : <input type="text" style={{width:"50px"}}/>분  <span style={{fontSize:"13px"}}>(인터미션 :<input type="text" style={{width:"50px"}} />분)</span>
                            <br></br>
                            <input type="radio" name="running" value="no" />러닝타임없음
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
                    <td> 글자 색상 변경만 되고 텍스트만 입려되게</td>
                    <td> 
                        {/* <MyEditor/> */}
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
                {/* 공연일 경우 나타나게 */}
                <tr>
                    <td>캐스팅 이미지</td>
                    <td>
                        <input type="file"/>
                        <input type="text" placeholder="배우 이름" className={styles.shortInput}/>
                        <span className={styles.Gap}></span>
                        <input type="text" placeholder="역할" className={styles.shortInput}/>
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
    )
}