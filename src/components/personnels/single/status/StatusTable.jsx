import React, { memo, useCallback } from 'react';
import { Row, Col, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { List } from 'immutable';
import SingleStatus from './SingleStatus';

const useDeleteStatusModal = deleteFunc => {
  const handler = useCallback(
    status => {
      Swal.fire({
        title: 'Are you sure?',
        html: `
      <p class="font-weight-bold">You won't be able to revert this!</p>
      <p>You are deleting:</p>
      <p>${status.getIn(['statusId', 'name'])}</p>
      <p>Date: ${status.get('startDate')} - ${status.get('endDate')}</p>
      `,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Delete'
      }).then(({ value: confirm }) => {
        if (confirm) {
          deleteFunc(status.get('_id'));
        }
      });
    },
    [deleteFunc]
  );
  return handler;
};

const StatusTable = ({ statuses, handleDelete }) => {
  const deleteModal = useDeleteStatusModal(handleDelete);
  return (
    <Row>
      <Col>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Status</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {statuses.map(status => (
              <SingleStatus
                key={status.get('_id')}
                status={status}
                handleDelete={deleteModal}
              />
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};
StatusTable.propTypes = {
  statuses: PropTypes.oneOfType([PropTypes.instanceOf(List)]).isRequired,
  handleDelete: PropTypes.func.isRequired
};
export default memo(StatusTable);
