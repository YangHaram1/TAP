import { api } from "../../../../config/config";
import styles from './UserMem.module.css';
import { useState, useEffect } from "react";

export const UserMem = () => {
    const [UserMem, setUserMems] = useState([]);

    useEffect(() => {
        api.get(`/admin/usermem`).then((resp) => {
            console.log(resp.data);
            setUserMems(resp.data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    // 검색
    const [keyword, setKeyword] = useState('');
    const handleNameSearch = () => {
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
    };
        // 날짜 포맷팅 함수
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="회원 이름으로 검색"
                        name="userName"
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
                                <td> 이름</td>
                                <td> 등급</td>
                                <td> 가입날짜</td>
                                <td> 상태 </td>
                            </tr>
                        </thead>
                        <tbody>
                            {UserMem.map((mem, i) => (
                                <tr key={i}>
                                    <td>
                                        {mem.NAME}
                                    </td>
                                    <td>
                                        {mem.GRADE}
                                    </td>
                                    <td>
                                    {formatDate(mem.JOIN_DATE)}
                                        {/* 날짜 포맷 바꾸기  */}
                                    </td>
                                    <td>
                                        {mem.ENABLED === 1 ? '일반회원' : '블랙리스트'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
