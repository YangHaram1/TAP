import userstyles from './ChatApp.module.css';
import adminStyles from '../../Admin/Chat/ChatApp/ChatApp.module.css';
import { useAuthStore, useCheckList, useNotification } from '../../../store/store';
import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { ChatsContext } from '../../../context/ChatsContext';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import SweetAlert from '../../../components/SweetAlert/SweetAlert';
import { host, api } from './../../../config/config';
import avatar from '../../../images/ai.png'
import MyEditor from '../MyEditor/MyEditor';
import logo from '../../../images/logo192.png'
import 'react-toastify/dist/ReactToastify.css'
const ChatApp = () => {

    let lastDate = null // 이거 날짜 체크할떄 

    const editorRef = useRef(null);
    const chatRef = useRef(null);
    const [chats, setChats] = useState([]);
    const [styles, setStyles] = useState(false);
    //const [list, setList] = useState();

    const { isAuth, loginID, role } = useAuthStore();
    const { chatAdminRef, ws, setChatNavi, chatNavi, dragRef, chatAppRef, chatList, setChatList } = useContext(ChatsContext);
    const { chatSeq, onMessage, setChatSeq, setChatController, } = useCheckList();


    // WebSocket 연결을 설정하는 useEffect
    useEffect(() => {
        if (isAuth && ws.current != null) {
            console.log("chatapp")
            ws.current.onmessage = (e) => {
                let chat = JSON.parse(e.data);
                const { chatSeq } = useCheckList.getState();
                //메세지 온거에 맞게 group_seq 사용해서 멤버 list받기 이건 chatSeq 없이 채팅 꺼저있을떄를 위해서 해놈
                if (chatSeq !== chat.group_seq) {
                    api.get(`/groupmember?groupSeq=${chat.group_seq}`).then((resp) => {
                        if (chat.member_id !== loginID) {
                            resp.data.forEach((temp) => { //알림보내기 로직
                                if (temp.member_id === loginID) {
                                    if (temp.alarm === 'Y') {
                                        notify(chat);
                                    }
                                    setChatController();
                                }
                            })
                        }
                    })

                }
                else if (chat.group_seq === chatSeq) {
                    setChats((prev) => {
                        return [...prev, chat]
                    })
                    api.patch(`/groupmember?group_seq=${chatSeq}&&last_chat_seq=${chat.seq}`).then((resp) => {
                        setChatController();
                    });

                }
                else {
                    alert("에러입니다")
                    console.log(chat.group_seq)
                }


            }
        }
        setStyles(userstyles);
    }, [onMessage]);//chatNavi, 이거뻇음 일단


    useEffect(() => {
        if (isAuth) {
            const { chatSeq } = useCheckList.getState();
            if (chatSeq !== 0) {
                if (chatNavi === 'chatapp') {
                    setStyles(userstyles);

                    api.get(`/chat/${chatSeq}`).then(resp => {//채팅목록 가저오기
                        setChats(resp.data);

                    })
                }
                else if (chatNavi === 'admin') {
                    console.log('admin chat')
                    setStyles(adminStyles);
                    api.get(`/chat/${chatSeq}`).then(resp => {//채팅목록 가저오기
                        setChats(resp.data);
                        api.patch(`/groupmember?group_seq=${chatSeq}&&last_chat_seq=${resp.data[resp.data.length - 1].seq}`).then((resp) => {
                            setChatController();
                        });
                    })

                }
            }
        }
    }, [chatNavi, chatSeq])


    const notify = useCallback((item) => {
        const { maxCount, count, increment, decrement } = useNotification.getState();
        console.log("알림")
        let title;
        if (role === 'ROLE_ADMIN') {
            title = `${item.member_id}님한테 상담메세지가 왔습니다`;
        }
        else {
            title = '관리자 답변이 왔습니다.'
        }
        if (count < maxCount) {
            console.log("알림");
            toast.info(`${title}`, {
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
                icon: <img src={logo} alt="custom-icon" className={styles.shake} />
            });
        }
    }, [chatSeq])

    const handleToastOnclick = (item) => {
        setChatNavi((prev) => {
            if(role==='ROLE_USER'){
                console.log(`on click toast:${item.group_seq} `);
                if (isAuth) {
                    dragRef.current.style.visibility = "visible";
                    chatAppRef.current.style.display = "flex";
                    setChatSeq(item.group_seq);
                    return 'chatapp';
                }
               
            }else if(role==='ROLE_ADMIN'){
                if (isAuth) {
                    setChatSeq(item.group_seq);
                    return 'admin';
                }
            }
            else{
                return '';
            }
          

        });
    }


    //다운로드 컨트롤
    const handleDownload = (split) => {
        const sysname = split[1];
        const oriname = split[0];
        api.get(`/file/download?sysname=${sysname}&oriname=${oriname}`, { responseType: 'blob' }).then((resp) => {
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement('a');
            link.href = url;
            // 서버에서 받은 파일 이름으로 다운로드 파일명 설정
            link.setAttribute('download', oriname);
            link.click();
        })
    }

    //채팅 list 목록 출력
    const handleChatsData = useCallback(() => {

        setChatList(
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
                    // if (split[2] === '2') {

                    // }
                    // else if (split[2] === '1') {
                    //     file = `<p style='color: blue; cursor: pointer;'><img src='${host}/images/chat/${split[1]}' alt="downloadImage" class="${styles.img}"></img></p>`;
                    // }
                    file = `<p style="color: blue; cursor: pointer;">${split[0]}</p>`;
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
                                <div className={styles.contents}>
                                    {/* <div className={idCheck ? styles.nameReverse : styles.name}>{item.member_id}</div> */}
                                    <div className={idCheck ? styles.contentReverse : styles.content}>
                                        <div dangerouslySetInnerHTML={{ __html: ((fileCheck ? file : item.message)) }}
                                            className={idCheck ? styles.mboxReverse : styles.mbox} onClick={fileCheck ? () => SweetAlert('warning', '채팅방', '다운로드를 진행하시겠습니까?', () => handleDownload(item.message.split('*'))) : undefined}></div>
                                        <div className={styles.date}>{formattedTimestamp}</div>
                                    </div>
                                </div>
                            </div>)
                        }
                    </React.Fragment>
                );
            })
        );

    }, [chats])

    useEffect(() => {
        handleChatsData();
    }, [handleChatsData])
    const scrollBottom = useCallback(() => {

        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
        if (chatAdminRef.current) {
            chatAdminRef.current.scrollTop = chatAdminRef.current.scrollHeight;
        }

    }, [chatList]);
    useEffect(() => { //스크롤 
        scrollBottom();
    }, [scrollBottom]);

    return (
        <div className={styles.container} ref={chatAppRef}>
            <div className={styles.messages} ref={chatRef}>
                {
                    chatList
                }
            </div>
            <div className={styles.editor}>
                <MyEditor editorRef={editorRef} height={120} />
            </div>
        </div>
    )
}
export default ChatApp;