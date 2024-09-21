import { api } from '../../../../../config/config'
import styles from './List.module.css'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass,
    faHouseUser,
} from '@fortawesome/free-solid-svg-icons'
const List = () => {
    const [list, setList] = useState([])
    const navi = useNavigate()

    //페이지
    const [cpage, setCpage] = useState(1)
    const [page_total_count, setPage_total_count] = useState(1)
    const [status, setStatus] = useState('')
    const [category, setCategory] = useState('')

    const record_count_per_page = 5
    const navi_count_per_page = 5

    // useEffect(() => {
    //     const start =
    //         cpage * record_count_per_page - (record_count_per_page - 1) //1
    //     const end = cpage * record_count_per_page //10

    //     api.get(
    //         `/board/admin?start=${start}&end=${end}&status=${status}&category=${category}`
    //     ).then(resp => {
    //         // console.log(resp)
    //         setList(() => {
    //             const record_total_count = resp.data.count //106 10 // 10
    //             if (record_total_count % record_count_per_page === 0) {
    //                 setPage_total_count(
    //                     Math.floor(record_total_count / record_count_per_page)
    //                 )
    //             } else {
    //                 setPage_total_count(
    //                     Math.floor(record_total_count / record_count_per_page) +
    //                         1
    //                 )
    //             }
    //             return resp.data.list //10
    //         })
    //     })
    //     window.scrollTo(0, 0)
    // }, [cpage, status, category])

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
                    <div style={{ flex: 1 }}>
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
                                <button className={styles.addBtn}>추가</button>
                            </div>
                        </div>
                    </div>
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
