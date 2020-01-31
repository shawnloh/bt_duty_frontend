import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import moment from 'moment-timezone';
import BlockoutTable from './blockout/BlockoutTable';
import Pagination from '../../commons/Pagination';

function BlockoutDetails({ blockoutDates, handleDelete }) {
  const [rowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const sortedBlockoutDate = useMemo(() => {
    const dates = blockoutDates;
    dates.sort((a, b) => {
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
    return dates;
  }, [blockoutDates]);

  if (sortedBlockoutDate.length === 0) {
    return <h3 className="my-2">No blockout date for this personnel</h3>;
  }

  const lastIndex = page * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const shownDates = sortedBlockoutDate.slice(firstIndex, lastIndex);
  return (
    <>
      <BlockoutTable handleDelete={handleDelete} blockoutDates={shownDates} />
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Pagination
            currentPage={page}
            rowsPerPage={rowsPerPage}
            totalPosts={blockoutDates.length}
            setPage={setPage}
          />
        </Col>
      </Row>
    </>
  );
}

BlockoutDetails.defaultProps = {
  blockoutDates: []
};

BlockoutDetails.propTypes = {
  blockoutDates: PropTypes.arrayOf(PropTypes.string),
  handleDelete: PropTypes.func.isRequired
};

export default BlockoutDetails;
