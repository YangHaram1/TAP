import React, { useEffect, useState } from 'react';
import styles from './Type.module.css';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';
import AddForm from './AddForm/AddForm';
import { api } from '../../../../config/config';

const Type = () => {

    const [add,setAdd]=useState(false);
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
    const [addForm,setAddForm]=useState(false);
    const [check, setCheck] = useState([]);
    const [target, setTarget] = useState('');
    const [keyword, setKeyword] = useState('');

    const [cpage, setCpage] = useState(1);
    const [page_total_count, setPage_total_count] = useState(1);

    const record_count_per_page = 5;
    const navi_count_per_page = 5;


    useEffect(() => {
        setCheck(list.map(() => { return false }))
    }, [list])

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

    useEffect(() => {
        if (false) {
            api.get(`/grade`).then((resp) => {

            })
           
        }

        api.get(`/coupon/type`).then((resp) => {
            setList(resp.data)
        })

    }, [add])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                쿠폰 종류
            </div>
            <div className={styles.search}>
                <div className={styles.searchInput}>
                    <input type="text" placeholder='검색할 단어를 입력해주세요' value={keyword} onChange={(e) => {
                        setKeyword(e.target.value)
                    }} />
                </div>
                <select value={target} onChange={(e) => setTarget(e.target.value)} className={styles.select}>
                    <option value="">유형</option>
                    <option value="제목">제목</option>
                    <option value="등급">등급</option>
                </select>
                <div style={{ display: "flex", flex: 0.2 }}>
                    <button className={styles.searchBtn}>검색</button>
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
                            <button className={styles.addBtn} onClick={()=>{setAddForm(true)}}>추가</button>
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
                                            {item.coupon_order}
                                        </div>
                                        <div className={styles.title}>
                                            {item.title}
                                        </div>
                                        <div className={styles.discount}>
                                            {item.discount}원
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flex: 0.5 }}>
                                        <button className={styles.deleteBtn}>삭제</button>
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
                />
            </div>
           {addForm&&( <AddForm setAddForm={setAddForm} setAdd={setAdd}/>)}
        </div>
    )
}
export default Type;