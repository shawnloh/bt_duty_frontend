import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button
} from 'reactstrap';
import AppLayout from '../shared/AppLayout';

export class Ranks extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <AppLayout>
        <Container fluid>
          <Row className="mt-2">
            <Col md={{ size: 2, offset: 10 }}>
              <Button color="success" size="lg">
                Add Rank
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md="12">hello</Col>
          </Row>
        </Container>
      </AppLayout>
    );
  }
}

export default Ranks;
