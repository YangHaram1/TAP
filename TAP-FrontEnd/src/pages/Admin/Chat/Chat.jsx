import styles from './Chat.module.css';
import List from './List/List';
import ChatApp from './ChatApp/ChatApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
const Chat = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {/* <FontAwesomeIcon icon={faHeadset} className={styles.icon} /> */}
                 ChatAdmin
            </div>
            <div className={styles.body}>
                <div className={styles.chatapp}>
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