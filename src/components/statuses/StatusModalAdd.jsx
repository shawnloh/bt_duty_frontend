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

const StatusModalAdd = ({
  onCancel,
  onSave,
  onToggle,
  showModal,
  onChangeText
}) => {
  return (
    <Modal isOpen={showModal} toggle={() => onToggle()}>
      <ModalHeader toggle={() => onToggle()}>Adding New Status!</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="statusName">New status</Label>
          <Input
            type="text"
            name="statusName"
            id="statusName"
            onChange={onChangeText}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={onSave}>
          Add
        </Button>
        <Button color="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

StatusModalAdd.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

export default StatusModalAdd;
