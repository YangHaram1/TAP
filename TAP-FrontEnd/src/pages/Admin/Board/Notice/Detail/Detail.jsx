import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Detail.module.css'
import { api } from '../../../../../config/config'
import MyEditor from '../../../../Main/Inquiry/MyEditor/MyEditor'
import SweetAlert from '../../../../../components/SweetAlert/SweetAlert'
import { format } from 'date-fns'
import Swal from 'sweetalert2'
const Detail = () => {
    const { board_seq } = useParams()
    const [dto, setDto] = useState({})
    const [data, setData] = useState({
        board_seq: board_seq,
        contents: '',
        title: '',
    })

    const [regexData, setRegexData] = useState({
        contents: false,
    })
    const editorRef = useRef()

    const navi = useNavigate()

    const handleChange = e => {
        const { name, value } = e.target
        setData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const [check, setCheck] = useState(true)

    const handleCheck = () => {
        setCheck(false)
    }

    const handleCancel = () => {
        setData(prev => {
            return { ...prev, title: dto.title, contents: dto.contents }
        })
        setCheck(true)
    }
    const handleUpdate = () => {
        api.put(`/board`, data)
            .then(resp => {
                if (resp.data === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: '답변',
                        text: '수정 완료되었습니다.',
                    })
                    setData(prev => {
                        return {
                            ...prev,
                            title: data.title,
                            contents: data.contents,
                        }
                    })

                    setCheck(true)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '오류',
                        text: '수정에 실패했습니다',
                    })
                    setCheck(false)
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: '오류',
                    text: '서버에 문제가 발생했습니다.',
                })
                setCheck(false)
            })
    }

    useEffect(() => {
        if (board_seq) {
            const seq = board_seq
            api.get(`/board/detail/${seq}`).then(resp => {
                setDto(resp.data)
                setData(prev => {
                    return {
                        ...prev,
                        title: resp.data.title,
                        contents: resp.data.contents,
                    }
                })
            })
        }
    }, [board_seq])

    const formattedDate = isNaN(new Date(dto.write_date))
        ? 'Invalid date'
        : format(new Date(dto.write_date), 'yyyy-MM-dd HH:mm:ss')
    const date = formattedDate.split(' ')

    return (
        <div className={styles.container}>
            <div className={styles.dto}>
                <div className={styles.body}>
                    <div className={styles.top}>
                        <div className={styles.title}>
                            <div>제목 : </div>
                            <div>
                                <input
                                    type="text"
                                    value={data.title}
                                    name="title"
                                    onChange={handleChange}
                                    disabled={check}
                                />
                            </div>
                        </div>
                        <div className={styles.date}>
                            <div>{date[0]}</div>
                        </div>
                    </div>

                    <React.Fragment>
                        {check ? (
                            <div
                                className={styles.contents}
                                dangerouslySetInnerHTML={{
                                    __html: data.contents,
                                }}
                            ></div>
                        ) : (
                            <React.Fragment>
                                <div className={styles.reply}>
                                    <MyEditor
                                        editorRef={editorRef}
                                        setData={setData}
                                        setRegexData={setRegexData}
                                        data={data}
                                    />
                                </div>
                                {regexData.contents ? (
                                    <span style={{ color: 'blue' }}>
                                        1000자 이내입니다.
                                    </span>
                                ) : (
                                    <span style={{ color: 'red' }}>
                                        입력해주세요
                                    </span>
                                )}
                            </React.Fragment>
                        )}
                    </React.Fragment>

                    <div className={styles.detailBtns}>
                        {check ? (
                            <React.Fragment>
                                <button
                                    className={styles.updateBtn}
                                    onClick={handleCheck}
                                >
                                    수정
                                </button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <button
                                    className={styles.cancelBtn}
                                    onClick={handleCancel}
                                >
                                    취소
                                </button>
                                <button
                                    className={
                                        regexData.contents
                                            ? styles.updateBtn
                                            : styles.updateBtn
                                    }
                                    onClick={() => {
                                        SweetAlert(
                                            'warning',
                                            '답변',
                                            '수정 하시겠습니까?',
                                            handleUpdate,
                                            null
                                        )
                                    }}
                                >
                                    확인
                                </button>
                            </React.Fragment>
                        )}

                        {/* <button className={styles.deleteBtn}>삭제</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
