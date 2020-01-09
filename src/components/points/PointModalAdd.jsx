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

const PointModalAdd = ({
  onCancel,
  onSave,
  onToggle,
  showModal,
  onChangeText
}) => {
  return (
    <Modal isOpen={showModal} toggle={() => onToggle()}>
      <ModalHeader toggle={() => onToggle()}>Adding New Point!</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="pointName">New point</Label>
          <Input
            type="text"
            name="pointName"
            id="pointName"
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

PointModalAdd.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

export default PointModalAdd;
