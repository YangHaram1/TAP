import styles from './Home.module.css';
import logo from '../../../images/logo192.png';
import ai from '../../../images/ai.png';
import chat from '../../../images/chat.png';
import { useContext, useEffect } from 'react';
import { ChatsContext } from '../../../context/ChatsContext';
import { api } from '../../../config/config';
import { useCheckList } from '../../../store/store';

const Home = () => {
    const {setChatNavi,chatAppRef} =useContext(ChatsContext);
    const {setChatSeq,chatSeq} =useCheckList();

    const handleChat=()=>{
        api.post(`groupchat`).then((resp)=>{
            setChatNavi('chatapp');
            chatAppRef.current.style.display = "flex";
            setChatSeq(resp.data);
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt=''></img>
            </div>
            <div className={styles.text}>
                <p><span>Support</span>에 오신걸 환영합니다</p>
                <p>아래 버튼을 <span>클릭</span>해주세요</p>
            </div>
            <div className={styles.contents}>
                {/* <div className={styles.content} onClick={()=>{setChatNavi('ai')}}>
                    <div className={styles.img}>
                        <img src={ai} alt="" />
                    </div>
                    <div className={styles.detail}>
                        Tap집사랑 상담하기
                    </div>
                </div> */}
                <div className={styles.content} onClick={handleChat}>
                    <div className={styles.img}>
                        <img src={chat} alt="" />
                    </div>
                    <div className={styles.detail}>
                        관리자랑 1:1 상담하기
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;