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

const RankModalEdit = ({
  onCancel,
  onSave,
  onToggle,
  showModal,
  onChangeText,
  rank
}) => {
  return (
    <Modal isOpen={showModal} toggle={() => onToggle()}>
      <ModalHeader toggle={() => onToggle()}>Updating for {rank}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="rankName">New name for {rank}</Label>
          <Input
            type="text"
            name="rankName"
            id="rankName"
            placeholder={rank}
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

RankModalEdit.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  onChangeText: PropTypes.func.isRequired,
  rank: PropTypes.string.isRequired
};

export default RankModalEdit;
