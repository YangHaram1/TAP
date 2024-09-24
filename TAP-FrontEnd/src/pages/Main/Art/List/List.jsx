import { useEffect, useState } from 'react';
import styles from './List.module.css'
import { api } from '../../../../config/config';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const List = ({genre, category})=>{

    const [lists,setLists] = useState([]);
    const navi = useNavigate();

    useEffect(()=>{
        // console.log("변경테스트", genre, category);
        setLists([]);
        if(genre ===""){
            genre = 0;
        }

        if(category === "musical"){
            category = 1;
        }else if(category === "concert"){
            category = 2;
        }else{
            // console.log("잘못된 접근 확인 필요");
        }

        api.get(`/artlist/getTap?genre=${genre}&category=${category}`)
        .then((resp)=>{
            // console.log("장르별 콘텐츠",genre,resp.data);
            setLists(resp.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[genre, category])

    const handleMove = (seq)=>{
        // console.log("상품번호", seq);
        navi("/detail", { state: { seq } });
      }

    return (
        <div className={styles.container}>
            {/* <div className={styles.search}> 랭킹순 /지역 검색 </div> */}
            <div className={styles.contents}>
                {lists.length > 0 ? 
            
                    lists.map((list)=>{
                        return(
                            <div key={list.application_seq} onClick={()=>{handleMove(`${list.application_seq}`)}} className={styles.card}>
                                <div className={styles.overlay}></div> {/* 오버레이 추가 */}
                                <div className={styles.poster}>
                                    <img src={list.files_sysname}></img>
                                </div>
                                <p style={{fontSize:"18px", fontWeight:"600"}}>{list.name}</p>
                                <p style={{marginBottom:"0"}}>{list.place_name}</p>
                                <p style={{marginTop:"0"}}>
                                    {format(new Date(list.start_date), 'yyyy.MM.dd')} - 
                                    {format(new Date(list.end_date), 'yyyy.MM.dd')}
                                </p>
                            </div>
                        );
                    })
                    :
                    <div className={styles.empty_content}>
                        선택하신 필터 조건에 일치하는 상품이 없습니다.
                    </div>
                }
                
            </div>
        </div>
    );

}