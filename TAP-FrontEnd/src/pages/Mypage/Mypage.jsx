import styles from './Mypage.module.css';
import Home from './Home/Home';
import Menus from './Menus/Menus';
import { Routes, Route,  useNavigate } from 'react-router-dom';
import Grade from './../Grade/Grade';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { api } from '../../config/config';
import { useAuthStore } from './../../store/store';

const Mypage =()=>{
    const navi =useNavigate();
    const {isAuth}=useAuthStore();

    useEffect(()=>{
        const token=sessionStorage.getItem('token');
        if(token!==null){
            api.post(`/auth`).then((resp)=>{
            }).catch((resp)=>{
                Swal.fire({
                    title:'마이페이지',
                    text:'인증되지 않은 사용자입니다'
                });
                navi('/');
            })
        }
        else if(token==null){
            Swal.fire({
                title:'마이페이지',
                text:'인증되지 않은 사용자입니다'
            });
            navi('/');
        }
    },[isAuth])
    return(
        <div className={styles.container}>
            <Routes>
                <Route path='' element={<Home/>}/>
                <Route path='menus/*' element={<Menus/>}/>
                <Route path='grade' element={<Grade/>}/>
            </Routes>
        </div>
    )
}
export default Mypage;