import { useEffect, useState } from "react"
import styles from './EventApply.module.css'


export const EventApply =()=>{
    const [genre, setGenre] = useState('perform', 'sport');
    const [age, setAge] = useState();   // '전연령', '8세', '15세'

    const [formData, SetFormData] = 
    useState({business_id:'', eventName:'', sub_category:'',place:'',age_limit:'', start_date:'', end_date:'', running_existed:'', running_time:'', intermission_time:'', expected_open_date:'', max_ticket:'', away_tem:'' })

    // db에서 location, category 테이블 정보 받아와서 setLocation, setCategory해주기 - location에 map 으로 select option값 넣기 . 
    const [location, setLocation] = useState();
    const [category, setCategory] = useState();

   
    const handleCategory =(e)=>{
        setCategory(e.target.value)
    }
    const handleChange=(e)=>{
        const {name, value} = e.target;
        SetFormData=({...formData, [name]:value})
    }
    const handleAddSchedule=()=>{

    }
    const handleAddException=()=>{

    }

     // 카테고리에 따라 2차 옵션을 결정
  const getSubCategoryOptions = () => {
    if (category === "1") {
      // 공연일 때
      return (
        <>
          <option value="musical">뮤지컬</option>
          <option value="concert">콘서트</option>
        </>
      );
    } else if (category === "2") {
      // 스포츠일 때
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
            <div>
                <input type="text" placeholder="공연 검색"></input>
            </div>
            <div>
                <h2>상품 신규 등록</h2>
            </div>
            <div>
                <p>기초 정보 입력</p>
            </div>
            <table>
                <tr>
                    <td>상품장르</td>
                    <td>
                        1차: 
                        <select name="category" onChange={handleCategory}>
                            <option>선택</option>
                            {/* 하드코딩 말고 map으르 가져오는 걸로 db완성 후 변경하기 - 우와... 이러면 여기도 1차카테고리하려면 JOIN 카테고리 & 세부카테고리 해야하네... */}
                            {/* {category.map(cate =>(
                                <option key={cate.CATEGORY_SEQ} value={cate.CATEGORY_SEQ}>{cate.CATEGORY_NAME}</option>
                            ))} */}
                            <option value="1">공연</option>             
                            <option value="2"> 스포츠</option>
                        </select>
                        2차: {/* 1차 카테고리에 따라 option 이름 다름. */}
                        <select
                        name="sub_category"
                        value={formData.sub_category}
                        onChange={handleChange}
                        >
                        {getSubCategoryOptions()}
                        </select>
                    </td>
                </tr>
                <tr>
                 
                    <td>상품명</td>
                    <td>
                        <input type="text" placeholder="상품명 입력" name="eventName" value={formData.eventName}></input>
                    </td>
                </tr>
                <tr>
                    <td>관람등급</td>       {/* 얘는 하드코딩...? 그냥 하드코딩 갑시다... */}
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
                        <select>
                            <option>선택</option>
                            {/* db에서 장소테이블 가져오기 - 공연, 스포츠에 따라 option 변경 */}
                            {/* {location.map(place =>(
                                <option key={place.PLACE_SEQ} value={place.PLACE_SEQ}>{place.PLACE_NAME}</option>
                            ))} */}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>좌성 등급 및 가격</td>
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
                        시간: <input type="time"></input>
                        <button onClick={handleAddSchedule}>추가</button>
                        <br></br>
                        제외일: <input type="date"></input>
                        <button onClick={handleAddException}>추가</button>
                    </td>
                </tr>
                <tr>
                    <td>러닝타임</td>
                    <td>
                        <input type="radio"/>러닝타임(인터미션 포함) <input type="text"></input> 분  인터미션 <input type="text"></input>분
                        <br></br>
                        <input type="radio"/>러닝타임없음
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

            <h2>상세 정보 입력</h2>
            <table>
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