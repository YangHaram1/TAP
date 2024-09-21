import React, { useState, useEffect } from 'react';
import styles from './UserMem.module.css';
import { api } from "../../../../config/config";
import Grade from "./Grade/Grade";
import { Pagination } from '../../../../components/Pagination/Pagination';

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
            const resp = await api.get(`/admin/mem/selectAll`);
            setUserMems(resp.data);
            setFilteredUserMems(resp.data);
            console.log(resp.data)
        } catch (error) {
            console.error(error);
        }
    };

    const fetchGrades = async () => {
        try {
            const resp = await api.get(`/admin/mem/grades`);
            setGrades(resp.data);
            console.log(resp.data)
        } catch (error) {
            console.error(error);
        }
    };

    const handleNameSearch = async () => {
        try {
            const params = {
                keyword : keyword,
                gradeSeq: selectedGrade || null // null로 변경하여 gradeSeq가 없을 때를 처리
            };
            const resp = await api.get(`/admin/mem/search`, { params });
            setFilteredUserMems(resp.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGradeChange = (e) => {
        const newGrade = e.target.value;
        console.log(newGrade)
        setSelectedGrade(newGrade);
        filterUserMemsByGrade(newGrade); // 선택된 등급으로 필터링
    };

    const filterUserMemsByGrade = (grade) => {
        const gradeName = grades.find(g => g.seq === parseInt(grade))?.name;
        console.log(gradeName)
        const filtered = userMems.filter(mem =>
            gradeName ? mem.G_NAME === gradeName : true
        );
        setFilteredUserMems(filtered);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

     // 페이지네이션 설정
     const [currentPage, setCurrentPage] = useState(0);
     const PER_PAGE = 10;
     const pageCount = Math.ceil(filteredUserMems.length / PER_PAGE);
     const handlePageChange = ({selected}) => {
         setCurrentPage(selected);
         window.scrollTo(0,0); // 페이지 변경 시 스크롤 맨 위로 이동
     };


    // select 필터 위한 상태
    const [orderStatus, setOrderStatus] = useState('');
    const [shippingStatus, setShippingStatus] = useState('');

     // select 필터링 함수 
    const applyFilters = () => {
        let filteredOrders = userMems;

        // 주문 상태 필터 적용
        if (orderStatus) {
            if (orderStatus === "-1") {
                // 블랙리스트만 필터링
                filteredOrders = filteredOrders.filter(order => order.GRADE_SEQ === -1);
            } else {
                // 일반 회원 (GRADE_SEQ 값이 -1이 아닌 경우)
                filteredOrders = filteredOrders.filter(order => order.GRADE_SEQ >= 0 && order.GRADE_SEQ <= 4);
            }
        }

        // 배송 상태 필터 적용
        if (shippingStatus) {
            filteredOrders = filteredOrders.filter(order => order.DELIVERY_STATUS === shippingStatus);
        }

        setFilteredUserMems(filteredOrders);
        setCurrentPage(0); // 페이지를 처음으로 이동
    };
    useEffect(() => {
        applyFilters();  // 상태 변경 시 필터링 적용
    }, [orderStatus, shippingStatus, userMems]);

    // 주문 상태 선택 핸들러
    const handleOrderStatusChange = (e) => {
        setOrderStatus(e.target.value);
        applyFilters(); // 필터링 적용
    };

    // 배송 상태 선택 핸들러
    const handleShippingStatusChange = (e) => {
        setShippingStatus(e.target.value);
        applyFilters(); // 필터링 적용
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
                    <button className={styles.buttonsearch}  onClick={handleNameSearch}>
                        돋보기
                    </button>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <td>이름</td>
                                <td>구분</td>
                                {/* <td>등급</td> */}
                                <td> <Grade 
                    grades={grades}
                    selectedGrade={selectedGrade}
                    onGradeChange={handleGradeChange}
                /> </td>
                                <td>가입날짜</td>
                                <td>
                                    <select value={orderStatus} onChange={handleOrderStatusChange} className={styles.select}> 
                                        <option value=""> 상태</option>
                                        <option value="1">일반 회원</option>
                                        <option value="-1">블랙리스트</option>
                                    </select>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUserMems.length > 0 ? (
                                filteredUserMems.slice(currentPage * PER_PAGE, (currentPage +1) * PER_PAGE).map((mem, i) => (
                                    <tr key={i}>
                                        <td>{mem.NAME}</td>
                                        <td>{mem.C_NAME ? "기업": "일반"}</td>
                                        <td>{mem.G_NAME}</td>
                                        <td>{formatDate(mem.JOIN_DATE)}</td>
                                        <td>{mem.GRADE_SEQ === -1 ? '블랙리스트' : '일반 회원'}</td>
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
            <div className={styles.pagination}>
            {/* 페이지네이션 */}
            {pageCount > 0 && (
                <Pagination
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                />
                )}
            </div>
        </div>
    );
};
