import { api } from '../../../../config/config';
import styles from './List.module.css';
import { useState,useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const List=()=>{
    const [list, setList] = useState([]);
    const [count,setCount]=useState(5);
    const navi =useNavigate();
    useEffect(() => {
        api.get(`/inquiry`).then((resp) => {
            setList(resp.data);
        })
    }, [])

    const handleDetail=(item)=>{
        const seq=item?.seq;
        if (!item || !item.seq) {
            console.error('Invalid item or seq:', item);
            return;
          }
        navi(`detail/${seq}`);
    }
    const handleCount=()=>{
        setCount((prev)=>{
            return prev+5;
        })
    }   
    return(
        <div className={styles.list}>
        {
            list.map((item, index) => {
                if(index>=count){
                    return null;
                }
                const formattedDate = isNaN(new Date(item.write_date)) ? 'Invalid date' : format(new Date(item.write_date), 'yyyy-MM-dd');
                return (
                    <div className={styles.dto} key={index} onClick={()=>handleDetail(item)}>
                        <div className={styles.status}>
                            {item.status === 0 ? '답변대기' : '답변완료'}
                        </div>
                        <div className={styles.body}>
                            <div className={styles.title}>
                                {item.title}
                            </div>
                            <div className={styles.contents}>
                                <div className={styles.category}>
                                    {item.category}
                                </div>
                                <div className={styles.writeDate}>
                                    {formattedDate}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        <div className={styles.addList}>
          {(count<list.length)&&(  <button onClick={handleCount}> 더보기 </button>)}
        </div>
    </div>
    )
}
export default List;