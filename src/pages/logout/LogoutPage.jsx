import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Progress, Col } from 'reactstrap';
import { logout } from '../../actions/authActions';

function LogoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Container className="h-100">
      <Row className="h-100">
        <Col className="my-auto mx-auto">
          <Progress animated value={100} color="primary" />
          <p className="text-center">Logging you out...</p>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(LogoutPage);
