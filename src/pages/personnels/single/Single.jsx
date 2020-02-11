import React, { useState, memo, useMemo } from 'react';
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
import { Helmet } from 'react-helmet';
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
import useReduxPageSelector from '../../../hooks/useReduxPageSelector';
import {
  useHandleAddStatus,
  useHandleDeleteStatus
} from './hooks/useHandleStatus';
import {
  useHandleAddBlockout,
  useHandleDeleteBlockout
} from './hooks/useHandleBlockout';
import { useHandleEditPoint } from './hooks/useHandlePoint';

import Details from '../../../components/personnels/single/Details';
import Tabs from '../../../components/personnels/single/Tabs';
import Status from '../../../components/personnels/single/Status';
import ActionAlert from '../../../components/commons/ActionAlert';
import BlockoutDetails from '../../../components/personnels/single/BlockoutDetails';
import PointsDetails from '../../../components/personnels/single/PointsDetails';

export function Single() {
  const params = useParams();
  const personId = params.personnelId;

  const [activeTab, setActiveTab] = useState('1');
  const statuses = useSelector(getStatuses);
  const personnels = useSelector(state => state.personnels.get('personnels'));
  const pages = useMemo(() => ['personnels', 'single'], []);
  const actionInProgress = useReduxPageSelector(pages, 'actionInProgress');
  const errors = useReduxPageSelector(pages, 'errors');
  const dispatch = useDispatch();
  const handleDeleteStatus = useHandleDeleteStatus(
    dispatch,
    deleteStatus,
    personId
  );
  const handleAddStatus = useHandleAddStatus(dispatch, addStatus, personId);
  const handleAddBlockout = useHandleAddBlockout(
    dispatch,
    addBlockout,
    personId
  );
  const handleDeleteBlockout = useHandleDeleteBlockout(
    dispatch,
    deleteBlockout,
    personId
  );
  const handleEditPoint = useHandleEditPoint(
    dispatch,
    editPersonnelPoint,
    personId
  );

  const person = personnels.get(personId);
  if (!person || person.size === 0) {
    return <Redirect to="/personnels" />;
  }
  return (
    <>
      <Helmet>
        <title>Personnel Details</title>
      </Helmet>
      <Container className="py-2">
        <Row className="justify-content-center align-items-center">
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
                  return (
                    <p className="mb-0" key={error}>
                      {error}
                    </p>
                  );
                })}
              </Alert>
            </Col>
          </Row>
        )}
        {actionInProgress !== 0 && (
          <Row>
            <Col>
              <ActionAlert name={`${actionInProgress} action(s)`} />
            </Col>
          </Row>
        )}
        <Row className="align-items-center">
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
        <Row>
          <Col>
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
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default memo(Single);
