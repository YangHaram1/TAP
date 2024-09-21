import { api } from '../../../../config/config';
import styles from './List.module.css';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const List = () => {
    const [list, setList] = useState([]);
    const navi = useNavigate();

    //페이지
    const [cpage, setCpage] = useState(1);
    const [page_total_count, setPage_total_count] = useState(1);
    const [status,setStatus]= useState('');
    const [category,setCategory]=useState('');

    const record_count_per_page = 5;
    const navi_count_per_page = 5;


    useEffect(() => {
        const start = cpage * record_count_per_page - (record_count_per_page - 1); //1
        const end = cpage * record_count_per_page; //10

        api.get(`/inquiry/admin?start=${start}&end=${end}&status=${status}&category=${category}`).then((resp) => {
            // console.log(resp)
            setList(()=>{
                const record_total_count = resp.data.count;//106 10 // 10
                if (record_total_count % record_count_per_page === 0) {
                    setPage_total_count(Math.floor(record_total_count / record_count_per_page));
                }
                else {
                    setPage_total_count(Math.floor(record_total_count / record_count_per_page) + 1);
                }
                return resp.data.list;//10
            });
        })
        window.scrollTo(0, 0);
    }, [cpage, status,category])

    const handlePage = (selectedPage) => {
        setCpage(selectedPage.selected + 1);
    }


    const handleDetail = (item) => {
        const seq = item?.seq;
        if (!item || !item.seq) {
            console.error('Invalid item or seq:', item);
            return;
        }
        navi(`detail/${seq}`);
    }
    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className={styles.stateSelect}>
                    <option value="">상태</option>
                    <option value="0">답변대기</option>
                    <option value="1">답변완료</option>
                </select>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className={styles.select}>
                    <option value="">유형</option>
                    <option value="예매">예매</option>
                    <option value="할인">할인</option>
                    <option value="결제/수수료">결제/수수료</option>
                    <option value="배송/반송">배송/반송</option>
                    <option value="회원가입">회원가입</option>
                    <option value="회원정보변경">회원정보변경</option>
                    <option value="회원탈퇴">회원탈퇴</option>
                    <option value="기타">기타</option>
                </select>
            </div>

            <div className={styles.list}>
                <div className={styles.header}>
                    <div style={{ flex: 1 }}>
                        <div style={{ flex: 1, padding: `10px` }}>
                            상태
                        </div>
                        <div style={{ display: 'flex', flex: 3 }}>
                            <div style={{ display: 'flex', flex: 1 }}>
                                아이디
                            </div>
                            <div style={{ display: 'flex', flex: 1 }}>
                                유형
                            </div>
                            <div style={{ display: 'flex', flex: 1 }}>
                                작성날짜
                            </div>
                            <div style={{ display: 'flex', flex: 1 }}>
                                작성시간
                            </div>
                        </div>
                    </div>
                </div>
                {
                    list.map((item, index) => {
                        const formattedDate = isNaN(new Date(item.write_date)) ? 'Invalid date' : format(new Date(item.write_date), 'yyyy-MM-dd HH:mm:ss');
                        const date = formattedDate.split(" ");

                        return (
                            <div className={styles.dto} key={index} onClick={() => handleDetail(item)}>
                                <div className={styles.status}>
                                    {item.status === 0 ? '답변대기' : '답변완료'}
                                </div>
                                <div className={styles.body}>
                                    <div className={styles.title}>
                                        {item.member_id}
                                    </div>
                                    <div className={styles.category}>
                                        {item.category}
                                    </div>
                                    <div className={styles.writeDate}>
                                        {date[0]}
                                    </div>
                                    <div className={styles.writeDate}>
                                        {date[1]}
                                    </div>
                                </div>
                            </div>
                        )
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
            </div>

        </div>
    )
}
export default List;