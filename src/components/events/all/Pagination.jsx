import React, { useMemo } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';

const PersonnelsPagination = ({
  rowsPerPage,
  totalPosts,
  currentPage,
  setPage
}) => {
  const pageNumbers = useMemo(() => {
    const page = [];
    for (let i = 1; i <= Math.ceil(totalPosts / rowsPerPage); i += 1) {
      page.push(i);
    }
    return page;
  }, [totalPosts, rowsPerPage]);

  if (pageNumbers.length === 0) {
    return null;
  }
  return (
    <Pagination aria-label="Events Pagination">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink first onClick={() => setPage(1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous onClick={() => setPage(currentPage - 1)} />
      </PaginationItem>
      {pageNumbers.map(number => {
        return (
          <PaginationItem active={currentPage === number} key={number}>
            <PaginationLink onClick={() => setPage(number)}>
              {number}
            </PaginationLink>
          </PaginationItem>
        );
      })}
      <PaginationItem
        disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
      >
        <PaginationLink next onClick={() => setPage(currentPage + 1)} />
      </PaginationItem>
      <PaginationItem
        disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
      >
        <PaginationLink
          last
          onClick={() => setPage(pageNumbers[pageNumbers.length - 1])}
        />
      </PaginationItem>
    </Pagination>
  );
};

PersonnelsPagination.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired
};

export default PersonnelsPagination;
