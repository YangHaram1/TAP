import { useEffect, useState } from 'react';
import styles from './PreventMacro.module.css';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'; // regular 아이콘
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PreventMacro = ({onClose})=>{

    const [randomWord, setRandomWord] = useState("");
    const [checkWord, setCheckWord] = useState("");

    useEffect(()=>{
        const randomAlphabets = getRandomAlphabets();
        setRandomWord(randomAlphabets);
   
    },[])

    const handleText = (e)=>{
        setCheckWord(e.target.value);
    }

    const handleClick = ()=>{
        


        if(randomWord === checkWord){
            onClose();
        }else{
            alert("다시 입력해주세요");
            const randomAlphabets = getRandomAlphabets();
            setRandomWord(randomAlphabets);
            setCheckWord("");
        }
    }

    return(
        <div className={styles.overlay}>
            <div className={`${styles.modal} ${styles.preventMacro}`}>
                <div className={styles.ui_circle}>
                    <div className={styles.circle}>
                       <FontAwesomeIcon icon={faCircleCheck}/> &nbsp;안심예매
                    </div>
                </div>
                <h2>문자를 입력해주세요</h2>
                <p style={{margin:"5px"}}>부정예매방지를 위해 아래의 문자를 입력해주세요.</p>
                <p style={{margin:"5px"}}>인증 후 좌석을 선택할 수 있습니다.</p>
                <div className={styles.checkword}>{randomWord}</div>
                <input className={styles.inputword} type='text' placeholder='문자를 입력해주세요' onChange={handleText} value={checkWord||''}></input>
                <button onClick={handleClick}>입력완료</button>
            </div>
        </div>
    );
}

function getRandomAlphabets(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}