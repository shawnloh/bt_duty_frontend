import React from 'react';
import { Row, Col, Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const toggleDelete = async (status, handleDelete) => {
  const { value: confirm } = await Swal.fire({
    title: 'Are you sure?',
    html: `
      <p class="font-weight-bold">You won't be able to revert this!</p>
      <p>You are deleting:</p>
      <p>${status.statusId.name}</p>
      <p>Date: ${status.startDate} - ${status.endDate}</p>
      `,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#3085d6',
    confirmButtonColor: '#d33',
    confirmButtonText: 'Delete'
  });
  if (confirm) {
    handleDelete(status._id);
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
            {statuses.map(s => {
              return (
                <tr key={s._id}>
                  <th>{s.statusId.name}</th>
                  <td>{s.startDate}</td>
                  <td>{s.endDate}</td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => {
                        toggleDelete(s, handleDelete);
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
  statuses: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDelete: PropTypes.func.isRequired
};
export default StatusTable;
