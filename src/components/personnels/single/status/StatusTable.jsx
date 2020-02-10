import React from 'react';
import { Row, Col, Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { List } from 'immutable';

const toggleDeleteModal = async (status, handleDelete) => {
  const { value: confirm } = await Swal.fire({
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
  });
  if (confirm) {
    handleDelete(status.get('_id'));
  }
};

const StatusTable = ({ statuses, handleDelete }) => {
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
            {statuses.map(status => {
              return (
                <tr key={status.get('_id')}>
                  <th>{status.getIn(['statusId', 'name'])}</th>
                  <td>{status.get('startDate')}</td>
                  <td>{status.get('endDate')}</td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => {
                        toggleDeleteModal(status, handleDelete);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
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
export default StatusTable;
