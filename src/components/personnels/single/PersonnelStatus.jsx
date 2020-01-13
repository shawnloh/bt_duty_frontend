import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Table
} from 'reactstrap';

const statusInitial = {
  _id: null,
  name: null,
  startDate: null,
  endDate: null
};

const PersonnelStatus = ({ statuses, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(statusInitial);
  // const [name, setName] = useState(null);

  const toggleModal = () => {
    if (showModal) {
      setStatus(statusInitial);
    }
    setShowModal(!showModal);
  };

  const deleteStatus = () => {
    onDelete(status._id);
    toggleModal();
  };

  const modal = (
    <Modal isOpen={showModal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>
        Confirm delete {status.name}
      </ModalHeader>
      <ModalBody>
        Deleting {status.name}, {status.startDate} - {status.endDate}.
        <br />
        <b>Action is irreversible!</b>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={deleteStatus}>
          Confirm Delete
        </Button>{' '}
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <>
      {modal}

      <Row>
        <Col>
          <Table striped>
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
                          setStatus({
                            _id: s._id,
                            name: s.statusId.name,
                            startDate: s.startDate,
                            endDate: s.endDate
                          });
                          toggleModal();
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
    </>
  );
};

PersonnelStatus.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default PersonnelStatus;
