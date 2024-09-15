import React, { useContext, useEffect } from 'react';
import styles from './ChatApp.module.css';
import { ChatsContext } from '../../../../context/ChatsContext';

const ChatApp = () => {
    const { setChatNavi, chatList } = useContext(ChatsContext);


    useEffect(() => {
        setChatNavi('admin')
        console.log(`admin`)
    }, [])

    return (
        <div className={styles.container} >
            {
                chatList
            }
        </div>
    )
}
export default ChatApp;