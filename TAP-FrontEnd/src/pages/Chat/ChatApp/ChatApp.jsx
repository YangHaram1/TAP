import styles from './ChatApp.module.css';
import { useAuthStore, useCheckList, useNotification } from '../../../store/store';
import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { ChatsContext } from '../../../context/ChatsContext';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import SweetAlert from '../../../components/SweetAlert/SweetAlert';
import { host, api } from './../../../config/config';
import avatar from '../../../images/ai.png'
const ChatApp = () => {

    let lastDate = null // 이거 날짜 체크할떄 

    const editorRef = useRef(null);
    const [chats, setChats] = useState([]);
    const [list, setList] = useState();

    const { isAuth, loginID } = useAuthStore();
    const { ws, setChatNavi, chatNavi, dragRef, chatAppRef } = useContext(ChatsContext);
    const { chatController, chatSeq, onMessage, setChatSeq, setChatController, } = useCheckList();


    // WebSocket 연결을 설정하는 useEffect
    useEffect(() => {
        if (isAuth && ws.current != null) {
            console.log("chatapp")
            ws.current.onmessage = (e) => {
                if (e.data === 'chatController') {
                    setChatController();
                }
                else {
                    let chat = JSON.parse(e.data);
                    const { chatSeq } = useCheckList.getState();
                    //메세지 온거에 맞게 group_seq 사용해서 멤버 list받기 이건 chatSeq 없이 채팅 꺼저있을떄를 위해서 해놈
                    if (chatSeq === 0) {
                        api.get(`/group_member?group_seq=${chat.group_seq}`).then((resp) => {
                            if (chat.member_id !== loginID) {
                                resp.data.forEach((temp) => { //알림보내기 로직
                                    if (temp.member_id === loginID) {
                                        if (temp.alarm === 'Y') notify(chat);
                                    }
                                })
                            }
                        })
                    }
                    else if (chat.group_seq === chatSeq) {
                        setChats((prev) => {
                            return [...prev, chat]
                        })

                    }
                }
            }
        }
    }, [onMessage]);//chatNavi, 이거뻇음 일단


    useEffect(() => {
        if (isAuth) {
            if (chatNavi === 'chatapp') {
                const { chatSeq } = useCheckList.getState();
                if (chatSeq !== 0) {
                    api.get(`/chat?chatSeq=${chatSeq}`).then(resp => {//채팅목록 가저오기
                        setChats(resp.data);
                    })
                }
            }
        }
    }, [chatNavi, chatController])


    const notify = useCallback((item) => {
        const { maxCount, count, increment, decrement } = useNotification.getState();
        const { chatSeq } = useCheckList.getState();
        if (chatSeq !== 0) {
            return false;
        }
        if (count < maxCount) {
            console.log("알림");
            toast.info(`${item.name}님한테 메세지가 왔습니다`, {
                position: "top-right", // 오른쪽 위에 표시
                autoClose: 5000, // 5초 후 자동으로 닫힘
                hideProgressBar: false, // 진행 바 숨기기: false로 설정하여 진행 바 표시
                closeOnClick: true, // 클릭 시 닫기
                pauseOnHover: false, // 마우스 오버 시 일시 정지
                draggable: true, // 드래그 가능
                rtl: false, // RTL 텍스트 지원 비활성화
                onClose: decrement,
                onOpen: increment,
                onClick: () => handleToastOnclick(item),
                icon: <img src='' alt="custom-icon" className={styles.shake} />
            });
        }
    }, [chatSeq])

    const handleToastOnclick = (item) => {
        setChatNavi((prev) => {
            if (isAuth) dragRef.current.style.visibility = "visible";
            console.log(`on click toast:${item.group_seq} `);
            setChatSeq(item.group_seq);
            return 'chatapp'
        });
    }


    //다운로드 컨트롤
    const handleDownload = (split) => {
        const linkElement = document.createElement('a');
        // 2. 링크 속성 설정
        linkElement.href = `${host}/files/downloadChat?oriname=${split[0]}&sysname=${split[1]}`;
        linkElement.download = split[0];
        linkElement.click();
    }

    //채팅 list 목록 출력
    const handleChatsData = useCallback(() => {
        let count = 0;

        setList(
            chats.map((item, index) => {
                //---------------------------------------------// 날짜 로직 
                const formattedTimestamp = format(new Date(item.write_date), 'a hh:mm').replace('AM', '오전').replace('PM', '오후');
                const currentDate = format(new Date(item.write_date), 'yyyy-MM-dd');
                const isDateChanged = currentDate !== lastDate;
                if (isDateChanged) {
                    lastDate = currentDate;
                }

                //--------------------------------------------------// 내가쓴글인지 아닌지
                let idCheck = false;
                if (item.member_id === loginID) {
                    idCheck = true;
                }
                //--------------------------------------------------// 여기가 파일쪽 로직 처리
                let fileCheck = false;
                let file = '';
                if (item.upload_seq !== 0) {
                    const split = item.message.split('*');
                    fileCheck = true;
                    if (split[2] === '2') {
                        file = `<p style="color: blue; cursor: pointer;">${split[0]}</p>`;
                    }
                    else if (split[2] === '1') {
                        file = `<p style='color: blue; cursor: pointer;'><img src='${host}/images/chat/${split[1]}' alt=downloadImage></img></p>`;
                    }
                }
                //--------------------------------------------------// 여긴 시스템 로직 처리
                let systemCheck = false;
                if (item.member_id === 'system') {
                    systemCheck = true;
                }
                //--------------------------------------------------//
                return (
                    <React.Fragment key={index}>
                        {isDateChanged && (
                            <div className={styles.dateSeparator}>{currentDate}</div>
                        )}
                        {systemCheck && (
                            <div className={styles.system}><p>{item.message}</p></div>
                        )}
                        {!systemCheck && (
                            <div className={idCheck ? styles.div1Left : styles.div1} >
                                {
                                    !idCheck && (<div className={styles.avatar}><img src={avatar} alt="" /></div>)
                                }
                                <div>
                                    <div className={idCheck ? styles.nameReverse : styles.name}>{item.name}</div>
                                    <div className={idCheck ? styles.contentReverse : styles.content}>
                                        <div dangerouslySetInnerHTML={{ __html: ((fileCheck ? file : item.message)) }}
                                            className={idCheck ? styles.mboxReverse : styles.mbox} onClick={fileCheck ? () => SweetAlert('warning', '채팅방', '다운로드를 진행하시겠습니까?', () => handleDownload(item.message.split('*'))) : undefined}></div>
                                        <div style={{ display: "flex" }}>
                                            <div className={styles.date}>{formattedTimestamp}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                    </React.Fragment>
                );
            })
        );

    }, [chats])

    useEffect(() => {
        handleChatsData();
    }, [handleChatsData])

    return (
        <div className={styles.container} ref={chatAppRef}>
            <div className={styles.messages}>
                {
                    list
                }
            </div>
            <div className={styles.editor}>

            </div>

        </div>
    )
}
export default ChatApp;