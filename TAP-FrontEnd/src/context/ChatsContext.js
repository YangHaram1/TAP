import React, { createContext, useState,useRef } from 'react';
export const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
   //const [chats,setChats]= useState([]);
   const ws = useRef(null); // WebSocket 객체 상태 추가 
   const chatAppRef=useRef(null);
   const [chatNavi,setChatNavi] =useState('');
   const [chatNaviBody,setChatNaviBody]=useState('chats');
   const [chatController,setChatController] =useState(false);
   const dragRef =useRef(null);
    return (
        <ChatsContext.Provider value={{ ws,chatAppRef,chatNavi,setChatNavi,chatNaviBody,setChatNaviBody,chatController,setChatController,dragRef}}>
            {children}
        </ChatsContext.Provider>
    );
};