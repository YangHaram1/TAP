// import { useEffect, useState } from "react"
import { useEffect, useState } from 'react'
import styles from './BizMem.module.css'
import { api } from '../../../../config/config'
// import { api } from '../../../../config/config'
export const BizMem=()=>{

    const [bizMems, setBizMems] = useState([]);

    useEffect(()=>{
        api.get(`/admin/bizmem`).then((resp) => {
            console.log(resp.data);
            setBizMems(resp.data);
          }).catch((resp) => {
            alert("이상 오류")
          })
    },[])
    
    // 검색
    const [keyword, setKeyword]=useState('');
    const handleNameSearch =() =>{
        if (keyword === "") {
            // 검색어가 빈 문자열일 때 필터링된 데이터를 원본 데이터로 리셋
            // setFiltered(members);
            // setDeptCode("100");
            // setRoleCode("100");
            // setWorkerStateCode("100");
            // setEmpStateCode("100");
            // empNameRef.current.value = '';
        } else {
            // 검색어가 있는 경우 필터링
            // let result = members.filter((data) => data.EMP_NAME.includes(keyword));
            // setFiltered(result);
            // setDeptCode("100");
            // setRoleCode("100");
            // setWorkerStateCode("100");
            // setEmpStateCode("100");
            // setKeyword("");
            }
        
    }
            // 날짜 포맷팅 함수
            const formatDate = (dateString) => {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

    return(
        <div className={styles.container}>
            <div className={styles.searchWrapper}>
                <input
                    type="text"
                    placeholder=" 사업자 이름 검색"
                    name="bizName"
                    // ref={empNameRef}
                    value={keyword} 
                    onChange={(e) => setKeyword(e.target.value)} // 상태 업데이트
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleNameSearch();
                        }
                    }}
                    className={styles.searchInput}
                />
                <button onClick={handleNameSearch}>
                    돋보기
                    {/* <FaSearch className={styles.searchLogo} /> */}
                </button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td> 사업자명</td>
                            <td> 사업카테고리</td>
                            <td> 가입날짜</td>
                            <td> 판매상품 갯수 </td>
                        </tr>
                    </thead>
                    <tbody>
                        {bizMems.map((mem, i)=> (
                            <tr key={i}>
                                <td>
                                    {mem.NAME}
                                </td>
                                <td>
                                    {mem.NAME}
                                </td>
                                <td>
                                {formatDate(mem.JOIN_DATE)}
                                    {/* 날짜 포맷 바꾸기  */}
                                </td>
                                <td>
                                    {mem.NAME}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td> 기업 </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
