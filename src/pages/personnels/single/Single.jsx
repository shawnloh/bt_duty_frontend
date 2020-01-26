import React, { PureComponent } from 'react';
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Breadcrumb,
  BreadcrumbItem,
  Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  addStatus,
  deleteStatus,
  addBlockout,
  deleteBlockout
} from './actions';
import Details from '../../../components/personnels/single/Details';
import Tabs from '../../../components/personnels/single/Tabs';
import DeletePersonnelStatus from '../../../components/personnels/single/DeletePersonnelStatus';
import AddStatus from '../../../components/personnels/single/AddStatus';
import ActionAlert from '../../../components/commons/ActionAlert';
import AddBlockout from '../../../components/personnels/single/AddBlockout';
import BlockoutDetails from '../../../components/personnels/single/BlockoutDetails';

export class Single extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1'
    };
  }

  setTab = tab => {
    const { activeTab } = this.state;
    if (tab !== activeTab) this.setState({ activeTab: tab });
  };

  handleDeleteStatus = id => {
    const {
      deletePersonnelStatus,
      match: {
        params: { personnelId }
      }
    } = this.props;
    deletePersonnelStatus(personnelId, id);
  };

  handleAddStatus = ({ statusId, startDate, endDate }) => {
    const {
      match: {
        params: { personnelId }
      },
      addPersonnelStatus
    } = this.props;
    addPersonnelStatus(personnelId, statusId, startDate, endDate);
  };

  handleAddBlockoutDate = date => {
    const {
      match: {
        params: { personnelId }
      },
      addBlockoutDate
    } = this.props;
    addBlockoutDate(personnelId, date);
  };

  handleDeleteBlockoutDate = date => {
    const {
      match: {
        params: { personnelId }
      },
      deleteBlockoutDate
    } = this.props;
    deleteBlockoutDate(personnelId, date);
  };

  showErrors = () => {
    const { errors } = this.props;

    return (
      <Row className="my-2 flex-column">
        <Col>
          <Alert color="danger" className="w-100">
            {errors.map(error => {
              return <p key={error}>{error}</p>;
            })}
          </Alert>
        </Col>
      </Row>
    );
  };

  render() {
    const {
      match: {
        params: { personnelId }
      },
      personnels,
      statuses,
      statusIds,
      actionInProgress,
      errors
    } = this.props;
    const { activeTab } = this.state;

    const person = personnels[personnelId];
    return (
      <>
        <Container>
          <Row className="my-2 justify-content-center align-items-center">
            <Col>
              <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem tag={Link} to="/personnels">
                  Personnels
                </BreadcrumbItem>
                <BreadcrumbItem active tag="span">
                  Details
                </BreadcrumbItem>
                <BreadcrumbItem active tag="span">
                  {person.name}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          {errors.length > 0 && this.showErrors()}
          {actionInProgress && <ActionAlert name="Action" />}
          <Row className="my-2 align-items-center">
            <Col>
              <h1>Details</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="text-danger">
                Note: Status and blockout dates that expired will be
                automatically removed
              </p>
            </Col>
          </Row>

          <Tabs activeTab={activeTab} setTab={this.setTab} />
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Details
                name={person.name}
                rank={person.rank}
                platoon={person.platoon}
                eventsDate={person.eventsDate || ['None']}
              />
            </TabPane>
            <TabPane tabId="2">
              <AddStatus
                statusIds={statusIds}
                statuses={statuses}
                handleAdd={this.handleAddStatus}
              />
              <DeletePersonnelStatus
                onDelete={this.handleDeleteStatus}
                statuses={person.statuses}
              />
            </TabPane>
            <TabPane tabId="3">
              <AddBlockout handleAdd={this.handleAddBlockoutDate} />
              <BlockoutDetails
                blockoutDates={person.blockOutDates}
                handleDelete={this.handleDeleteBlockoutDate}
              />
            </TabPane>
          </TabContent>
        </Container>
      </>
    );
  }
}

Single.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      personnelId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  personnels: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  statuses: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    })
  }).isRequired,
  statusIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  addPersonnelStatus: PropTypes.func.isRequired,
  deletePersonnelStatus: PropTypes.func.isRequired,
  addBlockoutDate: PropTypes.func.isRequired,
  deleteBlockoutDate: PropTypes.func.isRequired,
  actionInProgress: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  personnels: state.personnels.get('personnels'),
  statuses: state.statuses.get('statuses'),
  statusIds: state.statuses.get('ids'),
  actionInProgress: state.pages.personnels.single.get('actionInProgress'),
  errors: state.pages.personnels.single.get('errors')
});

const mapDispatchToProps = {
  addPersonnelStatus: addStatus,
  deletePersonnelStatus: deleteStatus,
  addBlockoutDate: addBlockout,
  deleteBlockoutDate: deleteBlockout
};

export default connect(mapStateToProps, mapDispatchToProps)(Single);
