import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import AppLayout from '../../shared/AppLayout';

export class Add extends PureComponent {
  render() {
    return (
      <AppLayout>
        <Container>
          <Row>
            <Col>ADD PAGE</Col>
          </Row>
        </Container>
      </AppLayout>
    );
  }
}

export default Add;
