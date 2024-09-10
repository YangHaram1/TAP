import styles from './ChatApp.module.css';
import { useAuthStore, useCheckList, useNotification } from '../../../store/store';
import { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { ChatsContext } from '../../../context/ChatsContext';
import { api } from './../../../config/config';
import { toast } from 'react-toastify';
const ChatApp = () => {
    const editorRef = useRef(null);
    const [chats, setChats] = useState();
    const [maxRetries, setMaxRetries] = useState(0);
    const { isAuth, loginID } = useAuthStore();
    const { ws, setChatNavi, chatNavi, dragRef } = useContext(ChatsContext);
    const {  chatController,chatSeq, setChatSeq, setOnmessage, setWebSocketCheck, setChatController } = useCheckList();


    // WebSocket 연결을 설정하는 useEffect
    useEffect(() => {
        //const url = host.replace(/^https?:/, '')
        if (isAuth) {
            ws.current.onclose = () => {
                console.log('Disconnected from WebSocket');
                if (maxRetries < 10) {
                    setWebSocketCheck();
                    console.log("websocket 재연결 시도")
                }
                setMaxRetries((prev) => {
                    return prev + 1;
                })
            };

            ws.current.onerror = (error) => {
                console.log('WebSocket error observed:', error);
                if (maxRetries < 10) {
                    setWebSocketCheck();
                    console.log("websocket 재연결 시도")
                }
                setMaxRetries((prev) => {
                    return prev + 1;
                })

            };

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
                            setOnmessage();
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
        return () => {
        };

    }, [chatNavi,chatController]);


    useEffect(() => {
        if (isAuth) {
            const { chatSeq } = useCheckList.getState();
            if (chatSeq !== 0) {
                api.get(`/chat?chatSeq=${chatSeq}`).then(resp => {//채팅목록 가저오기
                    setChats(resp.data);
                })
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

    return (
        <div className={styles.container}>

        </div>
    )
}
export default ChatApp;