import { create } from 'zustand';

//공용 
export const useAuthStore = create((set) => ({
    loginID:null,
    role:null,
    name:null,
    grade:null,
    token: null, // 초기값을 null로 설정
    isAuth: false, // 인증 상태 초기값은 false
    login: (token) => set({ token: token, isAuth: true }), // 로그인 시 token과 isAuth 상태를 업데이트
    logout: () => set({ token: null, isAuth: false }), // 로그아웃 시 token을 null로 설정하고, isAuth를 false로 변경
    setAuth:(decoded)=>set({loginID:decoded.sub,role:decoded.role,name:decoded.name,grade:decoded.grade})

}));

/*하람*/
export const useCheckList = create((set) => ({
    webSocketCheck:false,
    chatSeq:0,
    onMessage:false,
    emoticonDisplay: false,
    searchDisplay: true,
    chatController:false,
    setEmoticonDisplay: ()=>set((state) => ({ emoticonDisplay: !state.emoticonDisplay })),
    setSearchDisplay: (search) => set({ searchDisplay: search }),
    setChatSeq:(seq)=>set({chatSeq:seq}),
    setOnmessage:() => set((state) => ({ onMessage: !state.onMessage  })),
    setWebSocketCheck:() => set((state) => ({ webSocketCheck: !state.webSocketCheck})),
    setChatController:()=>set((state) => ({ chatController: !state.chatController}))
}));