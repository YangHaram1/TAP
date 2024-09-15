import React, { useEffect, useState, useCallback, useContext, useRef } from 'react';
import styles from './List.module.css';
import { useAuthStore, useCheckList } from '../../../../store/store';
import { ChatsContext } from '../../../../context/ChatsContext';
import { api } from '../../../../config/config';
import { format } from 'date-fns';
import Modal from './Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBellSlash, faComment, faCommentSlash, faExclamation, faSlash, faThumbtack } from '@fortawesome/free-solid-svg-icons';


const List = () => {
    const modalRef = useRef([]);

    const { isAuth } = useAuthStore();
    const { setChatSeq, chatController } = useCheckList();
    const { setChatNavi, dragRef } = useContext(ChatsContext);
    const [group_chats, setGroup_chats] = useState([]);
    const [modalDisplay, setModalDisplay] = useState(null);
    const [countBookmark, setCountBookmark] = useState(-1);
    const [list,setList]=useState([]);

    const [oneTime,setOneTime]=useState(true);
    useEffect(() => {

        api.get(`/groupchat`).then((resp) => {
            if (resp != null) {
                if (resp.data !== '' && resp.data !== 'error') {
                   // console.log(resp.data);
                    let count = -1;

                    (resp.data).forEach((temp) => {
                        if (temp.bookmark === 'Y') count++;

                    })
                    setCountBookmark(count);
                    setGroup_chats(resp.data);
                }
                else {
                    setGroup_chats([]);
                }
            }
        })
    }, [chatController])

    const handleRightClick = (index) => (e) => {
        const x = e.clientX ;
        const y = e.clientY;
        e.preventDefault();
        setModalDisplay((prev) => {
            if (prev != null) {
                prev.style.display = 'none'
            }
            modalRef.current[index].style.display = 'flex';
            modalRef.current[index].style.top = (y) + 'px';
            modalRef.current[index].style.left = (x) + 'px';
            return modalRef.current[index];
        });
    };

    const handleClick = (event) => {
        if (event.button===0) { //왼쪽클릭
            setModalDisplay((prev) => {
                if (prev != null) {
                    prev.style.display = 'none'
                }
                return null;
            })
        }
        
    }
    useEffect(() => {
        window.addEventListener('click', handleClick)

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('click', handleClick)
        }
    }, [])

    const handleDoubleClick = (seq) => () => {
        if (isAuth) {
            setChatSeq(seq);
        }
    }

    const handleSort = useCallback(() => {
        const sortedItems = (group_chats).sort((a, b) => {
            // 북마크가 'Y'인 항목을 먼저 오게 하려면
            if (a.bookmark === 'Y' && b.bookmark === 'N') {
                return -1; // a를 위로 이동
            }
            if (a.bookmark === 'N' && b.bookmark === 'Y') {
                return 1; // b를 위로 이동
            }
            // 북마크가 동일한 경우, seq 값에 따라 정렬
            // 둘 다 북마크가 'Y'거나 둘 다 'N'인 경우
            if (a.bookmark === b.bookmark) {
                if (a.dto === null && b.dto === null) {
                    return 0; // 둘 다 null인 경우 순서를 변경하지 않음
                }
                if (a.dto === null) {
                    return 1; // a.dto가 null이면 a를 뒤로 보냄
                }
                if (b.dto === null) {
                    return -1; // b.dto가 null이면 b를 뒤로 보냄
                }
                // 둘 다 dto가 존재하면, seq 값으로 정렬
                return b.dto.seq - a.dto.seq;
            }
            return false;
        });
        // setCount(countBookmark);
        if(oneTime){//한번만 실행
            setChatSeq(sortedItems[0].seq);
            setOneTime(false);
        }
      
        setList(sortedItems)
    }, [group_chats])
    useEffect(()=>{
        if(group_chats.length>0)
        handleSort();
    },[handleSort])

    const truncateHtmlText = (htmlString, maxLength) => {
        // HTML 문자열을 DOM 요소로 파싱
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        // 텍스트만 추출
        const textContent = doc.body.textContent || '';

        // 텍스트를 자르고 ... 추가
        const truncatedText = textContent.length > maxLength
            ? textContent.slice(0, maxLength) + '...'
            : textContent;

        return truncatedText;
    };


    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.title}>
                    User List
                </div>
                <div className={styles.contents}>
                    {
                        list.map((item, index) => {
                            let formattedTimestamp = '';
                            if (item.dto != null) {
                                formattedTimestamp = format(new Date(item.dto.write_date), 'yyyy-MM-dd');
                            }

                            let truncatedText;
                            if ((item.dto != null) && (item.dto.message.length > 10)) {

                                truncatedText = truncateHtmlText(item.dto.message, 10);
                                //item.dto.message.slice(0, 10) + '...';
                            }
                            else if ((item.dto != null)) {
                                truncatedText = item.dto.message;
                            }
                            return (
                                <React.Fragment key={index}>
                                    <div className={styles.room} onContextMenu={handleRightClick(index)} onDoubleClick={handleDoubleClick(item.seq)}>
                                        <div className={styles.message}>
                                            <div className={styles.name}>
                                                <div className={styles.username}>
                                                    {item.mdto.id}{`(${item.mdto.name})`}
                                                </div>
                                                <div className={styles.bookmark}>
                                                    {item.bookmark === 'Y' &&(<FontAwesomeIcon icon={faThumbtack}  className={styles.icon}/>) }
                                                  
                                                </div>
                                            </div>
                                            <div>
                                                <div className={styles.content} dangerouslySetInnerHTML={{ __html: (item.dto != null) ? truncatedText : '메세지가 없습니다' }}>
                                                </div>
                                                <div className={styles.unread}>
                                                    {item.unread > 0 && (<span>{item.unread}+</span>)}
                                                </div>
                                            </div>

                                        </div>
                                        <div style={{ display: "flex", gap: "10px", paddingRight: "10px" }}>
                                            <div className={styles.write_date}>
                                                {formattedTimestamp}
                                            </div>
                                            <div className={styles.alarm}>
                                                {item.alarm === 'Y' ? (<FontAwesomeIcon icon={faBell} />) : (<FontAwesomeIcon icon={faBellSlash} />)}
                                            </div>
                                        </div>
                                    </div>
                                    {index === countBookmark && (<div className={styles.line}></div>)}
                                    <Modal modalRef={modalRef} index={index} item={item} setGroup_chats={setGroup_chats} setCountBookmark={setCountBookmark} />
                                </React.Fragment>
                            );
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
export default List;