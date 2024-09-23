import React, { useEffect, useState } from 'react';
import styles from './Menus.module.css'
import Password from './Password/Password';
import Img from '../Home/Category/Img/Img';
import Menu from './Menu/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './../../../store/store';

const Menus = () => {
    const [checkPw, setCheckPw] = useState(true);
    const defaultColor = { member: false, password: false, delivery: false, coupon: false, board: false, withdrawal: false };
    const [color, setColor] = useState(defaultColor);
    const navi = useNavigate();
    const location = useLocation();
    const { role } = useAuthStore();
    useEffect(() => {
        const split = location.pathname.split('/');
        let name;
        if (split[3] === '') {
            name = 'member'
        }
        else {
            name = split[3];
        }
        setColor((prev) => {
            return { defaultColor, [name]: true }
        })
    }, [])
    const handleNavi = (path) => {
        setCheckPw(true)
        navi(path);
        let value;
        if (path === '') {
            value = 'member'
        }
        else {
            value = path;
        }
        setColor((prev) => {
            return { defaultColor, [value]: true }
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.menus}>
                <div className={color.member ? styles.color : styles.menu} onClick={() => handleNavi('')}>
                    <div>
                        <Img img={'member'} />
                    </div>
                    <div>
                        회원정보 수정
                    </div>
                </div>
                <div className={color.password ? styles.color : styles.menu} onClick={() => handleNavi('password')}>
                    <div>
                        <Img img={'password'} />
                    </div>
                    <div>
                        비밀번호 변경
                    </div>
                </div>
                {role === 'ROLE_USER' && (
                    <React.Fragment>
                        <div className={color.delivery ? styles.color : styles.menu} onClick={() => handleNavi('delivery')}>
                            <div>
                                <Img img={'delivery'} />
                            </div>
                            <div>
                                배송지 관리
                            </div>
                        </div>
                        <div className={color.coupon ? styles.color : styles.menu} onClick={() => handleNavi('coupon')}>
                            <div>
                                <Img img={'coupon'} />
                            </div>
                            <div>
                                쿠폰 관리
                            </div>
                        </div>
                        <div className={color.board ? styles.color : styles.menu} onClick={() => handleNavi('board')}>
                            <div>
                                <Img img={'board'} />
                            </div>
                            <div>
                                게시물 관리
                            </div>
                        </div>
                    </React.Fragment>
                )}
                <div className={color.withdrawal ? styles.color : styles.menu} onClick={() => handleNavi('withdrawal')}>
                    <div>
                        <Img img={'withdrawal'} />
                    </div>
                    <div>
                        회원탈퇴
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                {checkPw && (<Password setCheckPw={setCheckPw} />)}
                {!checkPw && (<Menu />)}
            </div>
        </div>
    )
}
export default Menus;