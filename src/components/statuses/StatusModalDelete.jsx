import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const StatusModalDelete = ({
  onCancel,
  onDelete,
  onToggle,
  showModal,
  status
}) => {
  return (
    <Modal isOpen={showModal} toggle={() => onToggle()}>
      <ModalHeader toggle={() => onToggle()}>
        Action is irreversible!
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete {status.name}?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onDelete}>
          Delete
        </Button>
        <Button color="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

StatusModalDelete.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  status: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default StatusModalDelete;
