import React, { useState, useEffect } from 'react';
import styles from './IPBlockManagement.module.css';
import { Pagination } from '../../../components/Pagination/Pagination';
import { FaSearch, FaBan } from 'react-icons/fa';
import { api } from '../../../config/config';

export const IPBlockManagement = () => {
    const [blockedIPs, setBlockedIPs] = useState([]);
    const [filteredIPs, setFilteredIPs] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [reason, setReason] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const PER_PAGE = 10;

    useEffect(() => {
        fetchBlockedIPs();
    }, [currentPage]);

    const fetchBlockedIPs = async () => {
        try {
            const resp = await api.get(`/admin/ip-block/list`, {
                params: { page: currentPage, size: PER_PAGE }
            });
            console.log("block 데이터:", resp.data.list);
            setBlockedIPs(resp.data.list);
            setFilteredIPs(resp.data.list);
            setTotalPages(resp.data.pages);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = () => {
        const filtered = blockedIPs.filter(ip => 
            ip.ip.includes(keyword) || ip.reason.includes(keyword)
        );
        setFilteredIPs(filtered);
        setCurrentPage(1);
    };

    const handleBlockIP = async () => {
        if (!keyword.trim()) {
            alert("IP 주소를 입력해주세요.");
            return;
        }
        try {
            await api.post(`/admin/ip-block/block`, null, { 
                params: { ip: keyword, reason: reason }
            });
            fetchBlockedIPs();
            setKeyword('');
            setReason('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnblockIP = async (ip) => {
        try {
            await api.post(`/admin/ip-block/unblock`, null, { params: { ip } });
            fetchBlockedIPs();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = ({selected}) => {
        setCurrentPage(selected + 1);
    };

    return (
        <div className={styles.container}>
            <h2>IP 차단 관리</h2>
            <div className={styles.searchWrapper}>
                <input
                    type="text"
                    placeholder="IP 주소 입력"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className={styles.searchInput}
                />
                <input
                    type="text"
                    placeholder="차단 이유"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className={styles.searchInput}
                />
                <button className={styles.buttonsearch} onClick={handleSearch}>
                    <FaSearch />
                </button>
                <button className={styles.buttonblock} onClick={handleBlockIP}>
                    <FaBan /> 차단
                </button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>IP 주소</th>
                            <th>차단 이유</th>
                            <th>차단 일시</th>
                            <th>조치</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIPs.map((ip, i) => (
                            <tr key={i}>
                                <td>{ip.ip}</td>
                                <td>{ip.reason}</td>
                                <td>{new Date(ip.blockedAt).toLocaleString()}</td>
                                <td>
                                    <button className={styles.buttonunblock} onClick={() => handleUnblockIP(ip.ip)}>
                                        차단 해제
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}>
                {totalPages > 0 && (
                    <Pagination
                        pageCount={totalPages}
                        onPageChange={handlePageChange}
                        currentPage={currentPage - 1}
                    />
                )}
            </div>
        </div>
    );
};