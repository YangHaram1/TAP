import { useEffect, useState } from "react"
import styles from './EventApply.module.css'
import { api } from "../../../config/config";


export const EventApply =()=>{
    const [age, setAge] = useState();   // '전연령', '8세', '15세'

    const [formData, SetFormData] = 
    useState({business_id:'', eventName:'', sub_category:'',place:'',age_limit:'', start_date:'', end_date:'', running_existed:'', running_time:'', intermission_time:'', expected_open_date:'', max_ticket:'', away_tem:'' })

    // db에서 location, category 테이블 정보 받아와서 setLocation, setCategory해주기 - location에 map 으로 select option값 넣기 . 
    const [selectedPlace, setSelectedPlace] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [genres, setGenres] = useState([]);
    const [teams, setTeams] = useState([]);
    const [artLocations, setArtLocations] = useState([]);
    const [teamLocations, setTeamLocations] = useState([]);
    const [selectedTeam ,setSelectedTeam] = useState([]);
    useEffect(()=>{
        // // 장소, 카테고리, 세부카테고리, 장르, 팀 db에서 가져오기. 
        api.get(`/biz/category`).then((resp) => {
            setCategories(resp.data);
          }).catch((resp) => {
            alert("이상 오류")
          })
        api.get(`/biz/subcategory`).then((resp) => {
            setSubCategories(resp.data);
            }).catch((resp) => {
            alert("이상 오류")
            })
        api.get(`/biz/genre`).then((resp) => {
            setGenres(resp.data);
            }).catch((resp) => {
            alert("이상 오류")
            })
        api.get(`/biz/location`).then((resp) => {
            setArtLocations(resp.data);
            console.log(resp.data)
            }).catch((resp) => {
            alert("이상 오류")
            })
        api.get(`/biz/teamlocation`).then((resp) => {
            setTeamLocations(resp.data);
            console.log(resp.data)
            }).catch((resp) => {
            alert("이상 오류")
            })
    },[])
   
    const handleCategory =(e)=>{
        setCategory(e.target.value);
        console.log(e.target.value)
    }
    const handleChange=(e)=>{
        const {name, value} = e.target;
        SetFormData=({...formData, [name]:value});
        console.log(formData)
    }
    const handleSelectPlace =(e)=>{
        console.log(e.target.value)
        const selectedValue = e.target.value;
        setSelectedPlace(selectedValue);

        const selectedPlaceData = teamLocations.find((location) => location.PLACE_SEQ.toString() === selectedValue);
        setSelectedTeam(selectedPlaceData ? selectedPlaceData.TEAM_NAME : '')
    }
    const handleAddSchedule=()=>{
        console.log();
    }
    const handleAddException=()=>{
        console.log();
    }

     // 카테고리에 따라 2차 옵션을 결정
  const getSubCategoryOptions = () => {
    // 여기서도 map으로 돌려야함. category_seq(1,2,--- )에 따라 filter로 category_seq가 같은것만 뽑아서 map으로 돌려야함. 
  
    if (category === "1") {
      // 공연일 때
      return (
        <>
        {subCategories.map(cate =>(
            <option key={cate.SUB_CATEGORY_SEQ} value={cate.SUB_CATEGORY_SEQ}>{cate.SUB_CATEGORY_NAME}</option>
        ))}
        </>
      );
    } else if (category === "2") {
      return (
        <>
          <option value="baseball">야구</option>
          <option value="soccer">축구</option>
        </>
      );
    } else {
      return <option>선택</option>; // 기본값
    }
  };

    // 여기에 점주고객 category가 공연, 스포츠인지에 따라 form 양식 달라짐으로 가는거 어떨??
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>상품 신규 등록</h2>
            </div>
            <div className={styles.title}>
                <p>기초 정보 입력</p>
            </div>
            <table className={styles.table}>
                <tr>
                    <td>상품 카테고리</td>
                    <td>
                        1차: 
                        <select name="categories" onChange={handleCategory}>
                            <option>선택</option>
                            {categories.map(cate =>(
                                <option key={cate.CATEGORY_SEQ} value={cate.CATEGORY_SEQ}>{cate.CATEGORY_NAME}</option>
                            ))}
                        </select>
                        2차: {/* 1차 카테고리에 따라 option 이름 다름. */}
                        <select name="sub_category" value={formData.sub_category} onChange={handleChange}>
                            {getSubCategoryOptions()}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>상품명</td>
                    <td>
                        <input type="text" placeholder="상품명 입력" name="eventName" ></input>
                    </td>
                </tr>
                <tr>
                    <td>관람등급</td>  
                    <td>
                        <select>
                            <option>선택</option>
                            <option>ALL</option>
                            <option>8세</option>
                            <option>12세</option>
                            <option>18세</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>장소</td>
                    <td>
                        {category === "2" ? 
                            <select onChange={handleSelectPlace}>
                                <option>선택</option>
                                {teamLocations.map(place =>(
                                    <option key={place.PLACE_SEQ} value={place.PLACE_SEQ} >{place.PLACE_NAME}</option>
                                ))}
                            </select>
                            : <select onChange={handleSelectPlace}>
                                <option>선택</option>
                                {artLocations.map(place =>(
                                    <option key={place.PLACE_SEQ} value={place.PLACE_SEQ} >{place.PLACE_NAME}</option>
                                ))}
                            </select>
                        }
                    </td>
                </tr>
                {/* 스포츠 경기장 선택한거 표나도록 */}
                {category === "2"  && 
                <tr>
                    <td> 경기 팀</td>
                    {selectedPlace === "" ? 
                        <td> <input type="text"/> VS <input type="text" placeholder="원정팀명 입력"/></td>
                         : 
                        <td> {selectedTeam || <input type="text" placeholder="장소 선택시 출력됩니다" disabled/>} VS <input type="text" placeholder="원정팀"/></td>
                    }
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
                        시작일: <input type="date"></input>
                        종료일: <input type="date"></input>
                    </td>
                </tr>
                <tr>
                    <td>시작시간</td>
                    <td>
                        <select>
                            <option>요일</option>
                            <option>월</option>
                            <option>화</option>
                            <option>수</option>
                            <option>목</option>
                            <option>금</option>
                            <option>토</option>
                            <option>일</option>
                        </select>
                        {/* 시간: <input type="time" step="300" required></input> */}
                        시간:  <input type="time" name="appt-time" step={300} />
                        <button onClick={handleAddSchedule}>추가</button>
                        <br></br>
                        제외일: <input type="date"></input>
                        <button onClick={handleAddException}>추가</button>
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
                        <input type="date"/>
                        <input type="time"/>
                    </td>
                </tr>
            </table>

            <div className={styles.title}>
                <p>상세 정보 입력</p>
            </div>
            <table className={styles.table}>
                <tr>
                    <td>공지사항</td>
                    <td> 글자 색상 변경만 되고 텍스트만 입려되게</td>
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
                        <input type="text" placeholder="배우 이름"/>
                        <input type="text" placeholder="역할"/>
                        <button>추가버튼</button>
                    </td>
                </tr>
            </table>

            <button>신청</button>
            <button>임시저장</button>
            <button>취소</button>

        </div>
    )
}