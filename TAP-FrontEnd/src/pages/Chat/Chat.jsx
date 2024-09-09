import styles from'./Chat.module.css';
import { useContext,useEffect } from 'react';
import { useAuthStore } from '../../store/store';
import { ChatsContext } from '../../context/ChatsContext';
import Home from './Home/Home';
import AI from './AI/AI';
import ChatApp from './ChatApp/ChatApp';
const Chat=({websocketRef,draggableRef,setDisabled})=>{
    const { chatAppRef,chatNavi,ws,setChatNavi,dragRef} = useContext(ChatsContext);
    const { loginID } = useAuthStore;
    ws.current=websocketRef.current;
   

    useEffect(()=>{
      if(draggableRef.current)
      dragRef.current=draggableRef.current;
    },[draggableRef])
 

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        draggableRef.current.style.visibility='hidden';
      }
    };
    
    useEffect(() => {
        document.addEventListener('keydown', handleEscKey);
        return () => {
          document.removeEventListener('keydown', handleEscKey);
        };
      }, []);

    return(
        <div className={styles.container} ref={chatAppRef}>
           {(chatNavi==='')&&( <Home/>)}
           {chatNavi==='AI'&&( <AI/>)}
           {chatNavi==='ChatApp'&&( <ChatApp/>)}
        </div>
    )
}
export default Chat;
