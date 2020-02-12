import React, { useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import moment from 'moment-timezone';
import { List } from 'immutable';
import BlockoutTable from './blockout/BlockoutTable';
import AddBlockout from './blockout/AddBlockout';
import Pagination from '../../commons/Pagination';

function useSortedBlockoutDate(dates) {
  const sortedBlockoutDate = useMemo(() => {
    return dates.sort((a, b) => {
      const date1 = moment(a, 'DD-MM-YYYY', true);
      const date2 = moment(b, 'DD-MM-YYYY', true);

      if (date1.isBefore(date2)) {
        return -1;
      }
      if (date1.isAfter(date2)) {
        return 1;
      }

      return 0;
    });
  }, [dates]);
  return sortedBlockoutDate;
}

function BlockoutDetails({ blockoutDates, handleDelete, handleAdd }) {
  const [rowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const sortedBlockoutDate = useSortedBlockoutDate(blockoutDates);
  const lastIndex = page * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const shownDates = sortedBlockoutDate.slice(firstIndex, lastIndex);
  return (
    <>
      <AddBlockout handleAdd={handleAdd} handleDelete={handleDelete} />
      {sortedBlockoutDate.length === 0 ? (
        <h3 className="my-2">No blockout date for this personnel</h3>
      ) : (
        <BlockoutTable handleDelete={handleDelete} blockoutDates={shownDates} />
      )}
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Pagination
            currentPage={page}
            rowsPerPage={rowsPerPage}
            totalPosts={blockoutDates.size}
            setPage={setPage}
          />
        </Col>
      </Row>
    </>
  );
}

BlockoutDetails.defaultProps = {
  blockoutDates: List()
};

BlockoutDetails.propTypes = {
  // blockoutDates: PropTypes.arrayOf(PropTypes.string),
  blockoutDates: PropTypes.instanceOf(List),
  handleDelete: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired
};

export default memo(BlockoutDetails);
