import styles from './Review.module.css'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'; // solid 아이콘
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'; // regular 아이콘
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // solid 아이콘
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // regular 아이콘
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Review = ()=> {


    const handleInput = (event) => {
        const inputText = event.target.value;
        let byteCount = 0;

        for (let i = 0; i < inputText.length; i++) {
          const char = inputText.charAt(i);
          byteCount += (char.charCodeAt(0) > 127) ? 3 : 1; // 한글은 3바이트, 영문은 1바이트로 계산
          if (byteCount > 1200) {
            event.target.value = inputText.substring(0, i);
            break;
          }
        }
      };

    return (

        <div className={styles.container}>

            <h3>꼭 읽어주세요</h3>
            <div className={styles.text_box}>
                <p>게시판 운영 규정에 어긋난다고 판단되는 게시글은 사전 통보없이 블라인드 처리될 수 있습니다.</p>
                <p>특히 티켓 매매 및 양도의 글은 발견 즉시 임의 삭제되며, 전화번호, 이메일 등의 개인정보는 악용될 우려가 있으므로 게시를 삼가 주시기 바랍니다.</p>
                <p>사전 경고에도 불구하고 불량 게시물을 계속적으로 게재한 게시자의 경우 TAP 게시판 작성 권한이 제한됩니다.</p>
            </div>

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

            <div className={styles.review_header}>
                <div className={styles.header_text}>총 N개의 관람후기가 등록되었습니다.</div>
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
                <button>최신글순</button><button>평점순</button><button>공감순</button>
            </div>

            {/* 관람 후기 작성 박스 */}
            <div className={styles.review_write_box}>
                <div className={styles.write_header}>
                    <div className={styles.writer}>관람일시 &nbsp;</div> 
                    <select>
                        <option defaultValue="">예매 내역 없음</option>
                        <option defaultValue="y">예매번호 : M1234 / 2024-09-09 19:00 뮤지컬&lt;킹키부츠&gt;</option>
                    </select>
                </div>

                <div className={styles.write_header}>
                    <div className={styles.write_stars}>별점 &nbsp;</div>
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star}>
                        <input type="radio" id={star.toString()} name="star" /> &nbsp;
                        {[1, 2, 3, 4, 5].map((i) => (
                            <FontAwesomeIcon key={i} icon={i <= star ? solidStar : regularStar} // star 값보다 작거나 같으면 solidStar, 크면 regularStar
                            />
                        ))}

                        &nbsp;&nbsp;&nbsp;
                        </div>
                    ))}
                </div>

                <div> 
                    제목 : <input type='text' className={styles.write_title} placeholder="후기 제목을 입력해주세요"></input>
                    <textarea onChange={handleInput} rows="10" placeholder="텍스트를 입력하세요. 최대 400자, 1200바이트" />
                </div>

                <div className={styles.write_btn}>
                    <button>작성하기</button>
                </div>
            </div>


            {/* 기존 작성한 리뷰 출력 */}
            <div className={styles.reviews}>
                <div className={styles.review_box}>
                    <div className={styles.reviews_output_header_left}>
                        <div className={styles.review_output_stars}></div>
                    </div>
                    <div className={styles.reviews_output_header_right}>
                        <div className={styles.review_output_data}>
                            id*** | 2024.09.09 | 공감 10 
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}