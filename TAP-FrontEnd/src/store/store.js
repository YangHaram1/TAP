import { create } from 'zustand';

//공용 
export const useAuthStore = create((set) => {
    return (
        {
            token: '',
            isAuth: false,
            login:(token)=> set({token:token,isAuth:true}),
            logout:()=> set({token:null,isAuth:false})
        }
    )
});
