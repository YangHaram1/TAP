import { useEffect, useRef, useState } from 'react';
import styles from './Orders.module.css';
import { api } from '../../../config/config';
import { Pagination } from '../../../components/Pagination/Pagination';
import { ModalOrder } from './ModalOrder/ModalOrder';
import { Modal } from '../../../components/Modal/Modal';

export const Orders=()=>{

    const [ orders, setOrders ]= useState([]);
    const [ filtered, setFiltered] =useState(orders)
    useEffect(()=>{
        // 주문 모든 내역
        api.get(`admin/orders`).then((resp)=>{
            console.log(resp.data);
            setOrders(resp.data);
            setFiltered(resp.data);
        })
    },[])

    // checked Orders 처리 
    const [checkedOrders, setCheckedOrders] = useState([]);
    const checkboxRef = useRef([]);
    const allCheckRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalState, setModalState] = useState("");
    
    // checked Orders 처리 함수 
    const handleCheckAll =(e)=>{
        const checked = e.target.checked;
        // 페이지네이션 한페이지만 checked 처리
        const enabledValues = filtered
            .slice(currentPage * PER_PAGE, (currentPage +1) * PER_PAGE)
            .map(order => order.ORDER_SEQ);

        checkboxRef.current.forEach((checkbox, i) => {
            const order = filtered[i + currentPage * PER_PAGE];
            checkbox.checked = checked;
        });
        setCheckedOrders(checked ? enabledValues : []);
    }
    // 개별 체크박스 클릭 처리
    const handleCheckBox = (e) => {
        const {value, checked} = e.target;
        setCheckedOrders(prev => {
            if(checked){
                return [...prev, value];
            } else {
                return prev.filter(prev => prev != value); 
            }
        });
    };

    // 체크박스 리셋
    const resetCheckboxes = () => {
        setCheckedOrders([]); // 선택된 체크박스 초기화
        allCheckRef.current.checked = false; // 전체 선택 체크박스 해제
        checkboxRef.current.forEach(checkbox => {
            if (checkbox) {
                checkbox.checked = false; // 개별 체크박스 해제
            }
        });

    };
    // =======================================================================================
    // 모달 열기/닫기
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // =======================================================================================
    // 페이지네이션 설정
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 5;
    const pageCount = Math.ceil(filtered.length / PER_PAGE);
    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
        setCheckedOrders([]); // 체크박스 상태 초기화
        // 전체 체크박스 해제
        if (allCheckRef.current) {
            allCheckRef.current.checked = false;
        }
        checkboxRef.current.forEach(checkbox => {
            if (checkbox) {
                checkbox.checked = false; // 체크박스 해제
            }
        });
        window.scrollTo(0,0); // 페이지 변경 시 스크롤 맨 위로 이동
    };

    return(
        <div className={styles.container}>
            <h2>주문관리</h2>
            <div className={styles.btnStatus}>
            <button
                    className={styles.btnDeliver}
                    onClick={() => {
                        // if (checkedOrders.length === 0) {
                        //     alert("변경할 주문을 선택해주세요.");
                        // } else {
                            openModal(); // 모달 열기
                        // }
                    }}
                >발송 처리</button>
            </div>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th> <input type="checkbox" name='checkedAll' onClick={handleCheckAll} ref={allCheckRef}/></th>
                            <th>주문id</th>
                            <th>주문자</th>
                            <th>상품명</th>
                            <th>좌석 정보 요약</th>
                            <th>주문 총액</th>
                            <th>주문 날짜</th>
                            <th>주문 상태</th>
                            <th>배송 상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>
                            <input
                                        type="checkbox"
                                        value={order.ORDER_SEQ}
                                        onClick={handleCheckBox}
                                        ref={el => (checkboxRef.current[i] = el)}
                                    />
                            </td>
                            <td>1001</td>
                            <td>정하윤</td>
                            <td>오로라 오케슬라</td>
                            <td>vip a 1열 15</td>
                            <td>2024.09.06</td>
                            <td>결제</td>
                            <td>미발송</td>
                        </tr> */}
                        {filtered.slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE).map((order, i) => (
                            <tr key={i}>
                                <td>
                                    <input
                                        type="checkbox"
                                        value={order.ORDER_SEQ}
                                        onClick={handleCheckBox}
                                        ref={el => (checkboxRef.current[i] = el)}
                                    />
                                </td>
                                <td>{order.ORDER_SEQ}</td>
                                <td>{order.CUSTOMER_NAME}</td>
                                <td>{order.PRODUCT_NAME}</td>
                                <td>{order.SEAT_INFO}</td>
                                <td>{order.TOTAL_PRICE}</td>
                                <td>{order.ORDER_DATE}</td>
                                <td>{order.ORDER_STATUS}</td>
                                <td>{order.SHIPPING_STATUS}</td>
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
                    <ModalOrder/>
                </div>
            </Modal>
        </div>
    )
}