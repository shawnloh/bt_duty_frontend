import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Spinner } from 'reactstrap';

export function ActionsButtons({ isDeleting, handleCancel, handleConfirm }) {
  if (isDeleting) {
    return (
      <Row>
        <Col className="text-center">
          <Spinner size="lg" color="primary" />
          <p>Deleting...</p>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      <Col xs="6">
        <Button
          color="primary"
          size="lg"
          className="w-100"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Col>
      <Col xs="6">
        <Button
          color="danger"
          size="lg"
          className="w-100"
          onClick={handleConfirm}
        >
          Confirm Delete
        </Button>
      </Col>
    </Row>
  );
}

ActionsButtons.propTypes = {
  isDeleting: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired
};

export default memo(ActionsButtons);
