import styles from './Chat.module.css';
import List from './List/List';
import ChatApp from './ChatApp/ChatApp';

const Chat=()=>{
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                관리자 1:1 상담
            </div>
            <div className={styles.body}>
                <div className={styles.list}>
                    <List/>
                </div>
                <div className={styles.chatapp}>
                    <ChatApp/>
                </div>
                
            </div>
        </div>
    )
}
export default Chat;