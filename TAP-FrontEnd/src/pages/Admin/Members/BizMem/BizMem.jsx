import { useEffect, useRef, useState } from 'react';
import styles from './BizMem.module.css';
import { api } from '../../../../config/config';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { Modal } from '../../../../components/Modal/Modal';
import { ModalBiz } from './ModalBiz/ModalBIz';

export const BizMem = () => {
    const [bizMems, setBizMems] = useState([]);
    const [filtered, setFiltered] = useState([]);
    
    // 검색 키워드 및 필터 상태
    const [keyword, setKeyword] = useState('');
    const [shippingStatus, setShippingStatus] = useState('');   // 가입 상태 필터

    // 체크박스 처리 관련 상태
    const [checkedOrders, setCheckedOrders] = useState([]);
    const checkboxRef = useRef([]);
    const allCheckRef = useRef(null);

    // 모달 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {
        if (checkedOrders.length === 0) {
            alert('기업 회원을 선택해주세요.');
            return;
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    // 기업 회원 데이터 가져오기
    const fetchOrders = async () => {
        try {
            const resp = await api.get(`/admin/bizmem`);
            setBizMems(resp.data);
            setFiltered(resp.data);
        } catch (error) {
            alert("데이터를 가져오는 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        fetchOrders();  // 컴포넌트 마운트 시 데이터 가져오기
    }, []);

    // 검색 요청 함수 (shippingStatus도 포함)
    const handleNameSearch = async () => {
        try {
            const params = {
                keyword: keyword,
                shippingStatus: shippingStatus || null  // 가입 상태 필터를 함께 전송
            };
            const resp = await api.get(`/admin/bizmem/search`, { params });
            setFiltered(resp.data);
        } catch (error) {
            console.error('검색 중 오류:', error);
        }
    };

    // 체크박스 처리 
    const handleCheckAll = (e) => {
        const checked = e.target.checked;
        const enabledValues = filtered
            .slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE)
            .filter(order => order.G_NAME === 'pending')
            .map(order => order.ID);

        checkboxRef.current.forEach((checkbox, i) => {
            const order = filtered[i + currentPage * PER_PAGE];
            if (checkbox && order.G_NAME === 'pending') {
                checkbox.checked = checked;
            } else if (checkbox && order.G_NAME !== 'pending') {
                checkbox.checked = false;
            }
        });

        setCheckedOrders(checked ? enabledValues : []);
    };

    const handleCheckBox = (e) => {
        const { value, checked } = e.target;
        setCheckedOrders(prev => checked ? [...prev, value] : prev.filter(id => id !== value));
        if (!checked) {
            allCheckRef.current.checked = false;
        }
    };

    const resetCheckboxes = () => {
        setCheckedOrders([]);
        allCheckRef.current.checked = false;
        checkboxRef.current.forEach(checkbox => {
            if (checkbox) checkbox.checked = false;
        });
    };

    // 페이지네이션 설정
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 10;
    const pageCount = Math.ceil(filtered.length / PER_PAGE);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        setCheckedOrders([]);  // 페이지 변경 시 체크박스 초기화
        if (allCheckRef.current) allCheckRef.current.checked = false;
        checkboxRef.current.forEach(checkbox => {
            if (checkbox) checkbox.checked = false;
        });
        window.scrollTo(0, 0);
    };

    // 가입 상태 필터 변경 핸들러
    const handleShippingStatusChange = (e) => {
        setShippingStatus(e.target.value);
        handleNameSearch(); // 검색 함수와 함께 필터링 적용
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
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="사업명 검색"
                        value={keyword} 
                        onChange={(e) => setKeyword(e.target.value)} // 상태 업데이트
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleNameSearch();
                            }
                        }}
                        className={styles.searchInput}
                    />
                    <button className={styles.buttonsearch} onClick={handleNameSearch}>
                        돋보기
                    </button>
                </div>

                <div className={styles.searchWrapper}>
                    <button
                        className={styles.btnDeliver}
                        onClick={() => openModal()}
                    >
                        가입 승인 처리
                    </button>
                </div>
            </div>


            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td><input type="checkbox" name='checkedAll' onClick={handleCheckAll} ref={allCheckRef} /></td>
                            <td>사업명</td>
                            <td>사업자</td>
                            <td>사업자 등록번호</td>
                            <td>가입날짜</td>
                            <td>판매상품 갯수</td>
                            <td>
                                <select value={shippingStatus} onChange={handleShippingStatusChange} className={styles.select}>
                                    <option value="">가입 상태</option>
                                    <option value="0">승인 대기</option>
                                    <option value="1">승인 완료</option>
                                </select>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE).map((mem, i) => (
                            <tr key={i}>
                                <td>
                                    <input
                                        type="checkbox"
                                        value={mem.ID}
                                        onClick={handleCheckBox}
                                        ref={el => (checkboxRef.current[i] = el)}
                                        disabled={mem.G_NAME !== 'pending'}
                                    />
                                </td>
                                <td>{mem.C_NAME}</td>
                                <td>{mem.NAME}</td>
                                <td>{mem.REGISTRATION_NUMBER}</td>
                                <td>{formatDate(mem.JOIN_DATE)}</td>
                                <td>{mem.APPLY_COUNT}</td>
                                <td>{mem.G_NAME === 'pending' ? "승인 대기" : "승인 완료"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.pagination}>
                {pageCount > 0 && (
                    <Pagination
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                    />
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className={styles.modalForm}>
                    <ModalBiz
                        resetCheckboxes={resetCheckboxes}
                        checkedOrders={checkedOrders}
                        onClose={closeModal}
                        fetchOrders={fetchOrders}
                    />
                </div>
            </Modal>
        </div>
    );
};
