
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

function App() {
  return (
    <ChatsProvider>
      <Router>
        <div className={styles.container}>
          <Header/>
          <Routes>
            <Route path='/login/*' element={<Login />} />
            <Route path='/*'element={<Main/>}/>
            <Route path='/mypage/*'element={<Mypage/>}/>
          </Routes>
          <Footer/>
        </div>
      </Router>
    </ChatsProvider>
  );
}

export default App;
