import { useEffect, useRef, useState } from "react";
import styles from './EventApply.module.css';
import { api } from "../../../config/config";
import { useAuthStore } from '../../../store/store';
import {eachDayOfInterval, format, getDay} from 'date-fns';
import BizNoticeEditor from "../../../components/QuillEditor/BizNoticeEditor";
import { useNavigate } from "react-router-dom";
import MyEditor from "../../Chat/MyEditor/MyEditor";
import MyEditorOnlyAdmin from "../../../components/MyEditor/MyEditorOnlyAdmin";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";

export const EventApply = () => {
    const { login, loginID, setAuth} = useAuthStore();
    const navi = useNavigate();

    const [category, setCategory] = useState()
    const [isRunningTimeEnabled, setIsRunningTimeEnabled] = useState(false);
   
    const [formData, setFormData] = useState({
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
        open_date: '', // 여기서 날짜랑 시간 합쳐서 SPRING BOOT , timestamp 형태로 보내기 
        max_ticket: '', 
        away_team_seq: ''
    });
    
    const [seats, setSeats] = useState([]);
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
        api.get(`/biz/application/seats`).then(resp=>{
            setSeats(resp.data);
            console.log(resp.data)
        })

        // api.get(`/biz/application/description`).then((resp) => {
        //     setContent(resp.data[1].description_content);
        //     setContent2(resp.data[2].description_content);
        //     contentRef.current.innerHTML = resp.data[1].description_content;
        // }).catch(() => {
        //     alert("이상 오류");
        // });
    }, []);
    
    const handleCategory = (e) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        setCategory(selectedValue);
        setFormData({ ...formData, sub_category_seq: "", genre_seq: "", away_team_seq:"" });

        setSelectedPlace("");
        setSelectedTeam("");
        setSelectedTeamType("")
        setFilteredGenres([]);
    };

    const [subCategory, setSubCategory] = useState("");
    const [subCategoryName, setSubCategoryName] = useState("");
    const handleSubCategoryChange = (e) => {
        const selectedSubCategory = e.target.value;
        setSubCategory(selectedSubCategory);
        setFormData({ ...formData, sub_category_seq: selectedSubCategory, genre_seq: "" });
        if(selectedSubCategory == "1"){
            setSubCategoryName("musical");
        }else if(selectedSubCategory == "2"){
            setSubCategoryName("concert");
        }else if(selectedSubCategory =="3"){
            setSubCategoryName("baseball");
        }else if(selectedSubCategory =="4"){
            setSubCategoryName("football");
        }
        const filteredGenres = genres.filter(
            (genre) => genre.SUB_CATEGORY_SEQ.toString() === selectedSubCategory
        );
        setFilteredGenres(filteredGenres);
    };

    // 조건부 렌더링을 위해 카테고리 및 서브 카테고리 선택 여부 확인
    const isCategorySelected = formData.category !== '';
    const isSubCategorySelected = formData.sub_category_seq !== '';

   
    //=======================================================
    // 요일 배열
    const [weekdays, setWeekdays] = useState([]);
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토",];

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
   
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => {
            const updatedData = { ...prevData, [name]: value };

            // 티켓 오픈 날짜와 시간 통합
            // if (name === 'expected_open_date' || name === 'expected_open_time') {
            //     const combinedDateTime = `${updatedData.expected_open_date}T${updatedData.expected_open_time}`;
            //     updatedData.open_date = combinedDateTime;
            // }
            // 시작일과 종료일 유효성 검사
            if (name === 'start_date' && updatedData.end_date && value > updatedData.end_date) {
                alert('시작일은 종료일보다 이후일 수 없습니다.');
                return prevData;
            }
            if (name === 'end_date' && updatedData.start_date && value < updatedData.start_date) {
                alert('종료일은 시작일보다 이전일 수 없습니다.');
                return prevData;
            }

            // 요일 계산
            if (name === 'start_date' && updatedData.end_date) {
                const weekdays = getDaysBetweenDates(value, updatedData.end_date);
                setWeekdays(weekdays);
                setScheduleList([]);
                setScheduleExceptList([]);
            } else if (name === 'end_date' && updatedData.start_date) {
                const weekdays = getDaysBetweenDates(updatedData.start_date, value);
                setWeekdays(weekdays);
                setScheduleList([]);
                setScheduleExceptList([]);
            }

            return updatedData;
        });
    };


    const handleSelectPlace = (e) => {
        const selectedValue = e.target.value;
        setSelectedPlace(selectedValue);

        setFormData({ ...formData, place_seq: selectedValue});
        
        const selectedPlaceData = teamLocations.find((location) => location.PLACE_SEQ.toString() === selectedValue);
        setSelectedTeam(selectedPlaceData ? selectedPlaceData.TEAM_NAME : '');
        setSelectedTeamType(selectedPlaceData ? selectedPlaceData.TEAM_TYPE : '');
    };


