import React from 'react';
import styles from './Support.module.css';
import { ChatsContext } from '../../context/ChatsContext';
import { useContext } from 'react';
import { useAuthStore } from './../../store/store';
const Support = () => {
    const list = [{ title: '1:1 문의하기', text: '자세한 상담이 가능해요', img: 'null' },
    { title: '내 문의내역 보기', text: '문의한 내용을 확인해보세요', img: 'null' },
    { title: 'TAP집사 상담하기', text: 'TAP집사가 상담을 도와드릴게요', img: 'null' }
    ];
    const {isAuth}=useAuthStore();
    const {dragRef}=useContext(ChatsContext);
    const handleChat=()=>{
        if(isAuth)
        dragRef.current.style.visibility = 'visible';
    }
    return (

        <div className={styles.container}>
            <div className={styles.mainTitle}>
                고객님, 무엇을 도와드릴까요?
            </div>
            <div className={styles.contents}>
                {
                    list.map((item, index) => {
                        return (
                            <div className={styles.content} key={index} onClick={index===2?(handleChat):undefined}>
                                <div className={styles.div1}>
                                    <img src={item.img} alt="" className={styles.img} />
                                </div>
                                <div className={styles.div2}>
                                    <div className={styles.title}>
                                        {item.title}
                                    </div>
                                    <div className={styles.text}>
                                        {item.text}
                                    </div>
                                </div>
                                <div className={styles.div3}>
                                        {'>'}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.mainTitle}>
                고객센터 안내
            </div>
            <div className={styles.footer}>
                <div className={styles.footer1}>
                    <div>
                        <img src='' alt=''></img>
                    </div>
                    <div>
                        티켓 1544-1555
                    </div>
                    <div>
                        {'>'}
                    </div>
                </div>
                <div className={styles.footer2}>
                    <p>- 평일 09:00 ~ 18:00 (연중무휴)</p>
                    <p>- 입점 판매 문의는 점심시간 (12:00 ~ 13:00) 및 주말/ 공휴일 상담 제외</p>
                </div>
            </div>
        </div>
    )
}

export default Support;