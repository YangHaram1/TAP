import styles from './Modal.module.css';
import SweetAlert from '../../../../../components/SweetAlert/SweetAlert';
import { api } from '../../../../../config/config';
import { useContext ,useState,useEffect} from 'react';
import { useCheckList } from '../../../../../store/store';
import { ChatsContext } from '../../../../../context/ChatsContext';
const Modal=({ modalRef, index, item, setGroup_chats, setCountBookmark })=>{
    const group_seq = item.seq;
    const { ws } = useContext(ChatsContext);
    const { setChatController } = useCheckList();
    
    const handleDelete = () => {
        api.delete(`/groupmember?groupSeq=${group_seq}`).then((resp) => {
            setGroup_chats((prev) => {
                return (
                    prev.filter((temp) => {
                        if (temp.seq === group_seq) {
                            return false;
                        }
                        return true;
                    })
                )
            });
            // setCountBookmark((prevBookmark) => {
            //   return prevBookmark-1;
            // })
            // setChatController();
        })
    }

    const handleAlarm = () => {
        api.patch(`/groupmember?group_seq=${group_seq}&&type=alarm`).then((resp) => {
            setGroup_chats((prev) => {
                return (
                    prev.map((temp) => {
                        if (temp.seq === group_seq) {
                            return { ...temp, alarm: temp.alarm === 'Y' ? 'N' : 'Y' }
                        }
                        return temp;
                    })
                );
            })
        })

    }
    const handleBookmark = () => {
        api.patch(`/groupmember?group_seq=${group_seq}&&type=bookmark`).then((resp) => {
            let check = true;
            setGroup_chats((prev) => {
                return (
                    prev.map((temp) => {
                        if (temp.seq === group_seq) {
                            if (check) {
                                setCountBookmark((prevBookmark) => {
                                    return temp.bookmark === 'Y' ? prevBookmark - 1 : prevBookmark + 1;
                                })
                                check = false;
                            }
                            return { ...temp, bookmark: temp.bookmark === 'Y' ? 'N' : 'Y' }
                        }
                        return temp;
                    })
                );
            })
        })
    }
    return(
        <div className={styles.container}  ref={el => modalRef.current[index] = el}>
                <div className={styles.content} onClick={handleAlarm} >
                    {item.alarm === 'Y' ? '알림 끄기' : '알림 켜기'}
                </div>
                <div className={styles.content} onClick={handleBookmark} >
                    {item.bookmark === 'Y' ? '즐겨찾기 해제' : '즐겨찾기 등록'}
                </div>
                {/* <div className={styles.content} onClick={handleBookmark} >
                    회원 프로필
                </div> */}
                <div className={styles.content} onClick={()=>SweetAlert('warning','채팅방','채팅방을 나가시겠습니까?',handleDelete)}>
                    나가기
                </div>
        </div>
    )
}
export default Modal;