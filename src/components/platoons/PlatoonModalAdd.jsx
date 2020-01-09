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

const PlatoonModalAdd = ({
  onCancel,
  onSave,
  onToggle,
  showModal,
  onChangeText
}) => {
  return (
    <Modal isOpen={showModal} toggle={() => onToggle()}>
      <ModalHeader toggle={() => onToggle()}>Adding New Platoon!</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="platoonName">New platoon</Label>
          <Input
            type="text"
            name="platoonName"
            id="platoonName"
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

PlatoonModalAdd.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

export default PlatoonModalAdd;
