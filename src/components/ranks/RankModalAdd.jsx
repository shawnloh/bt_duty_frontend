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

const RankModalAdd = ({
  onCancel,
  onSave,
  onToggle,
  showModal,
  onChangeText
}) => {
  return (
    <Modal isOpen={showModal} toggle={() => onToggle()}>
      <ModalHeader toggle={() => onToggle()}>Adding New Rank!</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="rankName">New rank</Label>
          <Input
            type="text"
            name="rankName"
            id="rankName"
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

RankModalAdd.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

export default RankModalAdd;
