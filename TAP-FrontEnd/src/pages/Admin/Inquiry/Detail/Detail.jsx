import React, { useEffect, useRef, useState } from 'react';
import styles from './Detail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../../config/config';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import MyEditor from './../../../Main/Inquiry/MyEditor/MyEditor';
import SweetAlert from './../../../../components/SweetAlert/SweetAlert';
import Swal from 'sweetalert2';
const Detail = () => {
    const { seq } = useParams();
    const [dto, setDto] = useState({});
    const [reply, setReply] = useState({});
    const [fileList, setFileList] = useState([]);

    const [data, setData] = useState({
        seq: '',
        parent_seq: seq,
        contents: ''
    })

    const [regexData, setRegexData] = useState({
        contents: false
    });
    const editorRef = useRef();

    const navi = useNavigate();

    const [check, setCheck] = useState(true);

    useEffect(() => {
        if (seq) {
            api.get(`/inquiry/${seq}`).then((resp) => {
                setDto(resp.data);
            })
            const parentSeq = seq;
            api.get(`/file/${parentSeq}`).then((resp) => {
                setFileList(resp.data);
            })
            api.get(`/reply/${parentSeq}`).then((resp) => {
                setReply(resp.data);
                setData((prev) => {
                    return { parent_seq: parentSeq, seq: resp.data.seq, contents: resp.data.contents }
                })
            })
        }

    }, [seq])

    //다운로드 컨트롤
    const handleDownload = (item) => {
        const oriname = item.files_oriname;
        const sysname = item.files_sysname;
        api.get(`/file/download?sysname=${sysname}&oriname=${oriname}`, { responseType: 'blob' }).then((resp) => {
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement('a');
            link.href = url;
            // 서버에서 받은 파일 이름으로 다운로드 파일명 설정
            link.setAttribute('download', oriname);
            link.click();
        })
    }


    const handleConfirm = () => {
        api.post(`/reply`, data).then((resp) => {
            navi('/support/inquiry')
        })
    }

    const handleCancel = () => {
        setCheck(true);
    }

    const handleDelete = () => {
        const seq = reply.seq;
        const parentSeq = reply.parent_seq
        api.delete(`/reply/${seq}/${parentSeq}`).then((resp) => {
            Swal.fire({
                icon: "success",
                title: "답변",
                text: "삭제 완료됬습니다."
            })
            setReply({});
            setDto((prev) => {
                return { ...prev, status: 0 }
            })
            setData((prev)=>{
                return {...prev,contents:''}
            })
        })
    }

    const handleUpdate = () => {

        api.put(`/reply`, data).then((resp) => {
            Swal.fire({
                icon: "success",
                title: "답변",
                text: "수정 완료됬습니다."
            })
            setReply((prev)=>{
                return {...prev,contents:data.contents}
            })
            setCheck(true);
        })
    }

    const handleCheck=()=>{
        setCheck(false);
      
    }

    return (
        <div className={styles.container}>
            <div className={styles.dto} >
                <div className={styles.status}>
                    {dto.status === 0 ? '답변대기' : '답변완료'}
                </div>
                <div className={styles.body}>
                    <div className={styles.title}>
                        제목 : {dto.title}
                    </div>
                    <div className={styles.contents}>
                        <div className={styles.category}>
                            {dto.category}
                        </div>
                        <div className={styles.writeDate}>
                            {isNaN(new Date(dto.write_date)) ? 'Invalid date' : format(new Date(dto.write_date), 'yyyy-MM-dd')}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.fileList}>
                {
                    fileList.map((item, index) => {
                        return (
                            <div className={styles.fileContent} key={index}>
                                <div className={styles.fileInfo} onClick={() => handleDownload(item)}>
                                    <div className={styles.fileName}>
                                        <FontAwesomeIcon icon={faFileLines} />
                                        <p>{item.files_oriname}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.detail}>
                <div className={styles.detailTitle}>
                    문의내역
                </div>
                <div className={styles.inquiry}>
                    <div className={styles.q}>
                        Q
                    </div>
                    <div className={styles.inquiryBody}>
                        <div className={styles.content} dangerouslySetInnerHTML={{ __html: dto.contents }}>

                        </div>
                        <div className={styles.contentDate}>
                            {isNaN(new Date(dto.write_date)) ? 'Invalid date' : format(new Date(dto.write_date), 'yyyy.MM.dd HH:mm')}
                        </div>
                    </div>
                </div>
            </div>

            {(reply.contents === undefined) ? (
                <React.Fragment>
                    <div className={styles.reply}>
                        <MyEditor editorRef={editorRef} setData={setData} setRegexData={setRegexData} data={data} />
                    </div>
                    {regexData.contents ? <span style={{ color: 'blue' }} >1000자 이내입니다.</span> : <span style={{ color: 'red' }}>입력해주세요</span>}
                    <div className={regexData.contents ? styles.confirm : styles.confirmFalse}>
                        <button onClick={() => {
                            SweetAlert('warning', '답변', '등록 하시겠습니까?', handleConfirm, null);
                        }}>답변 등록</button>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {check ? (<div className={styles.inquiry}>
                        <div className={styles.a}>
                            A
                        </div>
                        <div className={styles.inquiryBody}>
                            <div className={styles.content} dangerouslySetInnerHTML={{ __html: reply.contents }}>
                            </div>
                            <div className={styles.contentDate}>
                                {isNaN(new Date(reply.write_date)) ? '' : format(new Date(reply.write_date), 'yyyy.MM.dd HH:mm')}
                            </div>
                        </div>
                    </div>) : (
                        <React.Fragment>
                            <div className={styles.reply}>
                                <MyEditor editorRef={editorRef} setData={setData} setRegexData={setRegexData} data={data}/>
                            </div>
                            {regexData.contents ? <span style={{ color: 'blue' }} >1000자 이내입니다.</span> : <span style={{ color: 'red' }}>입력해주세요</span>}
                        </React.Fragment>
                    )}
                    <div className={styles.update}>
                        <div className={styles.updateBtn}>
                            {check ? (
                                <React.Fragment>
                                    <button onClick={handleCheck}>수정</button>
                                    <button onClick={() => { SweetAlert('warning', '답변', '삭제 하시겠습니까?', handleDelete) }}>삭제</button>
                                </React.Fragment>

                            ) : (
                                <React.Fragment>
                                    <button onClick={handleCancel}>취소</button>
                                    <button className={regexData.contents ? styles.confirm : styles.updateFalse} onClick={() => {SweetAlert('warning', '답변', '수정 하시겠습니까?', handleUpdate, null);}}>확인</button>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </React.Fragment>
            )
            }
        </div >
    )
}
export default Detail;