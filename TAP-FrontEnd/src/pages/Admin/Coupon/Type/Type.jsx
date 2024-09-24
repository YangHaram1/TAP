import React, { useEffect, useState } from 'react';
import styles from './Type.module.css';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';
import AddForm from './AddForm/AddForm';
import { api } from '../../../../config/config';
import Swal from 'sweetalert2';
import SweetAlert from '../../../../components/SweetAlert/SweetAlert';

const Type = () => {

    const [add, setAdd] = useState(false);
    const [list, setList] = useState([{
        seq: 1,
        coupon_order: "welcome",
        title: '신규회원 감사 쿠폰',
        discount: '10000',
        contents: '신규회원을 위한 감사쿠폰 welcome 등급 이상 사용 가능하다'
    },
    {
        seq: 2,
        coupon_order: "welcome",
        title: '신규회원 감사 쿠폰',
        discount: '20000',
        contents: '신규회원을 위한 감사쿠폰 welcome 등급 이상 사용 가능하다'
    }
    ]);

    const [grade, setGrade] = useState([
        {
            grade_order: 1,
            name: 'welcome'
        },
        {
            grade_order: 2,
            name: 'family'
        },
        {
            grade_order: 3,
            name: 'vip'
        }
    ]);


    const [addForm, setAddForm] = useState(false);
    const [check, setCheck] = useState([]);
    const [target, setTarget] = useState('title');
    const [keyword, setKeyword] = useState('');

    const [cpage, setCpage] = useState(1);
    const [page_total_count, setPage_total_count] = useState(1);
    const [search, setSearch] = useState('');
    const [recordCountPerPage, setRecordCountPerPage] = useState(5);
    const navi_count_per_page = 5;


    useEffect(() => {
        setCheck(list.map(() => { return false }))
    }, [list])

    useEffect(() => {
        api.get(`/grade`).then((resp) => {
            setGrade(resp.data)
        })
    }, [])

    const handlePage = (selectedPage) => {
        setCpage(selectedPage.selected + 1);
    }

    const handleDetail = (item) => {

    }
    const handleCheck = (index) => {
        setCheck((prev) => {
            const temp = [...prev];
            temp[index] = !temp[index];
            return temp;
        })
    }
    const handleDelete = (seq) => {
        api.delete(`/coupon/type/${seq}`).then((resp) => {
            Swal.fire({
                icon: 'success',
                title: '쿠폰',
                text: '삭제 됬습니다.'
            })
            setList((prev) => {
                return (
                    prev.filter((item, index) => {
                        if (item.seq === seq) {
                            return false
                        }
                        return true;
                    })
                )
            })
        })
    }

    useEffect(() => {

        if (cpage !== 0) {
            const start = cpage * recordCountPerPage - (recordCountPerPage - 1); //1
            const end = cpage * recordCountPerPage; //10
         
            api.get(`/coupon/type?start=${start}&end=${end}&keyword=${search}&target=${target}`).then((resp) => {
                setList(() => {
                    const record_total_count = resp.data.count;//106 10 // 10
                    if (record_total_count % recordCountPerPage === 0) {
                        setPage_total_count(Math.floor(record_total_count / recordCountPerPage));
                    }
                    else {
                        setPage_total_count(Math.floor(record_total_count / recordCountPerPage) + 1);
                    }
                    return resp.data.list;//10
                });
            })
            window.scrollTo(0, 0);
        }


    }, [cpage, add, search])

    useEffect(() => {
        if (cpage === 1) {
            setCpage(0); // 잠시 다른 값으로 설정
            setTimeout(() => {
                setCpage(1); // 다시 1로 설정
            }, 0); // 짧은 지연 후 cpage를 1로 설정하여 상태 변화 유도
        }
        else {
            setCpage(1)
        }
    }, [recordCountPerPage])

    const handleChange = (event) => {
        setKeyword(event.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div style={{ flex: 1 }}>
                    쿠폰 종류
                </div>
                <select value={recordCountPerPage} onChange={(e) => setRecordCountPerPage(e.target.value)}>
                    <option value={5}>5 </option>
                    <option value={10}> 10</option>
                    <option value={15}> 15</option>
                    <option value={20}> 20</option>
                    <option value={25}> 25</option>
                </select>
            </div>
            <div className={styles.search}>

                <select value={target} onChange={(e) => {
                    setTarget(e.target.value);
                    setKeyword('');
                    setSearch('')
                }} className={styles.select}>
                    {/* <option value="">유형</option> */}
                    <option value="title">이름</option>
                    <option value="grade">등급</option>
                </select>
                <div className={styles.searchInput}>

                    {
                        target === 'grade' ?
                            (
                                <select className={styles.select} value={keyword} onChange={handleChange}>
                                    <option value="">선택</option>
                                    {
                                        grade.map((item, index) => {
                                            return (
                                                <option value={item.name}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            )
                            :
                            (
                                <input type="text" placeholder='검색할 단어를 입력해주세요' value={keyword} onChange={(e) => {
                                    setKeyword(e.target.value)
                                }} />
                            )
                    }

                </div>
                <div style={{ display: "flex", flex: 0.2 }}>
                    <button className={styles.searchBtn} onClick={() => {
                        setSearch(keyword)
                    }}>검색</button>
                </div>
            </div>
            <div className={styles.list}>
                <div className={styles.header1}>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <div style={{ display: 'flex', flex: 1 }}>
                            번호
                        </div>
                        <div style={{ display: 'flex', flex: 1 }}>
                            쿠폰 등급
                        </div>
                        <div style={{ display: 'flex', flex: 1 }}>
                            이름
                        </div>
                        <div style={{ display: 'flex', flex: 1 }}>
                            할인
                        </div>
                        <div style={{ display: 'flex', flex: 0.5 }}>
                            <button className={styles.addBtn} onClick={() => { setAddForm(true) }}>추가</button>
                        </div>
                    </div>
                </div>
                {
                    list.map((item, index) => {
                        return (
                            <React.Fragment>
                                <div className={styles.dto} key={index} onClick={() => handleDetail(item)}>
                                    <div className={styles.body} onClick={() => { return handleCheck(index) }}>
                                        <div className={styles.seq}>
                                            {item.seq}
                                        </div>
                                        <div className={styles.grade}>
                                            {item.name}
                                        </div>
                                        <div className={styles.title}>
                                            {item.title}
                                        </div>
                                        <div className={styles.discount}>
                                            {item.discount}원
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flex: 0.5 }}>
                                        <button className={styles.deleteBtn} onClick={() => SweetAlert('warning', '쿠폰', '삭제 하시겠습니까?', () => handleDelete(item.seq), null)}>삭제</button>
                                    </div>
                                </div>
                                {check[index] && (<div dangerouslySetInnerHTML={{ __html: item.contents }} className={styles.contents}>

                                </div>)}
                            </React.Fragment>

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
                    forcePage={cpage > 0 ? cpage - 1 : 0}
                />
            </div>
            {addForm && (<AddForm setAddForm={setAddForm} setAdd={setAdd} grade={grade} />)}
        </div>
    )
}
export default Type;