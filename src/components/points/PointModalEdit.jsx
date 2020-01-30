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

const PointModalEdit = ({
  onCancel,
  onSave,
  onToggle,
  showModal,
  onChangeText,
  point
}) => {
  return (
    <Modal isOpen={showModal} toggle={() => onToggle()}>
      <ModalHeader toggle={() => onToggle()}>
        Updating for {point} point system
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="pointName">New name for {point}</Label>
          <Input
            type="text"
            name="pointName"
            id="pointName"
            placeholder={point}
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

PointModalEdit.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  onChangeText: PropTypes.func.isRequired,
  point: PropTypes.string.isRequired
};

export default PointModalEdit;
