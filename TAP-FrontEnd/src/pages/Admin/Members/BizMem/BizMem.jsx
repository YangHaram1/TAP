// import { useEffect, useState } from "react"
import { useEffect, useRef, useState } from 'react'
import styles from './BizMem.module.css'
import { api } from '../../../../config/config'
import { Pagination } from '../../../../components/Pagination/Pagination';
import { Modal } from '../../../../components/Modal/Modal';
import { ModalOrder } from '../../Orders/ModalOrder/ModalOrder';
// import { api } from '../../../../config/config'
export const BizMem=()=>{

    const [bizMems, setBizMems] = useState([]);
    const [ filtered, setFiltered] = useState([])
   // checked Orders 처리 
   const [checkedOrders, setCheckedOrders] = useState([]);
   const checkboxRef = useRef([]);
   const allCheckRef = useRef(null);
   
   // 모달 상태 관리
   const [isModalOpen, setIsModalOpen] = useState(false);

   const openModal = () => {
       if (checkedOrders.length === 0) {
           alert('주문을 선택해주세요.');
           return;
       }
       setIsModalOpen(true);
   };
   const closeModal = () => setIsModalOpen(false);

    const fetchOrders = () => {
        api.get(`/admin/bizmem`).then((resp) => {
        console.log(resp.data);
        setBizMems(resp.data);
        setFiltered(resp.data)
      }).catch((resp) => {
        alert("이상 오류")
      })
    }
    useEffect(() => {
        fetchOrders();  // 주문 내역 가져오기
    }, []);

    
   // 체크박스 처리 
    const handleCheckAll = (e) => {
        const checked = e.target.checked;
    
        // "미발송" 상태인 주문만 선택
        const enabledValues = filtered
            .slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE)
            .filter(order => order.G_NAME === 'pending')  // 미발송 상태만 필터링
            .map(order => order.ID);
    
        checkboxRef.current.forEach((checkbox, i) => {
            const order = filtered[i + currentPage * PER_PAGE];
            if (checkbox && order.G_NAME === 'pending') {
                checkbox.checked = checked;
            } else if (checkbox && order.G_NAME !== 'pending') {
                checkbox.checked = false; // 미발송이 아닌 주문은 선택되지 않도록 체크 해제
            }
        });
    
        setCheckedOrders(checked ? enabledValues : []); // 미발송 상태인 주문만 checkedOrders에 저장
    };
        
    
    const handleCheckBox = (e) => {
        const { value, checked } = e.target;
        // const intValue = parseInt(value, 10); // 값이 int로 변환됨
        
        setCheckedOrders(prev => {
            if (checked) {
                return [...prev, value]; // 선택된 경우 int 값으로 추가
            } else {
                return prev.filter(prev => prev !== value); // 선택 해제된 경우 해당 값 제외
            }
        });

        // 전체 선택이 해제된 경우 '전체선택' 체크 해제
        if (!checked) {
            allCheckRef.current.checked = false;
        }
    };
    
    // 체크박스 리셋
    const resetCheckboxes = () => {
        setCheckedOrders([]);
        allCheckRef.current.checked = false;
        checkboxRef.current.forEach(checkbox => {
            if (checkbox) {
                checkbox.checked = false;
            }
        });
    };
    
    // 페이지네이션 설정
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 4;
    const pageCount = Math.ceil(filtered.length / PER_PAGE);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        setCheckedOrders([]); // 체크박스 상태 초기화
        if (allCheckRef.current) {
            allCheckRef.current.checked = false;
        }
        checkboxRef.current.forEach(checkbox => {
            if (checkbox) {
                checkbox.checked = false;
            }
        });
        window.scrollTo(0, 0);
    };

    
    
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
                <button className={styles.button} onClick={handleNameSearch}>
                    돋보기
                    {/* <FaSearch className={styles.searchLogo} /> */}
                </button>
            </div>
            <div className={styles.btnStatus}>
                <button
                    className={styles.btnDeliver}
                    onClick={() => openModal()}
                >
                    가입 승인 처리
                </button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                        <td><input type="checkbox" name='checkedAll' onClick={handleCheckAll} ref={allCheckRef} /></td>
                            <td> 사업명</td>
                            <td> 사업자 등록번호</td>
                            <td> 가입날짜</td>
                            <td> 판매상품 갯수 </td>
                            <td> 상태</td>
                        </tr>
                    </thead>
                    <tbody>
                    {filtered.slice(currentPage * PER_PAGE, (currentPage +1) * PER_PAGE).map((mem, i) => (
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
                                <td>
                                    {mem.C_NAME}
                                </td>
                                <td>
                                    {mem.REGISTRATION_NUMBER}
                                </td>
                                <td>
                                {formatDate(mem.JOIN_DATE)}
                                    {/* 날짜 포맷 바꾸기  */}
                                </td>
                                <td>
                                    {mem.APPLY_COUNT}
                                </td>
                                <td>{mem.G_NAME === 'pending' ? "승인 대기 ": "승인 완료"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className={styles.modalForm}>
                    <ModalOrder resetCheckboxes={resetCheckboxes} 
                    checkedOrders={checkedOrders} 
                    onClose={closeModal}
                    fetchOrders={fetchOrders} 
                     />
                </div>
            </Modal>
        </div>
    )
}
