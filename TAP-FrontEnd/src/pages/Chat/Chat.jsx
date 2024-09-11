import styles from './Chat.module.css';
import { useContext, useEffect } from 'react';
import { useAuthStore } from '../../store/store';
import { ChatsContext } from '../../context/ChatsContext';
import Home from './Home/Home';
import AI from './AI/AI';
import ChatApp from './ChatApp/ChatApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan ,faRotateLeft} from '@fortawesome/free-solid-svg-icons';

const Chat = ({ websocketRef, draggableRef, setDisabled }) => {
    const { chatNavi, ws, setChatNavi, dragRef,chatAppRef } = useContext(ChatsContext);
    const { loginID } = useAuthStore;


    useEffect(() => {
        if (draggableRef.current)
            dragRef.current = draggableRef.current;
    }, [draggableRef])


    const handleEscKey = (event) => {
        if (event.key === 'Escape') {
            dragRef.current.style.visibility = 'hidden';
        }
    };

    useEffect(() => {
        ws.current = websocketRef.current;
        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    const handleDrag = (e, check) => {
        setDisabled(check);
    }

    const handleCancel = () => {
        dragRef.current.style.visibility = 'hidden';
        chatAppRef.current.style.display = "none";
        setChatNavi('');
    }
    const handleRotate=()=>{
        setChatNavi(''); 
        chatAppRef.current.style.display = "none";
    }

    return (
        <div className={styles.container}>
            <div className={styles.btn} onMouseEnter={(e) => handleDrag(e, false)} onMouseLeave={(e) => handleDrag(e, true)}>
                <div>
                 {(chatNavi !== '') &&(  <button onClick={handleRotate}> <FontAwesomeIcon icon={faRotateLeft} /></button>)}
                </div>
                <div>
                    <button onClick={handleCancel}><FontAwesomeIcon icon={faBan} /></button>
                </div>
            </div>
            {(chatNavi === '') && (<Home />)}
            {chatNavi === 'ai' && (<AI />)}
             <ChatApp/>
        </div>
    )
}
export default Chat;
