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
        console.log("Setting date:", date); // 로그 추가
        set(() => ({date: date}));
    },
    setTime: (time) => {
        console.log("Setting time:", time); // 로그 추가
        set({ time: time });
    },
    setSeq: (seq) => {
        console.log("Setting seq:", seq); // 로그 추가
        set(() => ({seq: seq}));
    },
    setStorageSeats: (seats) =>{
        console.log("Setting seats:",seats);
        set(()=>({ storageSeats: seats }))
    },
    setStorageSection:(section)=>{
        console.log("Setting section:", section); // 로그 추가
        set({ storageSection: section });
    },
    setMainData:(mainData)=>{
        console.log("Setting mainData:", mainData); // 로그 추가
        set({ mainData: mainData });
    },
    setSeatPrices:(seatPrices)=>{
        console.log("Setting seatPrices:", seatPrices); // 로그 추가
        set({ seatPrices: seatPrices });
    },
    setDeliveryMethod: (deliveryMethod) => {
        console.log("Setting deliveryMethod:", deliveryMethod); // 로그 추가
        set(() => ({deliveryMethod: deliveryMethod}));
    },
    setAddress: (address) => {
        console.log("Setting address:", address); // 로그 추가
        set(() => ({address: address}));
    },
    setPayMethod: (payMethod) => {
        console.log("Setting payMethod:", payMethod); // 로그 추가
        set(() => ({payMethod: payMethod}));
    },
    setPoint: (point) => {
        console.log("Setting point:", point); // 로그 추가
        set(() => ({point: point}));
    },
    setTotalPrice: (totalPrice) => {
        console.log("Setting totalPrice:", totalPrice); // 로그 추가
        set(() => ({totalPrice: totalPrice}));
    },
    setCompany:(company) => {
        console.log("Setting company:", company); // 로그 추가
        set(() => ({company: company}));
    },
    // 상태 초기화 메서드 추가
    setRemoveData: () => {
        console.log("Resetting all order data to initial values"); // 로그 추가
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
        console.log("Setting user:", user); // 로그 추가
        set(() => ({user: user}));
    }
}))
