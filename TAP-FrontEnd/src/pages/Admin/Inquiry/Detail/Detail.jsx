import { useEffect, useState } from 'react';
import styles from './Detail.module.css';
import { useParams } from 'react-router-dom';
import { api } from '../../../../config/config';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
const Detail = () => {
    const { seq } = useParams();
    const [dto, setDto] = useState({});
    const [reply, setReply] = useState({});
    const [fileList, setFileList] = useState([]);
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


    return (
        <div className={styles.container}>
            <div className={styles.dto} >
                <div className={styles.status}>
                    {dto.status === 0 ? '답변대기' : '답변완료'}
                </div>
                <div className={styles.body}>
                    <div className={styles.title}>
                        {dto.title}
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
                                <div className={styles.fileInfo}  onClick={() => handleDownload(item)}>
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
                        <div className={styles.content} dangerouslySetInnerHTML={ {__html:dto.contents}}>
                      
                        </div>
                        <div className={styles.contentDate}>
                            {isNaN(new Date(dto.write_date)) ? 'Invalid date' : format(new Date(dto.write_date), 'yyyy.MM.dd HH:mm')}
                        </div>
                    </div>
                </div>
                <div className={styles.reply}>
                    <div className={styles.a}>
                        A
                    </div>
                    <div className={styles.inquiryBody}>
                        <div className={styles.content}>
                            {reply.contents === undefined ? '죄송합니다 답변을 기다려주세요.' : reply.contents}
                        </div>
                        <div className={styles.contentDate}>
                            {isNaN(new Date(reply.write_date)) ? '' : format(new Date(reply.write_date), 'yyyy.MM.dd HH:mm')}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}
export default Detail;