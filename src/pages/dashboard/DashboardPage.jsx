import React, { PureComponent } from 'react';
import {
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  CardText,
  Button
} from 'reactstrap';
import { Helmet } from 'react-helmet';
import { GiRank3, GiGroupedDrops } from 'react-icons/gi';
import { TiGroup } from 'react-icons/ti';
import AppLayout from '../shared/AppLayout';

export class DashboardPage extends PureComponent {
  render() {
    return (
      <AppLayout>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <Container fluid>
          <Row className="mt-2">
            <Col sm="4">
              <Card body className="text-center">
                <CardTitle>
                  <GiRank3 fontSize="3em" />
                </CardTitle>
                <CardTitle>Rank</CardTitle>
                <CardText>
                  Rank System allows you to assign rank to individual person
                </CardText>
                <Button color="primary">Go</Button>
              </Card>
            </Col>
            <Col sm="4">
              <Card body className="text-center">
                <CardTitle>
                  <GiGroupedDrops fontSize="3em" />
                </CardTitle>
                <CardTitle>Platoon</CardTitle>
                <CardText>
                  Platoon System allows you to assign platoon to individual
                  person
                </CardText>
                <Button color="primary">Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="4">
              <Card body className="text-center">
                <CardTitle>
                  <TiGroup fontSize="3em" />
                </CardTitle>
                <CardTitle>Person</CardTitle>
                <CardText>
                  Add / Remove / Edit Person including status and blockout dates
                </CardText>
                <Button color="primary">Go somewhere</Button>
              </Card>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col sm="4">
              <Card body className="text-center">
                <CardTitle>
                  <GiRank3 fontSize="3em" />
                </CardTitle>
                <CardTitle>Rank</CardTitle>
                <CardText>
                  Rank System allows you to assign rank to individual person
                </CardText>
                <Button color="primary">Go</Button>
              </Card>
            </Col>
            <Col sm="4">
              <Card body className="text-center">
                <CardTitle>
                  <GiGroupedDrops fontSize="3em" />
                </CardTitle>
                <CardTitle>Platoon</CardTitle>
                <CardText>
                  Platoon System allows you to assign platoon to individual
                  person
                </CardText>
                <Button color="primary">Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="4">
              <Card body className="text-center">
                <CardTitle>
                  <TiGroup fontSize="3em" />
                </CardTitle>
                <CardTitle>Person</CardTitle>
                <CardText>
                  Add / Remove / Edit Person including status and blockout dates
                </CardText>
                <Button color="primary">Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </AppLayout>
    );
  }
}

export default DashboardPage;
