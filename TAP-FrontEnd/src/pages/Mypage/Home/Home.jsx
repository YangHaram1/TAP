import Category from './Category/Category';
import styles from './Home.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
const Home = () => {
    const navi = useNavigate();
    const handleGrade = () => {
        navi('grade')
    }
    const handleMenu=(menu)=>{
        navi(`menus/${menu}`)
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    양하람님은 현재<p> WELCOME </p> 등급입니다.
                </div>
                <div className={styles.grade} onClick={handleGrade}>
                    등급별 혜택 보기
                </div>
            </div>
            <div className={styles.menus}>
                <div className={styles.line}>
                    <div className={styles.menu} onClick={()=>{handleMenu('')}}>
                        <Category img={'img'} title={'회원정보 수정'} contents={'본인인증 ,휴대폰번호 등 내정보를 수정하세요.'} />
                    </div>
                    <div className={styles.menu} onClick={()=>{handleMenu('')}}>
                        <Category img={'img'} title={'비밀번호 변경'} contents={'주기적인 변경으로 내정보를 보호하세요.'} />
                    </div>
                    <div className={styles.menu} onClick={()=>{handleMenu('')}}>
                        <Category img={'img'} title={'배송지 관리'} contents={'기본주소 및 배송지를 관리하세요.'} />
                    </div>
                </div>
                <div className={styles.line}>
                    <div className={styles.menu} onClick={()=>{handleMenu('')}}>
                        <Category img={'img'} title={'쿠폰 및 예매 관리'} contents={'쿠폰 및 예매/취소 관리하세요.'} />                       
                    </div>
                    <div className={styles.menu} onClick={()=>{handleMenu('')}}>
                        <Category img={'img'} title={'게시물 관리'} contents={'내 게시물을 관리하세요.'} />
                    </div>
                    <div className={styles.menu} onClick={()=>{handleMenu('')}}>
                        <Category img={'img'} title={'회원탈퇴'} contents={'회원탈퇴를 하시겠습니까?.'} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;