import React, { useState, useCallback, memo } from 'react';
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
import { Link, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  addStatus,
  deleteStatus,
  addBlockout,
  deleteBlockout,
  editPersonnelPoint
} from './actions';
import { getStatuses } from './selectors';

import Details from '../../../components/personnels/single/Details';
import Tabs from '../../../components/personnels/single/Tabs';
import Status from '../../../components/personnels/single/Status';
import ActionAlert from '../../../components/commons/ActionAlert';
import BlockoutDetails from '../../../components/personnels/single/BlockoutDetails';
import PointsDetails from '../../../components/personnels/single/PointsDetails';

export function Single() {
  const params = useParams();

  const [activeTab, setActiveTab] = useState('1');
  const statuses = useSelector(getStatuses);
  const personnels = useSelector(state => state.personnels.get('personnels'));
  const actionInProgress = useSelector(state =>
    state.pages.personnels.single.get('actionInProgress')
  );
  const errors = useSelector(state =>
    state.pages.personnels.single.get('errors')
  );
  const dispatch = useDispatch();

  const handleDeleteStatus = useCallback(
    id => {
      dispatch(deleteStatus(params.personnelId, id));
    },
    [dispatch, params.personnelId]
  );

  const handleAddStatus = useCallback(
    ({ statusId, startDate, endDate }) => {
      dispatch(addStatus(params.personnelId, statusId, startDate, endDate));
    },
    [dispatch, params.personnelId]
  );

  const handleAddBlockout = useCallback(
    ({ startDate, endDate = null }) => {
      const date = {
        startDate
      };

      if (endDate) {
        date.endDate = endDate;
      }

      dispatch(addBlockout(params.personnelId, date));
    },
    [dispatch, params.personnelId]
  );

  const handleDeleteBlockout = useCallback(
    ({ startDate, endDate = null }) => {
      const date = {
        startDate
      };

      if (endDate) {
        date.endDate = endDate;
      }
      dispatch(deleteBlockout(params.personnelId, date));
    },
    [dispatch, params.personnelId]
  );

  const handleEditPoint = useCallback(
    (personnelPointId, newPoint) => {
      dispatch(
        editPersonnelPoint(params.personnelId, personnelPointId, newPoint)
      );
    },
    [dispatch, params.personnelId]
  );

  const person = personnels.get(params.personnelId);
  if (!person) {
    return <Redirect to="/personnels" />;
  }
  return (
    <Container>
      <Row className="my-2 justify-content-center align-items-center">
        <Col>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag={Link} to="/personnels">
              Personnels
            </BreadcrumbItem>
            <BreadcrumbItem tag="span">Details</BreadcrumbItem>
            <BreadcrumbItem active tag="span">
              {person.name}
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      {errors.size > 0 && (
        <Row className="my-2 flex-column">
          <Col>
            <Alert color="danger" className="w-100">
              {errors.map(error => {
                return <p key={error}>{error}</p>;
              })}
            </Alert>
          </Col>
        </Row>
      )}
      {actionInProgress !== 0 && (
        <ActionAlert name={`${actionInProgress} action(s)`} />
      )}
      <Row className="my-2 align-items-center">
        <Col>
          <h1>Details</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-danger">
            Note: Event dates, status and blockout dates that expired will be
            automatically removed
          </p>
        </Col>
      </Row>

      <Tabs activeTab={activeTab} setTab={setActiveTab} />
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Details
            name={person.get('name')}
            rank={person.getIn(['rank', 'name'])}
            platoon={person.getIn(['platoon', 'name'])}
            eventsDate={person.get('eventsDate')}
          />
        </TabPane>
        <TabPane tabId="2">
          <Status
            handleDelete={handleDeleteStatus}
            personStatuses={person.get('statuses')}
            statuses={statuses}
            handleAdd={handleAddStatus}
          />
        </TabPane>
        <TabPane tabId="3">
          <BlockoutDetails
            handleAdd={handleAddBlockout}
            blockoutDates={person.get('blockOutDates')}
            handleDelete={handleDeleteBlockout}
          />
        </TabPane>
        <TabPane tabId="4">
          <PointsDetails
            points={person.get('points')}
            handleEdit={handleEditPoint}
          />
        </TabPane>
      </TabContent>
    </Container>
  );
}

export default memo(Single);
