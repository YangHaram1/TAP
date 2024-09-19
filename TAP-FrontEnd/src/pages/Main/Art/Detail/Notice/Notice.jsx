import { useEffect, useState } from 'react';
import styles from './Notice.module.css'

export const Notice = ({description, casting})=> {

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
                    {
                        casting.map((cast, index)=>{
                            return(
                                <div key={index} className={styles.circle}>
                                    <img src={cast.file_sysname}></img>
                                    <div className={styles.circle_text}>
                                        <p>{cast.casting_role}</p>
                                        <p>{cast.casting_name}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>


                <button onClick={handleSize}>더보기</button>
            </div>

            {/* 공지사항 & 상세 내용*/}
            <div className={styles.notice}>
                <div dangerouslySetInnerHTML={{ __html: description.description_content}} />
            </div>

        </div>
    );
}