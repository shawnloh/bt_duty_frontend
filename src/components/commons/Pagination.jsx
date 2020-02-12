import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import './pagination.css';

const PaginationComponent = ({ rowsPerPage, totalPosts, setPage }) => {
  const pageNumbers = useMemo(() => {
    const page = [];
    for (let i = 1; i <= Math.ceil(totalPosts / rowsPerPage); i += 1) {
      page.push(i);
    }
    return page;
  }, [totalPosts, rowsPerPage]);
  const handlePageClick = useCallback(
    ({ selected }) => {
      const pageNumber = selected + 1;
      setPage(pageNumber);
    },
    [setPage]
  );

  if (pageNumbers.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Page pagination">
      <ReactPaginate
        previousLabel="&laquo;"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextLabel="&raquo;"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageNumbers.length}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="page-item active"
        activeLinkClassName="page-item active"
        disabledClassName="page-item disabled"
      />
    </nav>
  );
};

PaginationComponent.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired
};

export default PaginationComponent;
