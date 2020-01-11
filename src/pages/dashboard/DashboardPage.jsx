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
import { Link } from 'react-router-dom';
import { GiRank3, GiGroupedDrops } from 'react-icons/gi';
import { TiGroup } from 'react-icons/ti';
import { MdEvent, MdSettingsSystemDaydream } from 'react-icons/md';
import { IoMdPaper } from 'react-icons/io';
import AppLayout from '../shared/AppLayout';

export class DashboardPage extends PureComponent {
  render() {
    return (
      <AppLayout>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <Container>
          <Row>
            <Col sm="4 mt-2">
              <Card body className="text-center">
                <CardTitle>
                  <MdEvent fontSize="3em" />
                </CardTitle>
                <CardTitle>Events</CardTitle>
                <CardText>
                  Allows you to create event, generate names and allocate points
                </CardText>
                <Button color="primary">Go</Button>
              </Card>
            </Col>
            <Col sm="4 mt-2">
              <Card body className="text-center">
                <CardTitle>
                  <MdSettingsSystemDaydream fontSize="3em" />
                </CardTitle>
                <CardTitle>Point System</CardTitle>
                <CardText>
                  Create a point system and allocate points during event
                  creation
                </CardText>
                <Button tag={Link} to="/points" color="primary">
                  Go
                </Button>
              </Card>
            </Col>
            <Col sm="4 mt-2">
              <Card body className="text-center">
                <CardTitle>
                  <TiGroup fontSize="3em" />
                </CardTitle>
                <CardTitle>Personnels</CardTitle>
                <CardText>
                  Add / Remove / Edit Person including status and blockout dates
                </CardText>
                <Button color="primary">Go</Button>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="4 mt-2">
              <Card body className="text-center">
                <CardTitle>
                  <GiRank3 fontSize="3em" />
                </CardTitle>
                <CardTitle>Rank</CardTitle>
                <CardText>
                  Rank System allows you to assign rank to individual person
                </CardText>
                <Button tag={Link} to="/ranks" color="primary">
                  Go
                </Button>
              </Card>
            </Col>
            <Col sm="4 mt-2">
              <Card body className="text-center">
                <CardTitle>
                  <GiGroupedDrops fontSize="3em" />
                </CardTitle>
                <CardTitle>Platoon</CardTitle>
                <CardText>
                  Platoon System allows you to assign platoon to individual
                  person
                </CardText>
                <Button tag={Link} to="/platoons" color="primary">
                  Go
                </Button>
              </Card>
            </Col>
            <Col sm="4 mt-2">
              <Card body className="text-center">
                <CardTitle>
                  <IoMdPaper fontSize="3em" />
                </CardTitle>
                <CardTitle>Status</CardTitle>
                <CardText>Add status in order to assign to personnels</CardText>
                <Button tag={Link} to="/statuses" color="primary">
                  Go
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </AppLayout>
    );
  }
}

export default DashboardPage;
