import { api } from "../../../../config/config";
import styles from './UserMem.module.css';
import { useState, useEffect } from "react";
import Grade from "./Grade/Grade";

export const UserMem = () => {
    const [userMems, setUserMems] = useState([]);
    const [filteredUserMems, setFilteredUserMems] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [grades, setGrades] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState('');

    useEffect(() => {
        fetchUserMems();
        fetchGrades();
    }, []);

    // 전체 데이터 로딩 함수
    const fetchUserMems = async () => {
        try {
            const resp = await api.get(`/admin/usermem/selectAll`);
            console.log(resp.data);
            setUserMems(resp.data);
            setFilteredUserMems(resp.data); 
        } catch (error) {
            console.error(error);
        }
    };

    // 등급 데이터 로딩 함수
    const fetchGrades = async () => {
        try {
            const resp = await api.get(`/admin/usermem/grades`); // 등급 정보 가져오기
            console.log('Received grades:', resp.data); // 데이터 확인
            setGrades(resp.data);
        } catch (error) {
            console.error(error);
        }
    };

    // 검색 처리 함수
    const handleNameSearch = async () => {
        try {
            const resp = await api.get(`/admin/usermem/search`, {
                params: { 
                    keyword, 
                    grade: selectedGrade 
                }
            });
            console.log(resp.data);
            setFilteredUserMems(resp.data); 
        } catch (error) {
            console.error(error);
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

    // 등급 변경 처리 함수
    const handleGradeChange = (e) => {
        setSelectedGrade(e.target.value);
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="회원 이름으로 검색"
                        name="userName"
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
                    </button>
                </div>

                <Grade 
                    grades={grades}
                    selectedGrade={selectedGrade}
                    onGradeChange={handleGradeChange}
                />

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <td>이름</td>
                                <td>등급</td>
                                <td>가입날짜</td>
                                <td>상태</td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUserMems.map((mem, i) => (
                                <tr key={i}>
                                    <td>{mem.NAME}</td>
                                    <td>{mem.GRADE}</td>
                                    <td>{formatDate(mem.JOIN_DATE)}</td>
                                    <td>{mem.ENABLED === 1 ? '일반회원' : '블랙리스트'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
