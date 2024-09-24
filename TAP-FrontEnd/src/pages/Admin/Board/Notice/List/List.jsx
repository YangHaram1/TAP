import { api } from '../../../../../config/config'
import styles from './List.module.css'
import React, { useEffect, useState } from 'react'
import { add, format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import MyEditor from '../../../../Main/Inquiry/MyEditor/MyEditor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react'
import Swal from 'sweetalert2'
import {
    faMagnifyingGlass,
    faHouseUser,
    faAngleUp,
    faChevronDown,
    faSleigh,
} from '@fortawesome/free-solid-svg-icons'
import Modal from '../Modal/Modal'
import SweetAlert from '../../../../../components/SweetAlert/SweetAlert'

const List = () => {
    const editorRef = useRef(null)
    const [regexData, setRegexData] = useState({
        title: false,
        contents: false,
    })
    const [data, setData] = useState({
        title: '',
        contents: '',
    })

    const [list, setList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [checkAll, setCheckAll] = useState(false)
    const [check, setCheck] = useState([])

    const [target, setTarget] = useState('')
    const [keyword, setKeyword] = useState('')

    const [maxList, setMaxList] = useState(10)
    const navi = useNavigate()
    const handleAddClick = () => {
        setIsModalOpen(true)
    }
    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleCheck = index => {
        setCheck(prev => {
            const temp = [...prev]
            temp[index] = !temp[index]
            return temp
        })
    }

    const handleDelete = board_seq => {
        api.delete(`/board/delete/${board_seq}`).then(resp => {
            Swal.fire({
                icon: 'success',
                title: '공지사항',
                text: '삭제 되었습니다.',
            })
            setList(prev => {
                return prev.filter((item, index) => {
                    if (item.board_seq === board_seq) {
                        return false
                    }
                    return true
                })
            })
        })
    }

    //페이지
    const [cpage, setCpage] = useState(1)
    const [recordCountPerPage, setRecordCountPerPage] = useState(5)
    const handleCpage = e => {
        setRecordCountPerPage(e.target.value) // cpage 설정 후 recordCountPerPage 설정
    }
    const [page_total_count, setPage_total_count] = useState(1)
    const [status, setStatus] = useState('')

    // const record_count_per_page = 5
    const navi_count_per_page = 5
    const [search, setSearch] = useState(false)
    useEffect(() => {
        if (cpage !== 0) {
            const start = cpage * recordCountPerPage - (recordCountPerPage - 1) //1
            const end = cpage * recordCountPerPage //10
            console.log(end)
            api.get(
                `/board/admin?start=${start}&end=${end}&keyword=${search}&target=${target}`
            ).then(resp => {
                // console.log(resp)
                setList(() => {
                    const record_total_count = resp.data.count //106 10 // 10
                    if (record_total_count % recordCountPerPage === 0) {
                        setPage_total_count(
                            Math.floor(record_total_count / recordCountPerPage)
                        )
                    } else {
                        setPage_total_count(
                            Math.floor(
                                record_total_count / recordCountPerPage
                            ) + 1
                        )
                    }
                    return resp.data.list //10
                })
            })
            window.scrollTo(0, 0)
        }
    }, [cpage, add, search])

    const handlePage = selectedPage => {
        setCpage(selectedPage.selected + 1)
    }

    useEffect(() => {
        const allTrue = Object.values(regexData).every(value => value === true)

        setCheckAll(allTrue)
        console.log(regexData)
    }, [regexData])

    // const handleCheck = index => {
    //     setCheck(prev => {
    //         return prev.map((item, i) => {
    //             if (i === index) return !item
    //             return item
    //         })
    //     })
    // }

    const handleDetail = item => {
        const board_seq = item?.board_seq
        if (!item || !item.board_seq) {
            console.error('Invalid item or board_seq:', item)
            return
        }
        navi(`detail/${board_seq}`)
    }

    const handleData = e => {
        const { name, value } = e.target
        setData(prev => {
            return { ...prev, [name]: value }
        })
        if (name === 'title') {
            const titleRegex = /^.{1,30}$/
            setRegexData(prev => {
                return { ...prev, [name]: titleRegex.test(value) }
            })
        }
    }
    const handleConfirm = () => {
        api.post(`/board`, data).then(resp => {
            console.log(resp)
            if (resp) {
                setIsModalOpen(false)
                setData('')
                Swal.fire({
                    icon: 'success',
                    title: '공지사항',
                    text: '등록을 성공하였습니다.',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '공지사항',
                    text: '등록을 실패하였습니다.',
                })
            }
        })
    }

    const handleSearch = () => {
        setSearch(keyword)
        setCpage(1)
    }
    useEffect(() => {
        if (cpage === 1) {
            setCpage(0) // 잠시 다른 값으로 설정
            setTimeout(() => {
                setCpage(1) // 다시 1로 설정
            }, 0) // 짧은 지연 후 cpage를 1로 설정하여 상태 변화 유도
        } else {
            setCpage(1)
        }
    }, [recordCountPerPage])
    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <select
                    value={target}
                    onChange={e => {
                        setTarget(e.target.value)
                        setKeyword('')
                    }}
                    className={styles.select}
                >
                    <option value="">선택</option>
                    <option value="title">제목</option>
                    <option value="contents">내용</option>
                </select>
                <div className={styles.searchCont}>
                    <input
                        type="search"
                        placeholder="제목 또는 내용으로 검색."
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                    />

                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className={styles.faMagnifyingGlass}
                        onClick={handleSearch}
                    />
                </div>
                <div className={styles.header}>
                    <select
                        value={recordCountPerPage}
                        onChange={e => setRecordCountPerPage(e.target.value)}
                    >
                        <option value={5}>5 </option>
                        <option value={10}> 10</option>
                        <option value={15}> 15</option>
                        <option value={20}> 20</option>
                        <option value={25}> 25</option>
                    </select>
                </div>
            </div>

            <div className={styles.list}>
                <div className={styles.header}>
                    <div style={{ flex: 1 }} className={styles.headerConts}>
                        <div
                            style={{
                                display: 'flex',
                                flex: 3,
                                alignItems: `center`,
                            }}
                        >
                            <div
                                style={{
                                    display: `flex`,
                                    flex: 1,
                                }}
                            >
                                No.
                            </div>
                            <div style={{ display: 'flex', flex: 1 }}>제목</div>
                            <div style={{ display: 'flex', flex: 1 }}>
                                작성날짜
                            </div>
                            <div style={{ display: 'flex', flex: 1 }}>
                                작성시간
                            </div>
                            <div style={{ display: 'flex', flex: 1 }}>
                                <button
                                    onClick={handleAddClick}
                                    className={styles.addBoardBtn}
                                >
                                    추가
                                </button>
                            </div>
                        </div>
                    </div>
                    {/*모달*/}
                    {isModalOpen && (
                        <Modal onClose={handleModalClose}>
                            <div className={styles.writeBox}>
                                <h2>글 작성</h2>
                                <div className={styles.writeInner}>
                                    <div>
                                        <input
                                            className={styles.writeTitle}
                                            type="text"
                                            placeholder="글 제목을 입력해주세요"
                                            value={data.title || ''}
                                            name="title"
                                            onChange={handleData}
                                        />
                                    </div>

                                    <div>
                                        {data.title === '' ? (
                                            <span>
                                                30자 이내로 입력해주세요.
                                            </span>
                                        ) : regexData.title ? (
                                            <span style={{ color: 'blue' }}>
                                                30자 이내 입니다.
                                            </span>
                                        ) : (
                                            <span>30자 이내로 적어주세요</span>
                                        )}
                                    </div>
                                    <div className={styles.writeCont}>
                                        <MyEditor
                                            editorRef={editorRef}
                                            height={'100%'}
                                            setData={setData}
                                            setRegexData={setRegexData}
                                            data={data}
                                        />
                                    </div>
                                    <div>
                                        {data.contents === '' ? (
                                            <span>내용을 입력해주세요.</span>
                                        ) : regexData.contents ? (
                                            <span style={{ color: 'blue' }}>
                                                1000자 이내 입니다.
                                            </span>
                                        ) : (
                                            <span>
                                                1000자 이내로 적어주세요
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        className={
                                            checkAll
                                                ? styles.addPassBtn
                                                : styles.addBtn
                                        }
                                        onClick={handleConfirm}
                                    >
                                        저장
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    )}
                </div>
                <div>
                    <div style={{ flex: 1 }} className={styles.headerConts}>
                        {list.map((item, index) => {
                            const formattedDate = isNaN(
                                new Date(item.write_date)
                            )
                                ? 'Invalid date'
                                : format(
                                      new Date(item.write_date),
                                      'yyyy-MM-dd HH:mm:ss'
                                  )
                            const date = formattedDate.split(' ')

                            return (
                                <React.Fragment key={index}>
                                    <div className={styles.mainContainer}>
                                        {' '}
                                        <div
                                            style={{
                                                display: 'flex',
                                                flex: '4',
                                            }}
                                            className={styles.dto}
                                            key={index}
                                            onClick={() => handleDetail(item)}
                                        >
                                            <div
                                                className={styles.body}
                                                onClick={() => {
                                                    return handleCheck(index)
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flex: 1,
                                                    }}
                                                >
                                                    {item.board_seq}
                                                </div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flex: 1,
                                                    }}
                                                >
                                                    {item.title}
                                                </div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flex: 1,
                                                    }}
                                                >
                                                    {/* {item.write_date} */}
                                                    {date[0]}
                                                </div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flex: 1,
                                                    }}
                                                >
                                                    {date[1]}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flex: 1,
                                            }}
                                        >
                                            <button
                                                onClick={() => {
                                                    SweetAlert(
                                                        'warning',
                                                        '게시글',
                                                        '삭제 하시겠습니까?',
                                                        () =>
                                                            handleDelete(
                                                                item.board_seq
                                                            ),
                                                        null
                                                    )
                                                }}
                                                className={styles.deleteBtn}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
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
                </div>
                {/* {list.map((item, index) => {
                    const formattedDate = isNaN(new Date(item.write_date))
                        ? 'Invalid date'
                        : format(
                              new Date(item.write_date),
                              'yyyy-MM-dd HH:mm:ss'
                          )
                    const date = formattedDate.split(' ')} */}
            </div>
        </div>
    )
}

export default List
