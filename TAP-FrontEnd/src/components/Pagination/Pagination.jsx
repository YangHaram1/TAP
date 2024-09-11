import styles from './Pagination.module.css';
import React from 'react';
import ReactPaginate from 'react-paginate';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const Pagination = ({ pageCount, onPageChange, currentPage }) => {
    return (
      <ReactPaginate
        previousLabel={<FiChevronLeft className={styles.pagination_arrow} />}
        nextLabel={<FiChevronRight className={styles.pagination__arrow} />}
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName={styles.pagination}
        pageLinkClassName={styles.pagination__link}
        activeLinkClassName={styles.pagination__link__active}
        forcePage={currentPage} // 현재 페이지를 외부 상태로 설정
        pageRangeDisplayed={4} // 화면에 표시할 페이지 범위
        marginPagesDisplayed={1} // 시작과 끝에 표시할 페이지 번호 수
      />
    );
  };


//  중간페이지를 클릭할 시 ( 시작페이지와 끝페이지와 가까워질때 )
//  전체페이지가 나타남...
//  react-paginate 의 특징이기때문에 어쩔 수 없음. 
//  방법이야 찾을 수 있겠다만 나중에....

    // <<< 페이지네이션 적용할 컴포넌트에 설정할 코드들 >>>
    // << pages -> ABusiness -> BizManage -> CurrentEvent.jsx 참고. >
    //   //==========================================================================
    // const [currentPage, setCurrentPage] = useState(0);
    // // Pagingation
    // const PER_PAGE = 10; // 한 페이지에 보여줄 목록 수 
    // const pageCount = Math.ceil(filtered.length / PER_PAGE); // (총 갯수 / PER_PAGE) = 페이지 몇 개 나올지 계산  
    // console.log(pageCount + " 페이지 수 ")
    // const handlePageChange = ({selected}) =>{
    //     setCurrentPage(selected);
    //     window.scrollTo(0,320);     // 페이지 변경 시 스크롤 맨 위로 이동시키기. 
    // }
    // //==========================================================================
    //  {/* 페이지네이션  데이터 영역 */}
    //  {
    //   filtered.slice(currentPage * PER_PAGE, (currentPage +1) * PER_PAGE)
    //   .map((mem,i)=>{
    //       return(
    // ------------------------------
    //  {/* 페이지네이션 */}
    //  {pageCount > 0 && (
    //   <Pagination
    //   pageCount={pageCount}
    //   onPageChange={handlePageChange}
    //   currentPage={currentPage}
    //   />
    //   )}