import styles from './Log.module.css';
import { useEffect, useState } from 'react';
import { format, startOfDay, subDays, subMonths, parseISO, isBefore, isAfter } from 'date-fns';
import { api } from '../../../config/config';
import { Pagination } from '../../../components/Pagination/Pagination';

export const Log = () => {
    const [loglist, setLoglist] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('');
    const [selectStatus, setSelectStatus] = useState('');
    const [specificStartDate, setSpecificStartDate] = useState('');
    const [specificEndDate, setSpecificEndDate] = useState('');

    useEffect(() => {
        if (keyword || searchType || selectStatus || (specificStartDate && specificEndDate)) {
            fetchSearchResults(currentPage);
        } else {
            fetchLogs(currentPage);
        }
    }, [currentPage]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo(0, 0);
    };

    const fetchLogs = (page) => {
        const params = { page: page + 1, size: 10 };
        api.get(`/admin/logs`, { params })
            .then((resp) => {
                console.log("넘어오는 데이터", resp);
                setLoglist(resp.data.list);
                setFiltered(resp.data.list);
                setTotalPages(resp.data.pages);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('데이터 가져오기 오류:', error);
                setIsLoading(false);
            });
    };

    const fetchSearchResults = (page) => {
        console.log("검색 결과 요청 전송됨", page);
        const params = { page: page + 1, size: 10 };
    
        if (searchType && keyword) {
            params[searchType] = keyword;
        }
        if (selectStatus) {
            params.log_status = selectStatus; 
        }
        if (specificStartDate && specificEndDate) {
            params.specific_start_date = specificStartDate; 
            params.specific_end_date = specificEndDate; 
        }
    
        api.get(`/admin/logs/search`, { params })
            .then((resp) => {
                console.log(resp.data)
                setFiltered(resp.data.list);
                setTotalPages(resp.data.pages);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('검색 오류:', error);
                setIsLoading(false);
            });
    };

    const setDateRange = (start, end) => {
        setSpecificStartDate(format(startOfDay(start), 'yyyy-MM-dd'));
        setSpecificEndDate(format(startOfDay(end), 'yyyy-MM-dd'));
    };

    const handleToday = () => setDateRange(new Date(), new Date());
    const handleWeek = () => setDateRange(subDays(new Date(), 7), new Date());
    const handleMonth = () => setDateRange(subMonths(new Date(), 1), new Date());
    const handleHalfYear = () => setDateRange(subMonths(new Date(), 6), new Date());

    const handleSelectStatus = (e) => setSelectStatus(e.target.value);
    const handleEnter = (e) => {
        if (e.key === "Enter") handleSearch();
    };
    const handleSearchType = (e) => setSearchType(e.target.value);
    const handleKeywordChange = (e) => {
        const value = e.target.value;
        if (value.length <= 30) setKeyword(value);
    };

    const handleDateChange = (e, setDate, isStartDate) => {
        const today = startOfDay(new Date());
        const newDate = parseISO(e.target.value);

        if (isNaN(newDate.getTime())) {
            setDate('');
            return;
        }

        if (isAfter(newDate, today)) {
            alert("날짜는 오늘 이후로 설정할 수 없습니다.");
            return;
        }

        if (isStartDate && isAfter(newDate, parseISO(specificEndDate))) {
            alert("시작일은 종료일보다 이후일 수 없습니다.");
            return;
        }

        if (!isStartDate && isBefore(newDate, parseISO(specificStartDate))) {
            alert("종료일은 시작일보다 이전일 수 없습니다.");
            return;
        }

        setDate(format(newDate, 'yyyy-MM-dd'));
    };

    const handleSearch = () => {
        console.log("검색 버튼 클릭");
        const today = format(startOfDay(new Date()), 'yyyy-MM-dd');

        if ((specificStartDate === '' || specificEndDate === '') && (searchType === '' && selectStatus === '')) {
            alert("적어도 하나의 검색 조건을 설정하세요!");
            return;
        }
        if (searchType !== '' && keyword === '' && selectStatus === '' && specificStartDate === '' && specificEndDate === '') {
            alert("검색어를 입력하세요");
            return;
        }
        if ((specificStartDate !== '' && specificEndDate === '') || (specificStartDate === '' && specificEndDate !== '')) {
            alert("검색기간을 확인하세요.");
            return;
        }
        if (specificEndDate > today) {
            alert("종료일은 오늘 날짜를 초과할 수 없습니다.");
            return;
        }
        if (specificStartDate > specificEndDate) {
            alert("시작일은 종료일보다 이후일 수 없습니다.");
            return;
        }

        // 페이지를 0으로 초기화하고 검색
        setCurrentPage(0);
        fetchSearchResults(0);
    };

    const handleReset = () => {
        setSearchType("");
        setKeyword("");
        setSelectStatus("");
        setSpecificStartDate("");
        setSpecificEndDate("");
        setFiltered(loglist);
        setCurrentPage(0);
        fetchLogs(0); // 검색 조건 초기화 시 전체 목록으로 돌아감
    };

    return (
        <div className={styles.container}>
            <div className={styles.member_info}>
                <div className={styles.coltitle}>
                    <div className={styles.coltitle_row}>
                        <div className={styles.column}>검색</div>
                        <div className={styles.inputBox1}>
                            <div className={styles.select1}>
                                <select
                                    className={styles.typeBox}
                                    name="searchType"
                                    id="searchType"
                                    onChange={handleSearchType}
                                    value={searchType}
                                >
                                    <option value="">검색 유형</option>
                                    <option value="name">이름</option>
                                    <option value="memberId">아이디</option>
                                </select>
                                <input
                                    className={styles.typeInput}
                                    type="text"
                                    id="keyword"
                                    name="keyword"
                                    autoComplete="off"
                                    onKeyDown={handleEnter}
                                    onChange={handleKeywordChange}
                                    value={keyword}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.coltitle_row}>
                        <div className={styles.column} />
                        <div className={styles.inputBox1}>
                            <div className={styles.select1}>
                                <select
                                    className={styles.selectStatus}
                                    name='selectStatus'
                                    id="selectStatus"
                                    onChange={handleSelectStatus}
                                    value={selectStatus}
                                >
                                    <option value="">로그 상태</option>
                                    <option value="로그인 성공">로그인 성공</option>
                                    <option value="로그인 실패">로그인 실패</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={styles.coltitle_row}>
                        <div className={styles.column}>기간</div>
                        <div className={styles.inputBox}>
                            <div className={styles.dateBox}>
                                <input
                                    type="date"
                                    name="specificStartDate"
                                    placeholder="시작일"
                                    value={specificStartDate}
                                    onChange={(e) => handleDateChange(e, setSpecificStartDate, true)}
                                />
                                <input
                                    type="date"
                                    name="specificEndDate"
                                    placeholder="종료일"
                                    value={specificEndDate}
                                    onChange={(e) => handleDateChange(e, setSpecificEndDate, false)}
                                />
                            </div>
                            <div className={styles.dateBtn}>
                                <button onClick={handleToday}>오늘</button>
                                <button onClick={handleWeek}>1주</button>
                                <button onClick={handleMonth}>1개월</button>
                                <button onClick={handleHalfYear}>6개월</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.BoxBtn}>
                        <button onClick={handleSearch}>검색</button>
                        <button onClick={handleReset}>초기화</button>
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <td className={styles.theadtd}>접속시간</td>
                                <td className={styles.theadtd}>아이디</td>
                                <td className={styles.theadtd}>이름</td>
                                <td className={styles.theadtd}>로그 상태</td>
                                <td className={styles.theadtd}>접속IP</td>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {isLoading ? (
                                <tr className={styles.loading}>
                                    <td> 로딩 중 </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className={styles.loading}>검색 결과가 없습니다.</td>
                                </tr>
                            ) : (
                                filtered.map((log, i) => (
                                    <tr key={i}>
                                        <td className={styles.theadtd}>
                                            {log.localLogtime ? format(new Date(log.localLogtime), 'yyyy.MM.dd HH:mm:ss') : '날짜 없음'}
                                        </td>
                                        <td className={styles.theadtd}>{log.memberId || "알 수 없음"}</td>
                                        <td className={styles.theadtd}>
                                            {log.name || "알 수 없음"}
                                        </td>
                                        <td className={styles.theadtd} style={{ color: log.logStatus === "로그인 성공" ? 'green' : 'red' }}>
                                            {log.logStatus}
                                        </td>
                                        <td className={styles.theadtd}>{log.clientIp}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            <div className={styles.pagination}>
                {totalPages > 0 && (
                    <Pagination
                        pageCount={totalPages}
                        onPageChange={handlePageChange}
                        currentPage={currentPage} 
                    />
                )}
            </div>
            </div>
        </div>
    );
};
