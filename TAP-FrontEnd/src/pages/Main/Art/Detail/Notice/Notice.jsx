import { useState } from 'react';
import styles from './Notice.module.css'
import { url } from '../../../../../config/config';

export const Notice = ()=> {

    const [boxSize, setBoxSize] = useState(true);

    const handleSize = ()=>{
        console.log(boxSize);
        setBoxSize(!boxSize);
    }

    return (
        <div className={styles.container}>

            {/* 캐스팅 */}
            <div className={styles.casting}>
                <h2> 캐스팅 </h2>
                <div className={ `${styles.casting_circle} ${boxSize || styles.active}`}>
                    <div className={styles.circle}>
                        <img src='https://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040004/08/11/0400040811_11862_02831.gif'></img>
                        <div className={styles.circle_text}>
                            <p>역할명</p>
                            <p>최재림</p>
                        </div>
                    </div>
                    <div className={styles.circle}>
                        <img src='https://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040004/09/11/0400040911_18920_023.116.gif'></img>
                        <div className={styles.circle_text}>
                            <p>역할명</p>
                            <p>최재림</p>
                        </div>
                    </div>
                    <div className={styles.circle}>
                        <img src='https://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040004/08/11/0400040811_11862_02831.gif'></img>
                        <div className={styles.circle_text}>
                            <p>역할명</p>
                            <p>최재림</p>
                        </div>
                    </div>
                    <div className={styles.circle}>
                        <img src='https://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040004/09/11/0400040911_18920_023.116.gif'></img>
                        <div className={styles.circle_text}>
                            <p>역할명</p>
                            <p>최재림</p>
                        </div>
                    </div>
                    <div className={styles.circle}>
                        <img src='https://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040004/08/11/0400040811_11862_02831.gif'></img>
                        <div className={styles.circle_text}>
                            <p>역할명</p>
                            <p>최재림</p>
                        </div>
                    </div>
                    <div className={styles.circle}>
                        <img src='https://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040004/09/11/0400040911_18920_023.116.gif'></img>
                        <div className={styles.circle_text}>
                            <p>역할명</p>
                            <p>최재림</p>
                        </div>
                    </div>
                    <div className={styles.circle}>
                        <img src='https://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040004/08/11/0400040811_11862_02831.gif'></img>
                        <div className={styles.circle_text}>
                            <p>역할명</p>
                            <p>최재림</p>
                        </div>
                    </div>
                    <div className={styles.circle}>
                        <img src='https://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040004/09/11/0400040911_18920_023.116.gif'></img>
                        <div className={styles.circle_text}>
                            <p>역할명</p>
                            <p>최재림</p>
                        </div>
                    </div>
                </div>


                <button onClick={handleSize}>더보기</button>
            </div>

            {/* 공지사항 */}
            {/* 추후 에디터로 교체할 예정  */}
            <div className={styles.notice}>
                <h2> 공지사항 </h2>
                <img src={`${url}/musical/a52ee2d8-7191-435a-acb6-8d9e23e28c0d`}></img>

                {/* <h2> 상세내용 </h2>
                <img src={`${url}/musical/a52ee2d8-7191-435a-acb6-8d9e23e28c0d`}></img> */}
            </div>

        </div>
    );
}