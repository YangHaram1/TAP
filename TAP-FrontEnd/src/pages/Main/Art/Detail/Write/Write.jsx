import styles from './Write.module.css'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'; // solid 아이콘
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'; // regular 아이콘
import { faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons'; // 반별
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // solid 아이콘
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // regular 아이콘
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { api } from '../../../../../config/config';
import { useAuthStore, useOrder } from '../../../../../store/store';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';

export const Write = ({category, list})=> {

    // category -> review, excite
    const {seq, mainData} = useOrder();
    const [orderList, setOrderList] = useState([]); // 예매 내역 리스트 출력
    const [orderSeq, setOrderSeq] = useState(null); // 선택한 예매 내역
    const [selectedStar, setSelectedStar] = useState(null); // 별점 저장
    const [inputData, setInputData] = useState({title:'', content:''}); // 제목, 내용 저장
    const [lastInput, setLastInput] = useState('');
    const [enterPressed, setEnterPressed] = useState(false);
    const [starsAvg, setStarsAvg] = useState(0); // 별점 평균 값

    const {token} = useAuthStore();
    const [lists, setLists] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [selectedKeyword, setSelectedKeyword] = useState("최신순");


    //==========================  별점에 따른 별 출력 =========================

    const handleStarClick = (e) => {
        setSelectedStar(Number(e.target.id)); // 클릭한 별점 저장
        console.log(selectedStar);
    };

    const renderStars = (starsAvg) => {
        const stars = [];
        const fullStars = Math.floor(starsAvg); // 꽉 찬 별 개수
        const hasHalfStar = starsAvg - fullStars >= 0.5; // 반 별 여부
    
        // 꽉 찬 별 추가
        for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon icon={solidStar} key={`full-${i}`} color="#FFD700"/>);
        }
    
        // 반 별 추가 (있다면)
        if (hasHalfStar) {
        stars.push(<FontAwesomeIcon icon={halfStar} key="half" color="#FFD700"/>);
        }
    
        // 빈 별 추가
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
        stars.push(<FontAwesomeIcon icon={regularStar} key={`empty-${i}`} color="#FFD700" />);
        }
    
        return stars;
    };

    //============================== 페이지 네이션 함수 ================================ 

    const handleKeyword = (e)=>{
        console.log("키워드",e);
        setKeyword(e);
        setSelectedKeyword(e);
    }

    // 페이지네이션 상태변수
    const [cpage, setCpage] = useState(1);
    const [page_total_count, setPage_total_count] = useState();
    const [keyword, setKeyword] = useState('');

    const record_count_per_page = 10;
    const navi_count_per_page = 5;

    useEffect(()=>{
        console.log("변경", category);
        setCpage(1);
    },[category, keyword])

    useEffect(()=>{
        // setLoading(true); // 데이터 요청 전 로딩 시작
        const start = cpage * record_count_per_page - (record_count_per_page - 1);
        const end = cpage * record_count_per_page;
        let url='';

        if(category === "review"){
            url = `/detail/getReviewByKeyword`;

        }else if(category === "excite"){
            url= `/detail/getExciteByKeyword`;
        }

        api.get(url+`?start=${start}&end=${end}&keyword=${keyword}&seq=${seq}`)
        .then(async (resp) => {
            // console.log(resp.data);
            const record_total_count = resp.data.count;
                if (record_total_count % record_count_per_page === 0) {
                    setPage_total_count(Math.floor(record_total_count / record_count_per_page));
                }
                else {
                    setPage_total_count(Math.floor(record_total_count / record_count_per_page) + 1);
                }
                setLists(resp.data.list);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            // setLoading(false); // 데이터 요청 후 로딩 종료
        });
    },[cpage, category, keyword])

    useEffect(() => {
        if (loading) return; // 로딩 중이면 아무 것도 렌더링하지 않음
    }, [loading]);

    const handlePage = (selectedPage) => {
        setCpage(selectedPage.selected + 1);
        console.log("선택한 페이지",selectedPage);
    }

   //==========================  평균 별점 및 예매 목록, 데이터 리스트 출력, 페이지 네이션 함수 =========================


    useEffect(()=>{

        console.log(lists);

        if(category === "review"){
            // 평균 평점 계산
            if (list.length > 0) {
                const totalStars = list.reduce((acc, review) => acc + review.stars, 0);
                const avgStars = totalStars / list.length;
                setStarsAvg(avgStars);
              } else {
                setStarsAvg(0); // 리뷰가 없을 경우 평균은 0으로 설정
              }

            if(token !== null){
            // 예매 리스트 불러오기
            api.get(`/order/getReview/${seq}`)
            .then((resp)=>{
                console.log(resp.data);
                setOrderList(resp.data);
            })  
            .catch((err)=>{
                console.log(err);
            })
            }
        }else if(category === "excite"){
            //기대평 불러오기
        }
    },[category])

    const handleOrder = (e) => {
        setOrderSeq(e.target.value); // 선택된 값 저장
    };

     //==========================  내용 작성 시 엔터 중복 처리 =========================

    const handleChange = (e) => {
        let { name, value } = e.target;
    
        // 현재 입력값에서 마지막 문자가 엔터인지 확인
        if (value.charAt(value.length - 1) === '\n') {
            if (enterPressed || value.length === 1) { // 값이 비어있거나 엔터가 연속인 경우
                Swal.fire(
                    { 
                      icon: 'error',
                      title: '연속으로 엔터를 입력할 수 없습니다.',
                      showConfirmButton: false,
                      timer: 1500
                    }
                );
                e.target.value = value.slice(0, -1); // 마지막 문자 제거
                return;
            }
            setEnterPressed(true);
        } else {
            setEnterPressed(false); // 엔터가 아니면 상태 초기화
        }
    
        // 입력값이 비어있으면 예외 처리
        if (value.trim() === "") {
            setInputData(prev => ({ ...prev, [name]: value }));
            setLastInput(value);
            setEnterPressed(false);
            return;
        }
    
        const inputText = value;
        let byteCount = 0;
    
        for (let i = 0; i < inputText.length; i++) {
            const char = inputText.charAt(i);
            byteCount += (char.charCodeAt(0) > 127) ? 3 : 1; // 한글은 3바이트, 영문은 1바이트로 계산
            if (byteCount > 900) {
                Swal.fire(
                    { 
                      icon: 'error',
                      title: '최대 900바이트까지만 입력할 수 있습니다.',
                      showConfirmButton: false,
                      timer: 1500
                    }
                );
                e.target.value = inputText.substring(0, i);
                break;
            }
        }
    
        setInputData(prev => ({ ...prev, [name]: value }));
        setLastInput(value);
    }

    //============================= 글 작성 insert ===============================

    const handleWrite = () => {
        if(token == null){
            Swal.fire(
                { 
                  icon: 'error',
                  title: '로그인을 해주세요',
                  showConfirmButton: false,
                  timer: 1500
                }
            );
            return;
        }


        let data;
        if(category === "review"){

            if(selectedStar == null || inputData.title == null  || inputData.content == null || orderSeq == null ){
                Swal.fire(
                    { 
                      icon: 'error',
                      title: '모든 내용을 작성해주세요',
                      showConfirmButton: false,
                      timer: 1500
                    }
                );
                return;
            }
            data = {
                category:category,
                seq:seq,
                orderSeq:orderSeq,
                star:selectedStar,
                title:inputData.title,
                content:inputData.content
            };
        }else if(category === "excite"){

            if(inputData.title == null || inputData.content== null ){
                Swal.fire(
                    { 
                      icon: 'error',
                      title: '모든 내용을 작성해주세요',
                      showConfirmButton: false,
                      timer: 1500
                    }
                );
                return;
            }

            data = {
                category:category,
                seq:seq,
                title:inputData.title,
                content:inputData.content
            };
        }

        api.post(`/order/write`,data)
            .then((resp)=>{
                console.log(resp.data);
                setSelectedStar(null);
                setInputData({ title: '', content: '' });
                setOrderSeq(null);
            })  
            .catch((err)=>{
                console.log(err);
            })

            window.location.reload();

    }

    return (

        <div className={styles.container}>
            {loading ? <div>로딩 중...</div> 
            :<>
            <h3>꼭 읽어주세요</h3>
            <div className={styles.text_box}>
                <p>게시판 운영 규정에 어긋난다고 판단되는 게시글은 사전 통보없이 블라인드 처리될 수 있습니다.</p>
                <p>특히 티켓 매매 및 양도의 글은 발견 즉시 임의 삭제되며, 전화번호, 이메일 등의 개인정보는 악용될 우려가 있으므로 게시를 삼가 주시기 바랍니다.</p>
                <p>사전 경고에도 불구하고 불량 게시물을 계속적으로 게재한 게시자의 경우 TAP 게시판 작성 권한이 제한됩니다.</p>
            </div>

            {
            category === "review"?
            <div className={styles.total_stars}>
                <div className={styles.stars_text}>
                    <span style={{fontSize:"18px", fontWeight:"700"}}>관람평점</span>
                    <span> &nbsp; 
                        {renderStars(starsAvg.toFixed(1))}
                        &nbsp; ({starsAvg.toFixed(1)}점)
                    </span>
                </div>
            </div>
            :<></>
            }

            <div className={styles.review_header}>
                {
                    category == "review" ? 
                    <div className={styles.header_text}>총 {list.length}개의 관람후기가 등록되었습니다.</div>
                    :
                    <div className={styles.header_text}>총 {list.length}개의 기대평이 등록되었습니다.</div>
                }
                {/* <div className={styles.header_search}>
                    <select>
                        <option defaultChecked value="">선택</option>
                        <option value="title">글제목</option>
                        <option value="id">아이디</option>
                    </select>
                    <div className={styles.search_box}>
                    <input type='text' placeholder={"검색어를 입력해주세요"}></input>
                    <button><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                    </div>
                </div> */}
            </div> 

            <hr></hr>

            <div className={styles.orderBtns}>
                {/* 클릭 시 css 변화 줘서 어떤 순으로 정렬중인지 표시 필요 */}
                <button onClick={()=>{handleKeyword("최신순")}} style={{ color: selectedKeyword === "최신순" ? "blueviolet" : "black",}}>최신글순</button>
                {category==="review"
                ?<><button onClick={()=>{handleKeyword("별점순")}} style={{color: selectedKeyword === "별점순" ? "blueviolet" : "black",}}>평점순</button> 
                {/*<button>공감순</button>*/}</>:<></>}
            </div>

            {/* 관람 후기 작성 박스 */}
            <div className={styles.review_write_box}>
                {category==="review"?
                <>
                <div className={styles.write_header}>
                    <div className={styles.writer}>관람일시 &nbsp;</div> 
                    <select onChange={(e)=>{handleOrder(e)}}>
                        <option value="" selected disabled>예매 내역 선택</option>
                        {
                            orderList.map((list)=>{
                                return(
                                    <option key={list.order_seq} value={list.order_seq}>예매번호 : {list.order_seq} | {mainData.name}</option>
                                );
                            })
                        }
                    </select>
                </div>

                
                <div className={styles.write_header}>
                    <div className={styles.write_stars}>별점 &nbsp;</div>
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star}>
                        <input type="radio" id={star.toString()} name="star" onClick={handleStarClick} /> &nbsp;
                        {[1, 2, 3, 4, 5].map((i) => (
                            <FontAwesomeIcon key={i} color="#FFD700" icon={i <= star ? solidStar : regularStar} // star 값보다 작거나 같으면 solidStar, 크면 regularStar
                            />
                        ))}
                        &nbsp;&nbsp;&nbsp;
                        </div>
                    ))}
                </div>
                </>
                :""}

                <div> 
                    제목 : <input style={{marginBottom:"15px"}} type='text' className={styles.write_title} placeholder="제목을 입력해주세요" name="title" onChange={handleChange}></input>
                    <textarea rows="10" placeholder="내용을 입력하세요. 한글 최대 300자, 900bytes" name="content" onChange={handleChange}/>
                </div>

                <div className={styles.write_btn}>
                    <button onClick={handleWrite}>작성하기</button>
                </div>
            </div>


            {/* 기존 작성한 리뷰 출력 */}
            {
                Array.isArray(lists)&& lists.length > 0 &&
                lists.map((data, index)=>{
                    return(
                        <div className={styles.reviews} key={index}>
                        <div className={styles.review_box}>
                            {
                                category === "review" ? 
                                <>
                                <div className={styles.reviews_output_header_left}>
                                <div className={styles.review_output_stars}>{renderStars(data.stars)}</div>
                                </div>
                                <div className={styles.reviews_output_header_right}>
                                    <div className={styles.review_output_data}>
                                    {data.member_id.substring(0,3)}** | &nbsp;
                                            {(() => {
                                                const date = new Date(data.review_date);
                                                return isNaN(date) ? "Invalid Date"+ data.review_date+"1" : format(date, 'yyyy.MM.dd');
                                            })()}
                                             &nbsp; | 공감 10 
                                        {/* {data.member_id.substring(0,3)}** | {format(new Date(data.review_date), 'yyyy.MM.dd')} | 공감 10 */}
                                    </div>
                                </div> 
                                </>
                                :
                                <div className={styles.review_output_data}>
                                        {data.member_id.substring(0,3)}** | &nbsp;
                                            {(() => {
                                                const date = new Date(data.excite_date);
                                                return isNaN(date) ? "Invalid Date"+ data.excite_date+"1" : format(date, 'yyyy.MM.dd');
                                            })()}
                                </div>
                            }
                        </div>
                        <div className={styles.content}>
                            <div className={styles.review_output_title}>
                                    { category === 'review' ? <p>{data.review_title}</p> : <p>{data.excite_title}</p>}
                            </div>
                            <div className={styles.review_output_content}>
                                    { category === 'review' ? <p>{data.review}</p> : <p>{data.excite}</p>}
                            </div>
                        </div>
                    </div>
                    

                    );   
                })
                
            }

            <ReactPaginate
                pageCount={page_total_count} // 페이지 총 개수
                pageRangeDisplayed={navi_count_per_page} // 현재 페이지를 기준으로 표시할 페이지 범위 수
                marginPagesDisplayed={1} // 양쪽 끝에 표시할 페이지 수
                onPageChange={handlePage} // 페이지 변경 핸들러
                containerClassName={styles.pagination} // 스타일 클래스
                activeClassName={styles.active} // 활성 페이지 클래스
                initialPage={0} //초기 page 값
                previousLabel={'<'} // 이전 페이지 버튼 레이블
                previousClassName={styles.previous} // 이전 버튼의 클래스명
                nextLabel={'>'} // 다음 페이지 버튼 레이블
                nextClassName={styles.next} // 다음 버튼의 클래스명
                breakLabel={'...'} // 생략 표시 제거
                breakClassName={null} // 생략 표시의 클래스명 제거
            />

            <div className={styles.empty}></div>

            </>
}
        </div>
    );
}