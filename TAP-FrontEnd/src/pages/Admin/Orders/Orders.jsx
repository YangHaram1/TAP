import { useEffect, useRef, useState } from 'react';
import styles from './Orders.module.css';
import { api } from '../../../config/config';
import { Pagination } from '../../../components/Pagination/Pagination';
import { ModalOrder } from './ModalOrder/ModalOrder';
import { Modal } from '../../../components/Modal/Modal';

export const Orders=()=>{

    const [ orders, setOrders ]= useState([]);
    const [ filtered, setFiltered] =useState(orders);
    // select 필터 위한 상태
    const [ orderStatus, setOrderStatus] = useState('');
    const [ shippingStatus, setShippingStatus] = useState('');

    // 주문 모든 내역 가져오기 ( 기간 정해서 가져와야하낭..? 아 후순위 . 일단 다 가져오기)
    useEffect(()=>{
        api.get(`admin/orders`).then((resp)=>{
            console.log(resp.data);
            setOrders(resp.data);
            setFiltered(resp.data);
        })
    },[])

    // select 필터링 함수 
    const applyFilters = () =>{
        let filteredOrders = orders;

        if(orderStatus){
            filteredOrders = filteredOrders.filter(order => order.STATUS === orderStatus);
        }
        if(shippingStatus){
            filteredOrders = filteredOrders.filter(order => order.DELIVERY_STATUS === shippingStatus)
        }
        setFiltered(filteredOrders);
    }
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

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
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
                            <th>주문번호</th>
                            <th>주문id</th>
                            <th>주문자</th>
                            <th>상품명 좌석 정보</th>
                            <th>주문 총액</th>
                            <th>주문 날짜</th>
                            <th>
                                <select value={orderStatus} onChange={handleOrderStatusChange}>
                                    <option value="">주문 상태</option>
                                    <option value="결제">결제</option>
                                    <option value="환불">환불</option>
                                </select>
                            </th>
                            <th>
                                <select value={shippingStatus} onChange={handleShippingStatusChange}>
                                    <option value="">배송 상태</option>
                                    <option value="배송 준비중">배송 준비중</option>
                                    <option value="발송 완료">발송 완료</option>
                                    <option value="배송중">배송중</option>
                                    <option value="배송 완료">배송 완료</option>
                                </select>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
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
                                <td>{order.MEMBER_ID}</td>
                                <td>{order.NAME}</td>
                                <td>
                                    <div className={styles.proName}>
                                    {order.APPLY_NAME}
                                    </div>
                                    <div className={styles.seatInfo}>
                                    {order.SEAT_INFO}
                                    </div>
                                </td>
                                <td>{order.TOTAL_PRICE}</td>
                                <td>{formatTime(order.order_date)}</td>
                                <td>{order.STATUS}</td>
                                <td>{order.DELIVERY_STATUS}</td>
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