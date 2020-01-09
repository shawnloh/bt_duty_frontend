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

const PlatoonModalEdit = ({
  onCancel,
  onSave,
  onToggle,
  showModal,
  onChangeText,
  platoon
}) => {
  return (
    <Modal isOpen={showModal} toggle={() => onToggle()}>
      <ModalHeader toggle={() => onToggle()}>
        Updating for {platoon}
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="platoonName">New name for {platoon}</Label>
          <Input
            type="text"
            name="platoonName"
            id="platoonName"
            placeholder={platoon}
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

PlatoonModalEdit.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  onChangeText: PropTypes.func.isRequired,
  platoon: PropTypes.string.isRequired
};

export default PlatoonModalEdit;
