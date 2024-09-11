import React, { useState, useEffect } from 'react';
import styles from './UserMem.module.css';
import { api } from "../../../../config/config";
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

    const fetchUserMems = async () => {
        try {
            const resp = await api.get(`/admin/usermem/selectAll`);
            setUserMems(resp.data);
            setFilteredUserMems(resp.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchGrades = async () => {
        try {
            const resp = await api.get(`/admin/usermem/grades`);
            console.log('Fetched Grades:', resp.data); // 데이터 확인
            setGrades(resp.data);
        } catch (error) {
            console.error(error);
        }
    };

    const filterUserMemsByGrade = (grade) => {
        const gradeName = grades.find(g => g.seq === parseInt(grade))?.name;
        const filtered = userMems.filter(mem =>
            gradeName ? mem.GRADE === gradeName : true
        );
        setFilteredUserMems(filtered);
    };

    const handleNameSearch = async () => {
        try {
            const resp = await api.get(`/admin/usermem/search`, {
                params: {
                    keyword,
                    gradeSeq: selectedGrade || undefined
                }
            });
            setFilteredUserMems(resp.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGradeChange = (e) => {
        const newGrade = e.target.value;
        setSelectedGrade(newGrade);
        filterUserMemsByGrade(newGrade); // 선택된 등급으로 필터링
    };

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
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
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
                            {filteredUserMems.length > 0 ? (
                                filteredUserMems.map((mem, i) => (
                                    <tr key={i}>
                                        <td>{mem.NAME}</td>
                                        <td>{mem.GRADE}</td>
                                        <td>{formatDate(mem.JOIN_DATE)}</td>
                                        <td>{mem.ENABLED === 1 ? '일반회원' : '블랙리스트'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">결과가 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
