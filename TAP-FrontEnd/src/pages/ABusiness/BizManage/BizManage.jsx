import { useEffect, useState } from 'react'
import styles from './BizManage.module.css'
import { api } from '../../../config/config';

export const BizManage=()=>{

    const [currentData, setCurrentData] = useState([]);
    const [futureData, setFutureData] =useState([]);
    const [pastData, setPastData] =useState([]);

    useEffect(()=>{
        // 장소, 카테고리, 세부카테고리, 장르, 팀 db에서 가져오기. 
        // api.get(`/biz/registration`).then((resp) => {
        //     console.log(resp.data);
        //   }).catch((resp) => {
        //     alert("이상 오류")
        //   })
    })

    const [events, setEvents] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);
    const [posters, setPosters] = useState([]);
    const [placeNames, setPlaceNames] = useState([]);
    const [filtered, setFiltered] = useState(events);

    useEffect(()=>{
        // 신청 완료 목록 - { 판매중, 판매예정, 판매종료 }
        api.get(`/biz/registration`).then((resp)=>{
            setEvents(resp.data); // 상품들 세팅하기
            setFiltered(resp.data); // 검색될때 사용할 filtered 상태
        });

        // 신청대기중, 


        // 조인으로 가져올거얌. 
        // // 카테고리 이름
        // api.get(`/biz/registration/categoryname`).then((resp)=>{
        //     setCategoryNames(resp.data);
        // })
        // // 포스터 이미지 
        // api.get(`biz/registration/poster`).then((resp)=>{
        //     setPosters(resp.data);
        // })
        // // 장소 이름 
        // api.get(`/biz/registration/place`).then((resp)=>{
        //     setPlaceNames(resp.data);
        // })
    },[])

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>상품 등록 내역</h2>
            </div>
            <div className={styles.menu}>
                <p>판매중, 판매에정, 판매완료</p>
            </div>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td>상품정보</td>
                            <td>일시</td>
                            <td>공연장</td>
                            <td>상품관리/수정</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            
                            <td> 이미지 사진 , 제목, 카테고리, 총시간(러닝타임 불러오기), 연령리밋</td>
                            <td> START-DATE ~ END_DATE 불러오고</td>
                            <td> place 불러오고 </td>
                            <td> <button>상품관리(매출액 모달창)</button> <button>수정(수정신청폼)</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    
    )
}