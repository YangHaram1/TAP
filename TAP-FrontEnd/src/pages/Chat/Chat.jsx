import styles from'./Chat.module.css';
import { useContext,useEffect } from 'react';
import { useAuthStore } from '../../store/store';
import { ChatsContext } from '../../context/ChatsContext';
const Chat=({websocketRef,draggableRef,setDisabled})=>{
    const { chatAppRef,chatNavi,ws,setChatNavi,dragRef} = useContext(ChatsContext);
    const { loginID } = useAuthStore;
    ws.current=websocketRef.current;
   

    useEffect(()=>{
        if(loginID!==null){
          setChatNavi('chat1');
         
        }
    },[loginID])

    useEffect(()=>{
      if(draggableRef.current)
      dragRef.current=draggableRef.current;
    },[draggableRef])
 
    if(chatNavi===''){
      if(chatAppRef.current!=null)
      chatAppRef.current.style.display='none';
      
      if(dragRef.current)
        dragRef.current.style.display='none';
    }

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        // Esc 키가 눌렸을 때 실행될 코드
        setChatNavi('');
      }
    };
    useEffect(() => {
        document.addEventListener('keydown', handleEscKey);
        return () => {
          document.removeEventListener('keydown', handleEscKey);
        };
      }, []);

    return(
        <div className={styles.container}>
            나는 채팅이다dasdas
        </div>
    )
}
export default Chat;
