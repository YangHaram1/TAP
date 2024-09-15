import styles from './Chat.module.css';
import List from './List/List';
import ChatApp from './ChatApp/ChatApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect } from 'react';
import { ChatsContext } from '../../../context/ChatsContext';
const Chat = () => {
    const {chatAdminRef } = useContext(ChatsContext);
    useEffect(()=>{
        if (chatAdminRef.current) {
            chatAdminRef.current.scrollTop = chatAdminRef.current.scrollHeight;
        }
    },[])
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {/* <FontAwesomeIcon icon={faHeadset} className={styles.icon} /> */}
                 CHAT 
            </div>
            <div className={styles.body}>
                <div className={styles.chatapp} ref={chatAdminRef}>
                    <ChatApp />
                </div>
                <div className={styles.list}>
                    <List />
                </div>
            </div>
        </div>
    )
}
export default Chat;