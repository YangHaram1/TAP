
import './App.css';
import styles from './App.module.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { host } from './config/config';
import { useAuthStore } from './store/store';
import { ChatsProvider } from './context/ChatsContext';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Mypage from './pages/Mypage/Mypage';

import { useEffect } from 'react';
import { api } from './config/config';
import { jwtDecode } from 'jwt-decode'
import { AdminHeader } from './components/Header/AdminHeader';
import { Biz } from './pages/ABusiness/Biz';
import { Admin } from './pages/Admin/Admin';


function App() {
  const { login,isAuth ,setAuth, role} = useAuthStore();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token != null) {
      api.post(`/auth`).then((resp) => {
        const decoded =jwtDecode(token);
        login(token);
        setAuth(decoded);
      }).catch((resp) => {
        alert('인증되지 않은 사용자 입니다')
      })
      
    }
  }, [])
  return (
    <ChatsProvider>
      <Router>
        <div className={styles.container}>
          {!isAuth ? (
            <>
              <Header />
              <Routes>
                <Route path='/*' element={<Main />} />
                <Route path='/login/*' element={<Login />} />
              </Routes>
            </>
          ) : isAuth && role === 'ROLE_ADMIN' ? (
            <>
              <AdminHeader/>
              <Routes>
                <Route path='/admin/*' element={<Admin/>} />
              </Routes>
            </>
          ) : isAuth && role === 'ROLE_BIZ' ? (
            <>
              <AdminHeader/>
              <Routes>
                <Route path='/biz/*' element={<Biz/>} />
              </Routes>
            </>
          ) : (
            isAuth &&
            role === 'ROLE_USER' && (
              <>
                <Header />
                <Routes>
                  <Route path='/*' element={<Main />} />
                  <Route path='/mypage/*' element={<Mypage />} />
                </Routes>
              </>
            )
          )}
          {/* <Header />
          <Routes>  
           {!isAuth&&(<Route path='/login/*' element={<Login />} />)}
            <Route path='/*'element={<Main/>}/>
            <Route path='/mypage/*'element={<Mypage/>}/>
            <Route path='/buiz/*'element={<ABuiz/>}/>
          </Routes> */}
          <Footer />
        </div>
      </Router>
    </ChatsProvider>
  );
}

export default App;
