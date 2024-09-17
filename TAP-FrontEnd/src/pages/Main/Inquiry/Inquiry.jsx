import styles from './Inquiry.module.css';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faPaperclip, faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';
const Inquiry = () => {
    const [selected, setSelected] = useState(''); // 초기값 설정
    const [check, setCheck] = useState([false, false]);
    const [checkAll, setCheckAll] = useState(false);
    const fileRef = useRef();
    const [fileList, setFileList] = useState([]);

    const handleChange = (event) => {
        setSelected(event.target.value); // 선택된 값을 상태로 업데이트
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
                    <div>
                        <input type="text" />
                    </div>
                    <div>
                        {true === '' ? '' : (<button className={styles.cancel} onClick={() => { }}>X</button>)}
                    </div>
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    답변 받을 이메일 주소 <span>*</span>
                </div>
                <div className={styles.input}>
                    <div>
                        <input type="text" />
                    </div>
                    <div>
                        {true === '' ? '' : (<button className={styles.cancel} onClick={() => { }}>X</button>)}
                    </div>
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    답변 받을 휴대폰 번호 <span>*</span>
                </div>
                <div className={styles.input}>
                    <div>
                        <input type="text" />
                    </div>
                    <div>
                        {true === '' ? '' : (<button className={styles.cancel} onClick={() => { }}>X</button>)}
                    </div>
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    문의 유형 <span>*</span>
                </div>
                <div className={styles.input}>
                    <select className={styles.select} value={selected} onChange={handleChange}>
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

            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    문의 내용 <span>*</span>
                </div>
                <div className={styles.input}>
                    <input type="text" placeholder='제목을 입력해주세요' />
                </div>
                <div className={styles.input}>
                    <input type="text" placeholder='문의 내용을 자세히 입력해주세요' />
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    첨부 파일
                </div>
                <div className={styles.input} onClick={() => { fileRef.current.click(); }}>
                    <div>
                        <input type='text' placeholder='파일을 등록해주세요' disabled={true} className={styles.none} ></input>
                    </div>
                    <div>
                        {true === '' ? '' : (<button className={styles.fileBtn} ><FontAwesomeIcon icon={faPaperclip} /></button>)}
                    </div>
                    <input type="file" multiple className={styles.file} ref={fileRef} onChange={handleFile} onClick={handleFileClick} />
                </div>
                <div className={styles.fileList}>
                    {
                        fileList.map((item, index) => {
                            return (
                                <div className={styles.fileContent}>
                                    <div className={styles.fileInfo}>
                                        <div className={styles.fileName}>
                                            <FontAwesomeIcon icon={faFileLines} />
                                            <p>{item.name}</p>
                                        </div>
                                        <div className={styles.size}>
                                            <p>({formatFileSize(item.size)})</p>
                                            <FontAwesomeIcon icon={faSquareArrowUpRight}/>
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
                            <p>로그인 후 등록한 문의에 한해 인터파크 고객센터 "내 문의내역" 에서 확인할 수 있어요.</p>
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
                        <input type="checkbox" onChange={handleCheckAll} checked={checkAll} />
                    </div>
                    <div>
                        전체 동의
                    </div>
                </div>
                <div className={styles.check}>
                    <div className={styles.check1}>
                        <div>
                            <input type="checkbox" onChange={handleChangeCheck} checked={check[0]} name='0' />
                        </div>
                        <div>
                            {`(필수) 개인정보 수집 - 이용동의 >`}
                        </div>
                    </div>
                    <div className={styles.check2}>
                        <div>
                            <input type="checkbox" onChange={handleChangeCheck} checked={check[1]} name='1' />
                        </div>
                        <div>
                            {`(필수) 개인정보 제 3자 제공 동의 >`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Inquiry;