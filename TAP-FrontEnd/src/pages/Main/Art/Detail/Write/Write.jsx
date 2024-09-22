import styles from './Write.module.css'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'; // solid 아이콘
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'; // regular 아이콘
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // solid 아이콘
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // regular 아이콘
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { api } from '../../../../../config/config';
import { useOrder } from '../../../../../store/store';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Write = ({category, list})=> {

    // category -> review, excite
    const {seq, mainData} = useOrder();
    const [orderList, setOrderList] = useState([]); // 예매 내역 리스트 출력
    const [orderSeq, setOrderSeq] = useState(null); // 선택한 예매 내역
    const [selectedStar, setSelectedStar] = useState(null); // 별점 저장
    const [inputData, setInputData] = useState({title:'', content:''}); // 제목, 내용 저장
    const [lastInput, setLastInput] = useState('');
    const [enterPressed, setEnterPressed] = useState(false);

    const handleOrder = (e) => {
        setOrderSeq(e.target.value); // 선택된 값 저장
    };

    const handleStarClick = (e) => {
        setSelectedStar(Number(e.target.id)); // 클릭한 별점 저장
        console.log(selectedStar);
    };

    useEffect(()=>{

        console.log(list);

        if(category === "review"){
            api.get(`/order/getReview/${seq}`)
            .then((resp)=>{
                console.log(resp.data);
                setOrderList(resp.data);
                //관람 후기 불러오기
            })  
            .catch((err)=>{
                console.log(err);
            })
        }else if(category === "excite"){
            //기대평 불러오기
        }
    },[category])

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

    const handleWrite = () => {
        console.log(inputData);
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
                        <FontAwesomeIcon icon={solidStar}/>
                        <FontAwesomeIcon icon={solidStar}/>
                        <FontAwesomeIcon icon={solidStar}/>
                        <FontAwesomeIcon icon={solidStar}/>
                        <FontAwesomeIcon icon={regularStar}/>
                        &nbsp; (9.1점)
                    </span>
                </div>
            </div>
            :<></>
            }

            <div className={styles.review_header}>
                {
                    category == "review" ? 
                    <div className={styles.header_text}>총 N개의 관람후기가 등록되었습니다.</div>
                    :
                    <div className={styles.header_text}>총 N개의 기대평이 등록되었습니다.</div>
                }
                <div className={styles.header_search}>
                    <select>
                        <option defaultChecked value="">선택</option>
                        <option value="title">글제목</option>
                        <option value="id">아이디</option>
                    </select>
                    <div className={styles.search_box}>
                    <input type='text' placeholder={"검색어를 입력해주세요"}></input>
                    <button><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                    </div>
                </div>
            </div> 

            <hr></hr>

            <div className={styles.orderBtns}>
                {/* 클릭 시 css 변화 줘서 어떤 순으로 정렬중인지 표시 필요 */}
                <button>최신글순</button><button>평점순</button>{category==="review"?<button>공감순</button>:<></>}
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
                            <FontAwesomeIcon key={i} icon={i <= star ? solidStar : regularStar} // star 값보다 작거나 같으면 solidStar, 크면 regularStar
                            />
                        ))}
                        &nbsp;&nbsp;&nbsp;
                        </div>
                    ))}
                </div>
                </>
                :""}

                <div> 
                    제목 : <input type='text' className={styles.write_title} placeholder="제목을 입력해주세요" name="title" onChange={handleChange}></input>
                    <textarea rows="10" placeholder="내용을 입력하세요. 한글 최대 300자, 900bytes" name="content" onChange={handleChange}/>
                </div>

                <div className={styles.write_btn}>
                    <button onClick={handleWrite}>작성하기</button>
                </div>
            </div>


            {/* 기존 작성한 리뷰 출력 */}
            <div className={styles.reviews}>
                <div className={styles.review_box}>
                    {
                        category === "review" ? 
                        <>
                        <div className={styles.reviews_output_header_left}>
                        <div className={styles.review_output_stars}>별점들어갈예정</div>
                        </div>
                        <div className={styles.reviews_output_header_right}>
                            <div className={styles.review_output_data}>
                                id*** | 2024.09.09 | 공감 10
                            </div>
                        </div> 
                        </>
                        :
                        <div className={styles.review_output_data}>
                                id*** | 2024.09.09
                        </div>
                    }
                </div>
                <div className={styles.content}>
                    <div className={styles.review_output_title}>
                            제목 어쩌구 저쩌구
                    </div>
                    <div className={styles.review_output_content}>
                        <p>dfdf</p> 
                        <p>dfdf</p> 
                        <p>dfdfdfdfdfdfdf</p> 
                        <p>dfdf</p> 
                        <p>dfddfdfdfff</p> 
                        <p>dfddfdfdfff</p> 
                        <p>dfddfdfdfff</p> 
                    </div>
                </div>
            </div>

            <div className={styles.empty}></div>

        </div>
    );
}