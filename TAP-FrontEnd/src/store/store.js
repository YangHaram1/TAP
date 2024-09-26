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
    chatController:false,
    setChatSeq:(seq)=>set({chatSeq:seq}),
    setOnmessage:() => set((state) => ({ onMessage: !state.onMessage  })),
    setWebSocketCheck:() => set((state) => ({ webSocketCheck: !state.webSocketCheck})),
    setChatController:()=>set((state) => ({ chatController: !state.chatController}))
}));

export const useNotification =create((set)=>({
    maxCount:3,
    count:0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: Math.max(state.count - 1, 0) })),

}));

/*지연*/
export const useOrder = create((set)=>({
    date:null,
    time:null,
    seq:null, // 공연번호
    storageSection:null,
    storageSeats:[],
    mainData:null,
    seatPrices:[],
    deliveryMethod:null,
    address:null,
    payMethod:"point",
    point:null,
    totalPrice:0,
    company:null,
    setDate: (date) => {
       
        set(() => ({date: date}));
    },
    setTime: (time) => {
     
        set({ time: time });
    },
    setSeq: (seq) => {
     
        set(() => ({seq: seq}));
    },
    setStorageSeats: (seats) =>{
     
        set(()=>({ storageSeats: seats }))
    },
    setStorageSection:(section)=>{
     
        set({ storageSection: section });
    },
    setMainData:(mainData)=>{

        set({ mainData: mainData });
    },
    setSeatPrices:(seatPrices)=>{
      
        set({ seatPrices: seatPrices });
    },
    setDeliveryMethod: (deliveryMethod) => {
      
        set(() => ({deliveryMethod: deliveryMethod}));
    },
    setAddress: (address) => {
     
        set(() => ({address: address}));
    },
    setPayMethod: (payMethod) => {
    
        set(() => ({payMethod: payMethod}));
    },
    setPoint: (point) => {
     
        set(() => ({point: point}));
    },
    setTotalPrice: (totalPrice) => {
     
        set(() => ({totalPrice: totalPrice}));
    },
    setCompany:(company) => {
  
        set(() => ({company: company}));
    },
    // 상태 초기화 메서드 추가
    setRemoveData: () => {

        set(() => ({
            storageSection: null,
            storageSeats: [],
            deliveryMethod: null,
            address: null,
            payMethod: "point",
            point: null,
            totalPrice: 0,
        }));
    }

}))

export const useUserData = create((set)=>({
    user:{},
    setUser:(user) => {
    
        set(() => ({user: user}));
    }
}))

export const useWriteData = create((set)=>({
    reviewData:[],
    exciteData:[],
    setReviewData:(reviewData) => {
      
        set(() => ({reviewData: reviewData}));
    },
    setExciteData:(exciteData) => {
   
        set(() => ({exciteData: exciteData}));
    }
}))