// 스케쥴 추가하기
    const [totalSchedule, setTotalSchedule] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleAddSchedule = () => {
        if (!selectedDay || !selectedTime) {
            return false;
        }
    
        const startDate = new Date(formData.start_date);
        const endDate = new Date(formData.end_date);
        const allDates = eachDayOfInterval({ start: startDate, end: endDate });
        const selectedDayIndex = parseInt(selectedDay, 10); // `selectedDay`를 숫자로 변환
    
        if (selectedDay === "전체") {
            // "전체"가 선택되었고, scheduleList가 비어있지 않을 경우
            if (scheduleList.length > 0) {
                const confirmClear = window.confirm(
                    "'전체'를 선택하면 기존 스케줄이 초기화됩니다. 계속하시겠습니까?"
                );
                if (confirmClear) {
                    const allDatesFormatted = allDates.map((date) => ({
                        schedule_day: format(date, "yyyy-MM-dd"), // 날짜 형식 변환
                        schedule_time: selectedTime,
                    }));
    
                    setTotalSchedule(allDatesFormatted);
                    setScheduleList([{ schedule_day: "전체", schedule_time: selectedTime }]);
                    setIsDisabled(true); // 다른 요일 옵션 비활성화
                    setSelectedDay(""); // 요일 초기화
                    setSelectedTime(""); // 시간 초기화
                }
            } else {
                const allDatesFormatted = allDates.map((date) => ({
                    schedule_day: format(date, "yyyy-MM-dd"), // 날짜 형식 변환
                    schedule_time: selectedTime,
                }));
    
                setTotalSchedule(allDatesFormatted);
                setScheduleList([{ schedule_day: "전체", schedule_time: selectedTime }]);
                setIsDisabled(true); // 다른 요일 옵션 비활성화
                setSelectedDay(""); // 요일 초기화
                setSelectedTime(""); // 시간 초기화
            }
        } else {
            // "전체"가 아닌 경우
            if (!scheduleList.some((item) => item.schedule_day === "전체")) {
                // 선택된 요일과 매칭되는 날짜들 필터링
                const matchingDates = allDates.filter(
                    (date) => getDay(date) === selectedDayIndex
                );
    
                // 이전의 totalSchedule 상태를 유지하면서 새로운 값을 추가
                setTotalSchedule((prevTotalSchedule) => [
                    ...prevTotalSchedule,
                    ...matchingDates.map((date) => ({
                        schedule_day: format(date, "yyyy-MM-dd"),
                        schedule_time: selectedTime,
                    })),
                ]);
    
                setScheduleList([...scheduleList, { schedule_day: selectedDay, schedule_time: selectedTime }]);
                setSelectedDay(""); // 초기화
                setSelectedTime(""); // 초기화
            } else {
                alert("이미 '전체'가 선택되어 다른 요일을 추가할 수 없습니다.");
            }
        }
    };
        
    // 상태 업데이트 후 옵션 비활성화 체크
    useEffect(() => {
        if (scheduleList.some(item => item.schedule_day === "전체")) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [scheduleList]);

    useEffect(() => {
        console.log("Updated formData:", formData);
    }, [formData, totalSchedule, scheduleExceptList]);
   
   
    const handleRemoveSchedule = (indexToRemove) => {
        // scheduleList에서 항목 제거
        const updatedScheduleList = scheduleList.filter((_, index) => index !== indexToRemove);
        setScheduleList(updatedScheduleList);
    
        // 시작일과 종료일을 가져옴
        const startDate = new Date(formData.start_date);
        const endDate = new Date(formData.end_date);
        const allDates = eachDayOfInterval({ start: startDate, end: endDate });
    
        // 삭제된 항목에 대한 정보 추출
        const removedSchedule = scheduleList[indexToRemove];
    
        // totalSchedule 업데이트
        const updatedTotalSchedule = totalSchedule.filter(schedule => {
            // 현재 schedule이 삭제된 항목과 매칭되는지 확인
            const scheduleDate = new Date(schedule.schedule_day);
            return !(scheduleDate.getDay() === parseInt(removedSchedule.schedule_day, 10) && schedule.schedule_time === removedSchedule.schedule_time);
        });
    
        // 삭제된 항목의 요일과 시간을 기반으로 새로운 날짜들 필터링
        const updatedMatchingDates = allDates.filter(date => {
            return updatedScheduleList.some(schedule => {
                const scheduleDayIndex = parseInt(schedule.schedule_day, 10);
                return getDay(date) === scheduleDayIndex && schedule.schedule_time === schedule.schedule_time;
            });
        }).map(date => ({
            schedule_day: format(date, "yyyy-MM-dd"),
            schedule_time: date.schedule_time,
        }));
    
        // 새로운 totalSchedule 설정
        setTotalSchedule([...updatedMatchingDates]);
    
        // 스케줄 리스트가 비어 있으면 옵션 활성화
        if (updatedScheduleList.length === 0 || !updatedScheduleList.some(item => item.schedule_day === "전체")) {
            setIsDisabled(false);
        }
    };
    
     
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

    const handleAddException = () => {
        if (selectedExceptDay) {
            setScheduleExceptList([...scheduleExceptList, { day: selectedExceptDay }]);
            
            // const updatedTotalSchedule = totalSchedule.filter(schedule => {
            //     return schedule.schedule_day !== selectedExceptDay;
            // })
            // setTotalSchedule(updatedTotalSchedule);
            setSelectedExceptDay(""); // 초기화
        } else {
            alert("제외일을 선택해주세요.");
        }
    };
      // 제외일 삭제 함수
      const handleRemoveException = (indexToRemove) => {
        setScheduleExceptList(scheduleExceptList.filter((_, index) => index !== indexToRemove));
    };

    useEffect(()=>{
        setScheduleCastingList(scheduleList, castingData)
        setFormData(prev=>({...prev, scheduleDate:scheduleList, totalSchedule:totalSchedule, scheduleExceptList:scheduleExceptList}));
    },[scheduleList])

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
    const handleRunningTimeChange = (e) => {
        setIsRunningTimeEnabled(e.target.value === "yes");
    };

    // 캐스팅 상태
    
    const [scheduleCastingList, setScheduleCastingList] = useState([]);
    const [castingData, setCastingData] = useState([]); 
    const [currentSchedule, setCurrentSchedule] = useState(null);

    const [castingImage, setCastingImage] = useState({});   // file_oriname과 gcs에 업로드하고 받은 file_sysname
    const [actorName, setActorName] = useState('');
    const [role, setRole] = useState('');
    const fileInputRef = useRef(null);
    const actorInputRef = useRef(null);
    const characInputRef = useRef(null);

    const handleCastingImageChange = (event) => {
        const file = event.target.files[0];
        if(file){
            const selectedSubCategory = subCategoryName;
            const fileData = new FormData();
            fileData.append('file',file);
            api.post(`/file/${selectedSubCategory}`, fileData)
            .then((response) => {
                console.log("결과 ", response);
                setCastingImage({file_oriname: file.name, file_sysname: response.data})
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
            });

        }

    };

  
    // 각 스케줄별 입력 상태를 관리하는 객체
    const [castingInputs, setCastingInputs] = useState({});
    const fileInputRefs = useRef({});
    const handleLocalActorNameChange = (scheduleKey, value) => {
    setCastingInputs((prev) => ({
        ...prev,
        [scheduleKey]: {
        ...prev[scheduleKey],
        actorName: value,
        },
    }));
    };

    const handleLocalRoleChange = (scheduleKey, value) => {
    setCastingInputs((prev) => ({
        ...prev,
        [scheduleKey]: {
        ...prev[scheduleKey],
        role: value,
        },
    }));
    };
    const handleAddLocalCasting = (schedule) => {
        const scheduleKey = `${schedule.schedule_day}_${schedule.schedule_time}`;
        const currentInputs = castingInputs[scheduleKey] || {};
    
        if (currentInputs.actorName && currentInputs.role && castingImage) {
        setCastingData((prev) => [
            ...prev,
            {
            schedule_day: schedule.schedule_day,
            schedule_time: schedule.schedule_time,
            file_oriname: castingImage.file_oriname,
            file_sysname: castingImage.file_sysname,
            casting_name: currentInputs.actorName,
            casting_role: currentInputs.role,
            },
        ]);
    
        // 입력 필드 초기화
        setCastingInputs((prev) => ({
            ...prev,
            [scheduleKey]: { actorName: '', role: '' },
        }));
        setCastingImage(null);
        if (actorInputRef.current) {
            actorInputRef.current.value = '';
        }
        characInputRef.current.value = null;
        // 스케줄별 파일 입력 필드를 초기화
    if (fileInputRefs.current[scheduleKey]) {
        fileInputRefs.current[scheduleKey].value = '';
      }
        } else {
        alert('모든 필드를 입력해 주세요.');
        }
    };
  //////////////////////////////////////////

    const editorRef = useRef();
    const [noticeContent, setNoticeContent] = useState('');

    const handleContentChange = (newContent) => {
        // <p><br></p> 또는 <br>과 같은 불필요한 태그를 제거
        const sanitizedContent = newContent
            .replace(/<p>(&nbsp;|\s|<br>|<\/?p>)*<\/p>/g, '')  // <p><br></p>와 비슷한 패턴 제거
            .replace(/<br>/g, '')  // <br> 태그 제거
            .trim();  // 공백 제거

        // 실제 내용이 없는 경우 빈 문자열로 설정
        setNoticeContent(sanitizedContent ? newContent : '');
    };



    useEffect(()=>{
        console.log(castingData)
    },[castingData])
    
    const handleRemoveCasting = (scheduleDay, scheduleTime, indexToRemove) => {
        setCastingData(prev => {
            return prev.filter(
                (casting, index) =>
                    !(casting.schedule_day === scheduleDay &&
                      casting.schedule_time === scheduleTime &&
                      index === indexToRemove)
            );
        });
    };

    
    // 상세 description 에디터 ====================
    const handleEditorContentChange = (newContent) => {
        setFormData(prev => ({ ...prev, description_content: newContent }));
    };

    // 메인 포스터 업로드 =====================================================
    const [mainPoster, setMainPoster] = useState([]);
    
    const handleMainPosterChange = (event) => {
        const file = event.target.files[0];
        console.log(file.name);
        console.log(subCategoryName);


      if (file) {
        const selectedSubCategory = subCategoryName;
        const fileData = new FormData();
        fileData.append('file', file);

        api.post(`/file/${selectedSubCategory}`, fileData)
        .then((response) => {
            console.log("결과 ", response);
            setMainPoster({files_oriname: file.name, files_sysname: response.data}); // 업로드 성공 후 상태 업데이트
        })
        .catch((error) => {
            console.error("Error uploading file:", error);
        });
    }
    };
    //
    const handleCancel = ()=>{
        const userConfirmed = window.confirm("작성을 취소하시겠습니까?");
    
        if (userConfirmed) {
            // 사용자가 "확인"을 클릭한 경우
            console.log("작성이 취소되었습니다.");
            // 취소 처리를 여기서 수행하세요
            navi('/'); 
        } else {
            // 사용자가 "취소"를 클릭한 경우
            console.log("작성이 계속됩니다.");
            // 계속하기 처리를 여기서 수행하세요
        }
    };
    const handleSubmit = async () => {
        // 입력값 검증 함수
        const validateForm = () => {
            // 필수 항목들이 비어있는지 확인
            if (!formData.sub_category_seq) {
                alert("카테고리를 선택해 주세요.");
                return false;
            }
            if (!formData.genre_seq) {
                alert("장르를 선택해 주세요.");
                return false;
            }
            if (!formData.name) {
                alert("상품명을 입력해 주세요.");
                return false;
            }
            if (!formData.age_limit) {
                alert("관람등급을 선택해 주세요.");
                return false;
            }
            if (!formData.start_date || !formData.end_date) {
                alert("시작일과 종료일을 입력해 주세요.");
                return false;
            }
            if (formData.start_date > formData.end_date) {
                alert("시작일이 종료일보다 늦을 수 없습니다.");
                return false;
            }
            if (!formData.max_ticket) {
                alert("최대 티켓 수량을 선택해 주세요.");
                return false;
            }
            if (formData.category === "2" && (!formData.away_team_seq || !selectedTeam)) {
                alert("경기 팀을 선택해 주세요.");
                return false;
            }
            if (!formData.open_date){ 
                alert("오픈날짜 선택"); 
                return false;
            }
            if(!formData.running_time ){
                alert("러닝타임 선택");
                return false;
            }
            if(scheduleList.length===0){
                alert("시작시간 설정해라");
                return false;
            }
            if(!mainPoster){alert("메인 포스터를 업로드하세요"); return false;}
            if(!noticeContent){ alert("공지안내를 작성하세요." ); return false;}
            if(subCategory == "1" && castingData.length === 0 ){ alert("캐스팅 작성하세요." ); return false;}
    
            return true;
        };
    
        // 유효성 검사 통과 시에만 서버로 요청
        if (validateForm()) {
            try {
                // 제외일을 기준으로 totalSchedule을 필터링
                const filteredTotalSchedule = totalSchedule.filter(
                    (schedule) => !scheduleExceptList.some((except) => schedule.schedule_day.trim() === except.day.trim())
                );
                // const description = fileUrls;
                const updatedFormData = {
                    ...formData,
                    totalSchedule: filteredTotalSchedule, // 필터링된 totalSchedule 사용
                    noticeContent: noticeContent,
                    main_poster: mainPoster, 
                };
                // 서브 카테고리가 뮤지컬(1)인 경우에만 캐스팅 데이터를 포함
                if (subCategory === "1") {
                    updatedFormData.castingData = castingData;
                }
    
                await api.post(`/biz/application`, updatedFormData);
                alert('신청이 완료되었습니다!');
                // navi('/'); 
                } catch (error) {
                console.error('서버에 전송 중 오류 발생:', error);
                alert('서버에 전송 실패. 다시 시도해 주세요.');
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.imgContent}>
                {/* 에디터 내용 가져오는 건데(2차플젝에서) */}
            {/* <div className={styles.viewCont} ref={contentRef}></div> */}
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
                        </tbody>
                        </table>
                        </div>
                 {/* 장르, 상품명, 관람등급 등 나머지 입력 폼 */}
                 <div className={styles.tableWrapper2}>
                        <table className={styles.table}>
                            <tbody>
                        <tr>
                            <td>장르</td>
                            <td>
                                <select name="genre_seq" value={formData.genre_seq} 
                                  disabled={!isCategorySelected || !isSubCategorySelected} 
                                onChange={handleChange}>
                                    <option value="">선택</option>
                                    {getGenres()}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>상품명</td>
                            <td>
                                <input type="text" placeholder="상품명 입력" name="name" 
                                 disabled={!isCategorySelected || !isSubCategorySelected}
                                value={formData.name} onChange={handleChange}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>관람등급</td>
                            <td>
                                <select name="age_limit" value={formData.age_limit} 
                                 disabled={!isCategorySelected || !isSubCategorySelected}
                                onChange={handleChange}>
                                    <option value="">선택</option>
                                    <option value="전체 연령">전체 연령</option>
                                    <option value="8세">8세</option>
                                    <option value="12세">12세</option>
                                    <option value="18세">18세</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>장소</td>
                            <td>
                                <select onChange={handleSelectPlace}
                                 disabled={!isCategorySelected || !isSubCategorySelected}
                                >
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
                                    <select name="away_team_seq" value={formData.away_team_seq} 
                                    disabled={!isCategorySelected || !isSubCategorySelected}
                                    onChange={handleChange}>
                                        <option value="">원정팀 선택</option>
                                        {getAwayTeams()}
                                    </select>
                                </td>
                            </tr>
                        }
                       <tr>
                            <td>좌석 등급 및 가격</td>
                            <td>
                                {selectedPlace ? (
                                    <ul>
                                        {seats
                                            .filter((seat) => seat.PLACE_SEQ.toString() === selectedPlace)
                                            .map((seat, index) => (
                                                <li key={index}>
                                                    {seat.PLACE_SEAT_LEVEL} - {seat.PRICE_SEAT} 원
                                                </li>
                                            ))}
                                    </ul>
                                ) : (
                                    '좌석 정보를 보려면 장소를 선택하세요.'
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td>일자</td>
                            <td>
                                시작일: <input type="date" name="start_date" value={formData.start_date} 
                                 disabled={!isCategorySelected || !isSubCategorySelected}
                                onChange={handleChange} className={styles.shortInput}></input>
                                <span className={styles.Gap}></span>
                                종료일: <input type="date" name="end_date" value={formData.end_date} 
                                 disabled={!isCategorySelected || !isSubCategorySelected}
                                 onChange={handleChange} className={styles.shortInput}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>시작시간( 스케쥴 테이블에 )</td>
                            <td>
                                <div  className={styles.timeAdd}>
                                <select className={styles.shortInput} value={selectedDay} 
                                //  disabled={!isCategorySelected || !isSubCategorySelected}
                                onChange={(e) => setSelectedDay(e.target.value)}
                                // disabled={isDisabled && selectedDay !== "전체"} 
                                disabled={isDisabled}
                                >
                                    <option value="">요일</option>
                                    {weekdays.map((day, index) => (
                                    <option key={index} value={day === "전체" ? "전체" : day}
                                    disabled={isDisabled && day !== "전체"} 
                                    >
                                        {day === "전체" ? "전체" : daysOfWeek[day]}
                                    </option>
                                    ))}
                                </select>
                                <span className={styles.Gap}></span>
                                시간: 
                                <input type="time" step="300" required className={styles.shortInput} 
                                value={selectedTime} 
                                disabled={!formData.start_date || !formData.end_date}
                                onChange={(e) => setSelectedTime(e.target.value)}></input>
                                <span className={styles.Gap}></span>
                                <button onClick={handleAddSchedule} className={styles.btnInput}>추가</button>
                                </div>
                                <ul>
                                    {scheduleList.map((schedule, index) => (
                                        <li key={index}>
                                            <div className={styles.timeAdd}>
                                            {schedule.schedule_day === "전체"
                                                ? "전체"
                                                : `${daysOfWeek[schedule.schedule_day]}요일`}{" "}
                                            - {schedule.schedule_time}
                                            <button onClick={() => handleRemoveSchedule(index)}  className={styles.btnInput}>x</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div  className={styles.timeAdd}>
                                제외일: <input type="date" value={selectedExceptDay} onChange={handleExceptDateChange}></input>
                                <span className={styles.Gap}></span>
                                <button onClick={handleAddException}  className={styles.btnInput}>추가</button>
                                </div>
                                <ul>
                                    {scheduleExceptList.map((schedule, index) => (
                                        <li key={index} style={{ color: "red" }}>
                                            <div className={styles.timeAdd}>
                                            {schedule.day}
                                            <button onClick={() => handleRemoveException(index)}  className={styles.btnInput}>x</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                        { category === "1" && subCategory === "1" &&  
                            <tr>
                                <td>캐스팅 이미지</td>
                                <td>
                                    {scheduleList.map((schedule, index) => {
                            const scheduleKey = `${schedule.schedule_day}_${schedule.schedule_time}`;
                            const currentInputs = castingInputs[scheduleKey] || { actorName: '', role: '' };

                            return (
                                <ul key={index}>
                                <li>
                                    {schedule.schedule_day === '전체' ? '전체' : daysOfWeek[schedule.schedule_day]} - {schedule.schedule_time}
                                    <br />
                                    <input type="file" 
                                    ref={(el) => (fileInputRefs.current[scheduleKey] = el)}
                                    onChange={handleCastingImageChange} />
                                    <input
                                    type="text"
                                    placeholder="배우 이름"
                                    ref={actorInputRef}
                                    value={currentInputs.actorName}
                                    onChange={(e) => handleLocalActorNameChange(scheduleKey, e.target.value)}
                                    className={styles.shortInput}
                                    />
                                    <span className={styles.Gap}></span>
                                    <input
                                    type="text"
                                    placeholder="역할"
                                    ref={characInputRef}
                                    value={currentInputs.role}
                                    onChange={(e) => handleLocalRoleChange(scheduleKey, e.target.value)}
                                    className={styles.shortInput}
                                    />
                                    <span className={styles.Gap}></span>
                                    <button onClick={() => handleAddLocalCasting(schedule)}  className={styles.btnInput}>추가버튼</button>
                                    <br />
                                    <ul>
                                    {castingData
                                        .filter(
                                        (casting) =>
                                            casting.schedule_day === schedule.schedule_day &&
                                            casting.schedule_time === schedule.schedule_time
                                        )
                                        .map((casting, castingIndex) => (
                                        <li key={castingIndex}>
                                            {casting.file_sysname ? (
                                            <img
                                                src={casting.file_sysname}
                                                alt="Casting"
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                            ) : null}
                                            <span>
                                            {casting.casting_name} - {casting.casting_role}
                                            </span>
                                            <button
                                            onClick={() =>
                                                handleRemoveCasting(schedule.schedule_day, schedule.schedule_time, castingIndex)
                                            }
                                            className={styles.btnInput}
                                            >
                                            x
                                            </button>
                                        </li>
                                        ))}
                                    </ul>
                                </li>
                                </ul>
                            );
                            })}
                                </td>
                            </tr>
                        } 
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
                                 onChange={() => setFormData({ ...formData, running_time: '0', running_intertime: '0' })} />러닝타임없음
                            </td>
                        </tr>
                        <tr>
                            <td>최대 티켓 수량</td>
                            <td>
                                <select name="max_ticket"
                                    value={formData.max_ticket}
                                    onChange={handleChange}>
                                        <option value="">수량 선택</option>
                                 {[...Array(20).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>티켓 오픈 희망일</td>
                            <td>
                                <input type="datetime-local" name="open_date" value={formData.open_date} onChange={handleChange}/>
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
                        <td>공지사항 </td>
                        <td>
                            <p style={{color:"red", fontSize:"13px"}} > * 글자 입력만 가능합니다. 이미지 삽입시 신청 승인이 어렵습니다.</p>
                            <BizNoticeEditor value={noticeContent} onChange={handleContentChange}/>
                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr>
                        <td>메인 포스터</td>
                        <td>
                        <p style={{ color: "red", fontSize: "13px" }}>
                            * 파일이 업로드되기까지 일정 시간이 소요됩니다. 업로드 후 해당 파일이 첨부 파일 리스트에 추가되었는지 꼭 체크해 주시기 바랍니다.
                        </p>
                        <div className={styles.file_upload_wrapper}>
                            <label for="file_upload" className={styles.custom_file_upload}>
                                파일 선택
                            </label>
                            {mainPoster.files_sysname ? (
                                <img
                                    src={mainPoster.files_sysname}
                                    alt="Casting"
                                    style={{ width: '80px',marginLeft: '80px' }}
                                />
                            ) : null}
                        </div>
                        <input id="file_upload"
                        type="file"
                        placeholder="메인포스터 하나만"
                        onChange={handleMainPosterChange}
                        />
                               
                        </td>
                    </tr>
                    <tr>
                        <td>상세페이지 <p>상세 정보 이미지 및 상세설명 </p></td>
                        <td>
                            <MyEditorOnlyAdmin height="500px" editorRef={editorRef} 
                            subCategoryName={subCategoryName} 
                            onContentChange={handleEditorContentChange}
                            />
                        </td>
                    </tr>
                   
                </tbody>
            </table>
        
                             
            <div className={styles.btnEnding}>
            <button onClick={handleSubmit} className={styles.btnEnd}>신청</button>
         
            <button onClick={handleCancel} className={styles.btnEnd}>취소</button>
            </div>
        </div>
    );
};
