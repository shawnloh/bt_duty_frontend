import React, { memo } from 'react';
import { Spinner, Row, Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import Layout from '../../pages/shared/AppLayout';

export function Loading() {
  const isAuthenticated = useSelector(state =>
    state.auth.get('isAuthenticated')
  );
  if (isAuthenticated) {
    return (
      <Layout>
        <Container className="d-flex h-100 justify-content-center align-items-center flex-column">
          <Row>
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="secondary" />
            <Spinner type="grow" color="success" />
            <Spinner type="grow" color="danger" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="info" />
            <Spinner type="grow" color="dark" />
          </Row>
          <Row>Loading Page...</Row>
        </Container>
      </Layout>
    );
  }

  return (
    <Container className="d-flex h-100 justify-content-center align-items-center flex-column">
      <Row>
        <Spinner type="grow" color="primary" />
        <Spinner type="grow" color="secondary" />
        <Spinner type="grow" color="success" />
        <Spinner type="grow" color="danger" />
        <Spinner type="grow" color="warning" />
        <Spinner type="grow" color="info" />
        <Spinner type="grow" color="dark" />
      </Row>
      <Row>Loading Page...</Row>
    </Container>
  );
}

export default memo(Loading);
