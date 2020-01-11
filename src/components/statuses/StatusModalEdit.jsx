import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import PropTypes from 'prop-types';

const StatusModalEdit = ({
  onCancel,
  onSave,
  onToggle,
  showModal,
  onChangeText,
  status
}) => {
  return (
    <Modal isOpen={showModal} toggle={() => onToggle()}>
      <ModalHeader toggle={() => onToggle()}>Updating for {status}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="statusName">New name for {status}</Label>
          <Input
            type="text"
            name="statusName"
            id="statusName"
            placeholder={status}
            onChange={onChangeText}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={onSave}>
          Save
        </Button>
        <Button color="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

StatusModalEdit.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  onChangeText: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};

export default StatusModalEdit;
