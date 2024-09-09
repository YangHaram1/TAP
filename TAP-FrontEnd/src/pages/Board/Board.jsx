import React, { useEffect, useState } from 'react'
import styles from './Board.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { api } from '../../config/config'
import { format } from 'date-fns'
const Board = () => {
    const [list, setList] = useState([])

    const [check, setCheck] = useState([])

    const [maxList, setMaxList] = useState(10)

    useEffect(() => {
        api.get(`/board`).then(resp => {
            setList(resp.data)
            setCheck(
                resp.data.map(() => {
                    return false
                })
            )
        })
    }, [])

    const handleCheck = index => {
        setCheck(prev => {
            return prev.map((item, i) => {
                if (i === index) return !item //여기가 고정값을 무조건 true,false !item 토글 클릭할떄마다 바뀜

                return item // 나머지 배열값을 유지해줌.
            })
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.mainTitle}>공지사항</div>
            {list.map((item, index) => {
                if (index >= maxList) {
                    return ''
                }
                const currentDate = format(
                    new Date(item.write_date),
                    'yyyy-MM-dd'
                )
                return (
                    <React.Fragment key={index}>
                        <div className={styles.contents}>
                            <div
                                className={styles.showConts}
                                onClick={() => {
                                    handleCheck(index)
                                }}
                            >
                                <div className={styles.leftConts}>
                                    <div className={styles.title}>
                                        {item.title}
                                    </div>
                                    <div className={styles.write_date}>
                                        {currentDate}
                                    </div>
                                </div>

                                <div className={styles.rightConts}>
                                    <div className={styles.toggleIcon}>
                                        <FontAwesomeIcon
                                            icon={
                                                !check[index]
                                                    ? faChevronDown
                                                    : faAngleUp
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {check[index] && (
                                <div className={styles.hideConts}>
                                    <div>{item.contents}</div>
                                </div>
                            )}
                        </div>
                    </React.Fragment>
                )
            })}
            <div
                className={styles.more}
                onClick={() => {
                    setMaxList(prev => {
                        return prev + 10
                    })
                }}
            >
                더보기
            </div>
        </div>
    )
}
export default Board
