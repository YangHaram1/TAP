import styles from './Inquiry.module.css';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faPaperclip, faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';
import { useAuthStore } from './../../../store/store';
import MyEditor from './MyEditor/MyEditor';
import { api } from '../../../config/config';
import { useNavigate } from 'react-router-dom';
const Inquiry = () => {
    const editorRef = useRef(null);
    const fileRef = useRef(null);
    const navi = useNavigate();
    const [check, setCheck] = useState([false, false]);
    const [checkAll, setCheckAll] = useState(false);
    const [fileList, setFileList] = useState([]);
    const { name, isAuth } = useAuthStore();
    const [data, setData] = useState({
        name: '',
        email: '',
        category: '선택',
        title: '',
        contents: ''
    });
    const [regexData, setRegexData] = useState({
        email: false,
        title: false,
        contents: false,
        category: false
    })

    useEffect(() => {
        setData((prev) => {
            return { ...prev, name: name }
        })
    }, [name])
    //data
    // useEffect(()=>{
    //     console.log(data);
    // },[data])

    const handleData = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return { ...prev, [name]: value }
        })
        // console.log(`${name}:${value}`)

        if (name === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;
            setRegexData((prev) => {
                return { ...prev, [name]: emailRegex.test(value) }
            })

        }
        else if (name === 'title') {
            const titleRegex = /^.{1,30}$/;
            setRegexData((prev) => {
                return { ...prev, [name]: titleRegex.test(value) }
            })
        }
    }
    // useEffect(()=>{
    //     console.log(regexData)
    // },[regexData])

    const handleInputDelete = (e, type) => {
        setData((prev) => {
            return { ...prev, [type]: '' };
        })
        setRegexData((prev) => {
            return { ...prev, [type]: false }
        })
    }



    //체크박스
    const handleChange = (event) => {
        setData((prev) => {
            return { ...prev, category: event.target.value }
        }); // 선택된 값을 상태로 업데이트
        if (event.target.value !== '선택')
            setRegexData((prev) => {
                return { ...prev, category: true }
            })
        else {
            setRegexData((prev) => {
                return { ...prev, category: false }
            })
        }
    };

    const handleChangeCheck = (e) => {
        const { name, checked } = e.target;
        const nameInt = parseInt(name, 10);
        console.log(nameInt)
        setCheck((prev) => {
            const temp = [...prev]; // 배열 복사
            temp[nameInt] = checked; // 새로운 값 설정
            return temp; // 새로운 배열 반환
        })
        if (!checked) {
            setCheckAll(false);
        }
    }
    const handleCheckAll = (e) => {
        setCheckAll(e.target.checked);
        if (e.target.checked) {
            setCheck([true, true])
        }
        else {
            setCheck([false, false])
        }
    }

    useEffect(() => {
        if (check[0] && check[1]) {
            setCheckAll(true);
        }
    }, [check])


    //파일
    const handleFile = (e) => {
        const files = fileRef.current.files;

        setFileList((prev) => {
            const temp = [...prev];
            for (let index = 0; index < files.length; index++) {
                if (temp.length > 4) break;
                temp.push(files[index]);
            }
            return temp
        })

    }
    const handleFileClick = (e) => {
        fileRef.current.value = '';
        if (fileList.length > 4) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: '파일',
                text: '최대 5개 까지만 등록 가능합니다.'
            })
        }
    }
    const deleteFile = (i) => {
        setFileList((prevList) =>
            prevList.filter((item, index) => index !== i)
        );
    };
    // 파일 크기를 읽기 쉽게 변환하는 함수 (KB, MB) - 반올림 포함
    const formatFileSize = (size) => {
        if (size < 1024) return `${size} bytes`;
        if (size < 1024 * 1024) return `${Math.round(size / 1024)}KB`; // 정수로 반올림
        return `${Math.round(size / (1024 * 1024))}MB`; // 정수로 반올림
    };

    // useEffect(()=>{
    //     console.log(fileList)
    // },[fileList])

    ///
    const handleConfirm = () => {
        const formData = new FormData();

        for (let index = 0; index < fileList.length; index++) {
            formData.append("files", fileList[index]);
        }
        const jsonData = JSON.stringify(data) // 객체를 json 형식의 문자열로 바꿔주는 직렬화
        formData.append('inquiry', jsonData)

        api.post(`/inquiry`, formData).then((resp) => {

            Swal.fire({
                icon: 'success',
                title: '문의',
                text: '정상적으로 문의가 등록 되었습니다.'
            })
            navi('/support');

        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                1:1 문의하기
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    이름 <span>*</span>
                </div>
                <div className={styles.input}>
                    <input type="text" placeholder='이름을 입력해주세요' value={data.name || ''} name='name' onChange={handleData} disabled={isAuth ? true : false} />
                    {(<button className={!isAuth ? (data.name !== '' ? styles.cancel : styles.hidden) : styles.hidden} onClick={(e) => { handleInputDelete(e, 'email') }}>X</button>)}
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    답변 받을 이메일 주소 <span>*</span>
                </div>
                <div className={styles.input}>
                    <input type="text" placeholder='이메일을 입력해주세요.' value={data.email} name='email' onChange={handleData} />
                    {(<button className={data.email !== '' ? styles.cancel : styles.hidden} onClick={(e) => { handleInputDelete(e, 'email') }}>X</button>)}

                </div>
                <div>
                    {data.email === '' ? <span>이메일을 입력해주세요.</span> : (regexData.email ? (<span style={{ color: 'blue' }}>이메일 형식이 맞습니다.</span>) : (<span>이메일 형식에 맞게 입력해주세요.</span>))}
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    문의 유형 <span>*</span>
                </div>
                <div className={styles.input}>
                    <select className={styles.select} value={data.category} onChange={handleChange}>
                        <option value="선택">선택</option>
                        <option value="예매">예매</option>
                        <option value="할인">할인</option>
                        <option value="결제/수수료">결제/수수료</option>
                        <option value="배송/반송">배송/반송</option>
                        <option value="회원가입">회원가입</option>
                        <option value="회원정보변경">회원정보변경</option>
                        <option value="회원탈퇴">회원탈퇴</option>
                        <option value="기타">기타</option>
                    </select>
                    <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
                    
                </div>
                {data.category === '선택' ? <span>선택해 주세요.</span> : (regexData.category ? (<span style={{ color: 'blue' }}>선택 완료되었습니다.</span>) : (<span>이메일 형식에 맞게 입력해주세요.</span>))}
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    문의 내용 <span>*</span>
                </div>
                <div className={styles.input}>
                    <input type="text" placeholder='제목을 입력해주세요' name='title' value={data.title} onChange={handleData} />
                    {(<button className={data.title !== '' ? styles.cancel : styles.hidden} onClick={(e) => { handleInputDelete(e, 'title') }}>X</button>)}
                </div>
                <div>
                    {data.title === '' ? <span>30자 이내로 입력해주세요.</span> : (regexData.title ? (<span style={{ color: 'blue' }}>30자 이내 입니다.</span>) : (<span>30자 이내로 적어주세요</span>))}
                </div>
                <div style={{ paddingRight: '40px' }}>
                    <MyEditor editorRef={editorRef} height={'400px'} setData={setData} setRegexData={setRegexData} />
                </div>
                <div>
                    {data.contents === '' ? <span>내용을 입력해주세요.</span> : (regexData.contents ? (<span style={{ color: 'blue' }}>1000자 이내 입니다.</span>) : (<span>1000자 이내로 적어주세요</span>))}
                </div>


            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    첨부 파일
                </div>
                <div className={styles.input} onClick={() => { fileRef.current.click(); }}>
                    <input type='text' placeholder='파일을 등록해주세요' disabled={true} className={styles.none} defaultValue={''} ></input>
                    <button className={styles.fileBtn} ><FontAwesomeIcon icon={faPaperclip} /></button>
                    <input type="file" multiple className={styles.file} ref={fileRef} onChange={handleFile} onClick={handleFileClick} />
                </div>
                <div className={styles.fileList}>
                    {
                        fileList.map((item, index) => {
                            return (
                                <div className={styles.fileContent} key={index}>
                                    <div className={styles.fileInfo}>
                                        <div className={styles.fileName}>
                                            <FontAwesomeIcon icon={faFileLines} />
                                            <p>{item.name}</p>
                                        </div>
                                        <div className={styles.size}>
                                            <p>({formatFileSize(item.size)})</p>
                                            <FontAwesomeIcon icon={faSquareArrowUpRight} />
                                        </div>
                                        <div className={styles.fileX}>
                                            <button className={styles.fileDeleteBtn} onClick={() => deleteFile(index)}>x</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.detail}>
                    <ul>
                        <li>
                            <p>사진 및 파일은 최대 5개까지 등록 가능해요.</p>
                        </li>
                        <li>
                            <p>10MB 이내의 모든 이미지 및 PDF, TXT, MS office 문서 및 zip파일을 업로드해주세요.</p>
                        </li>
                        <li>
                            <p>첨부 파일 형식 및 내용이 1:1 문의 내용과 맞지 않는 경우(비방, 음란, 고유식별정보 포함 등) 관리자에</p>
                        </li>
                        <li>
                            <p>의해 자동 삭제 될 수 있습니다.</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={`${styles.contents} ${styles.line}`}>
                <div className={styles.title}>
                    안내 사항
                </div>
                <div className={styles.detail}>
                    <ul>
                        <li>
                            <p>로그인 후 등록한 문의에 한해 TAP 고객센터 "내 문의내역" 에서 확인할 수 있어요.</p>
                        </li>
                        <li>
                            <p>비회원 문의 또는 로그인 하지 않은 상태의 1:1 문의 답변은 메일로만 전달되니 회원이시라면 로그인 후 문의해주세요.</p>
                        </li>
                        <li>
                            <p>업무시간 내 순차적으로 답변드리니 조금만 기다려주세요. (상품 유형에 따라 고객센터 운영 시간에 차이가 있습니다.)</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.checkTitle}>
                    <div>
                        <input type="checkbox" onChange={handleCheckAll} checked={checkAll} className={styles.checkBox} />
                    </div>
                    <div>
                        전체 동의 <span>*</span>
                    </div>
                </div>
                <div className={styles.check}>
                    <div className={styles.check1}>
                        <div>
                            <input type="checkbox" onChange={handleChangeCheck} checked={check[0]} className={styles.checkBox} name='0' />
                        </div>
                        <div>
                            {`(필수) 개인정보 수집 - 이용동의 >`}
                        </div>
                    </div>
                    <div className={styles.check2}>
                        <div>
                            <input type="checkbox" onChange={handleChangeCheck} checked={check[1]} className={styles.checkBox} name='1' />
                        </div>
                        <div>
                            {`(필수) 개인정보 제 3자 제공 동의 >`}
                        </div>
                    </div>
                </div>
                <div className={(checkAll && regexData.email && regexData.title && regexData.contents && regexData.category) ? styles.confirmReverse : styles.confirm} onClick={handleConfirm}>
                    <button>문의하기</button>
                </div>
            </div>
        </div>
    )

}
export default Inquiry;