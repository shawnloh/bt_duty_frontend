import React, { PureComponent } from 'react';
import { Spinner, Row, Container } from 'reactstrap';
import AppLayout from '../../pages/shared/AppLayout';

class Loading extends PureComponent {
  render() {
    return (
      <AppLayout>
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
      </AppLayout>
    );
  }
}

export default Loading;
