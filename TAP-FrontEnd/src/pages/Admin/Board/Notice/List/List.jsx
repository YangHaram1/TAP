import { api } from '../../../../../config/config'
import styles from './List.module.css'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import MyEditor from '../../../../Main/Inquiry/MyEditor/MyEditor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react'
import Swal from 'sweetalert2'
import {
    faMagnifyingGlass,
    faHouseUser,
} from '@fortawesome/free-solid-svg-icons'
import Modal from '../Modal/Modal'
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

    const navi = useNavigate()
    const handleAddClick = () => {
        setIsModalOpen(true)
    }
    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    //페이지
    const [cpage, setCpage] = useState(1)
    const [page_total_count, setPage_total_count] = useState(1)
    const [status, setStatus] = useState('')
    const [category, setCategory] = useState('')

    const record_count_per_page = 5
    const navi_count_per_page = 5

    useEffect(() => {
        const allTrue = Object.values(regexData).every(value => value === true)

        setCheckAll(allTrue)
        console.log(regexData)
    }, [regexData])

    const handlePage = selectedPage => {
        setCpage(selectedPage.selected + 1)
    }

    const handleDetail = item => {
        const seq = item?.seq
        if (!item || !item.seq) {
            console.error('Invalid item or seq:', item)
            return
        }
        navi(`detail/${seq}`)
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
    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className={styles.select}
                >
                    <option value="">유형</option>
                    <option value="제목">제목</option>
                    <option value="내용">내용</option>
                </select>
                <div className={styles.searchCont}>
                    <input
                        type="search"
                        placeholder="제목 또는 내용으로 검색."
                    />

                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className={styles.faMagnifyingGlass}
                    />
                </div>
            </div>

            <div className={styles.list}>
                <div className={styles.header}>
                    <div style={{ flex: 1 }} className={styles.headerConts}>
                        <div style={{ flex: 1, padding: `10px` }}>No.</div>
                        <div style={{ display: 'flex', flex: 3 }}>
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
                {list.map((item, index) => {
                    const formattedDate = isNaN(new Date(item.write_date))
                        ? 'Invalid date'
                        : format(
                              new Date(item.write_date),
                              'yyyy-MM-dd HH:mm:ss'
                          )
                    const date = formattedDate.split(' ')

                    return (
                        <div
                            className={styles.dto}
                            key={index}
                            onClick={() => handleDetail(item)}
                        >
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
                })}
            </div>
        </div>
    )
}

export default List
