import React, { createContext, useState,useRef } from 'react';
export const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
   //const [chats,setChats]= useState([]);
   const ws = useRef(null); // WebSocket 객체 상태 추가 
   const chatAppRef=useRef(null);
   const chatAdminRef=useRef(null);
   const [chatNavi,setChatNavi] =useState('');
   const [chatNaviBody,setChatNaviBody]=useState('chats');
   const [chatController,setChatController] =useState(false);
   const [chatList,setChatList]=useState();

   const dragRef =useRef(null);
    return (
        <ChatsContext.Provider value={{chatAdminRef, chatList,setChatList,ws,chatAppRef,chatNavi,setChatNavi,chatNaviBody,setChatNaviBody,chatController,setChatController,dragRef}}>
            {children}
        </ChatsContext.Provider>
    );
};