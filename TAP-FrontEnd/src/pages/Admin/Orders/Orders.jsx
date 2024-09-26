import { useEffect, useRef, useState } from 'react';
import styles from './Orders.module.css';
import { api } from '../../../config/config';
import { Pagination } from '../../../components/Pagination/Pagination';
import { ModalOrder } from './ModalOrder/ModalOrder';
import { Modal } from '../../../components/Modal/Modal';

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [filtered, setFiltered] = useState(orders);
    
    // select 필터 위한 상태
    const [orderStatus, setOrderStatus] = useState('');
    const [shippingStatus, setShippingStatus] = useState('');
    
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

    // 주문 모든 내역 가져오기
    const fetchOrders = () => {
        api.get(`admin/orders`).then((resp) => {
            setOrders(resp.data);
            setFiltered(resp.data);
            console.log(resp.data)
        });
    };
    useEffect(() => {
        fetchOrders();  // 주문 내역 가져오기
    }, []);

    // select 필터링 함수 
    const applyFilters = () => {
        let filteredOrders = orders;

        // 주문 상태 필터 적용
        if (orderStatus) {
            filteredOrders = filteredOrders.filter(order => order.STATUS === orderStatus);
        }
        
        // 배송 상태 필터 적용
        if (shippingStatus) {
            filteredOrders = filteredOrders.filter(order => {
                // 배송 상태가 null 또는 빈 문자열일 때 '현장 발매'로 취급
                const deliveryStatus = !order.DELIVERY_STATUS || order.DELIVERY_STATUS === '' 
                    ? '현장 발매' 
                    : order.DELIVERY_STATUS;

                return deliveryStatus === shippingStatus;
            });
        }

        setFiltered(filteredOrders);
        setCurrentPage(0); // 페이지를 처음으로 이동
    };
    useEffect(() => {
        applyFilters();  // 상태 변경 시 필터링 적용
    }, [orderStatus, shippingStatus, orders]);

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

    // 체크박스 처리 
    const handleCheckAll = (e) => {
        const checked = e.target.checked;
    
        // "미발송" 상태인 주문만 선택
        const enabledValues = filtered
            .slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE)
            .filter(order => order.DELIVERY_STATUS === '미발송')  // 미발송 상태만 필터링
            .map(order => order.ORDER_SEQ);
    
        checkboxRef.current.forEach((checkbox, i) => {
            const order = filtered[i + currentPage * PER_PAGE];
            if (checkbox && order.DELIVERY_STATUS === '미발송') {
                checkbox.checked = checked;
            } else if (checkbox && order.DELIVERY_STATUS !== '미발송') {
                checkbox.checked = false; // 미발송이 아닌 주문은 선택되지 않도록 체크 해제
            }
        });
    
        setCheckedOrders(checked ? enabledValues : []); // 미발송 상태인 주문만 checkedOrders에 저장
    };
    

    const handleCheckBox = (e) => {
        const { value, checked } = e.target;
        const intValue = parseInt(value, 10); // 값이 int로 변환됨
        
        setCheckedOrders(prev => {
            if (checked) {
                return [...prev, intValue]; // 선택된 경우 int 값으로 추가
            } else {
                return prev.filter(prev => prev !== intValue); // 선택 해제된 경우 해당 값 제외
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
    const PER_PAGE = 6;
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

    const getCategoryName = (seq) => {
        switch (seq) {
          case 1:
            return "뮤지컬";
          case 2:
            return "콘서트";
          case 3:
            return "야구";
          case 4:
            return "축구";
          default:
            return "알 수 없음";
        }
      };

    return (
        <div className={styles.container}>
            <h2>주문관리</h2>
            <div className={styles.btnStatus}>
                <button
                    className={styles.btnDeliver}
                    onClick={() => openModal()}
                >
                    발송 처리
                </button>
            </div>
            <div className={styles.countorder} style={{marginBottom:"10px" , textAlign:"end"}}>
                <span>미발송 건: {filtered.filter(order=> order.DELIVERY_STATUS=== '미발송').length} 건</span>
            </div>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th><input type="checkbox" name='checkedAll' onClick={handleCheckAll} ref={allCheckRef} /></th>
                            <th>주문번호</th>
                            <th>주문id</th>
                            <th>주문자</th>
                            <th>카테고리</th>
                            <th>상품명 좌석 정보</th>
                            <th>주문 총액</th>
                            <th>주문 날짜</th>
                            <th>
                                <select value={orderStatus} onChange={handleOrderStatusChange} className={styles.select}> 
                                    <option value="">주문 상태</option>
                                    <option value="완료">완료</option>
                                    <option value="취소">환불</option>
                                </select>
                            </th>
                            <th>
                                <select value={shippingStatus} onChange={handleShippingStatusChange} className={styles.select}>
                                    <option value="">배송 상태</option>
                                    <option value="현장 발매">현장 발매</option>
                                    <option value="미발송">미발송</option>
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
                                        disabled={order.DELIVERY_STATUS !== '미발송'}
                                    />
                                </td>
                                <td>{order.ORDER_SEQ}</td>
                                <td>{order.ID}</td>
                                <td>{order.NAME}</td>
                                <td>{getCategoryName(order.SUB_CATEGORY_SEQ)}</td>
                                <td>
                                    <div className={styles.proName}>
                                        {order.APPLY_NAME}
                                    </div>
                                    <div className={styles.seatInfo}>
                                        {order.SEAT_INFO}
                                    </div>
                                </td>
                                <td>{Number(order.TOTAL_PRICE)?.toLocaleString()}</td>
                                <td>{formatTime(order.order_date)}</td>
                                <td>{order.STATUS}</td>
                                <td>{order.DELIVERY_STATUS ? order.DELIVERY_STATUS :  "현장 발매" }</td>
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
                    <ModalOrder resetCheckboxes={resetCheckboxes} 
                    checkedOrders={checkedOrders} 
                    onClose={closeModal}
                    fetchOrders={fetchOrders} 
                     />
                </div>
            </Modal>
        </div>
    );
};
