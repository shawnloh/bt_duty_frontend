import React, { memo } from 'react';
import { Container, Col, Row, Button, Alert, Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';

import { addPoint, deletePoint, updatePoint } from './actions';
import { getPoints } from './selectors';

import Layout from '../shared/AppLayout';
import PointsTable from '../../components/points/PointsTable';
import useReduxPageSelector from '../../hooks/useReduxPageSelector';
import useUpdateModal from '../../hooks/useUpdateModal';
import useAddModal from '../../hooks/useAddModal';
import useDeleteModal from '../../hooks/useDeleteModal';

export function Points() {
  const dispatch = useDispatch();
  const points = useSelector(getPoints);
  const errors = useReduxPageSelector('points', 'errors');
  const actionInProgress = useReduxPageSelector('points', 'actionInProgress');
  const handleAdd = useAddModal(dispatch, addPoint, 'point system');
  const handleUpdate = useUpdateModal(dispatch, updatePoint, 'point system');
  const handleDelete = useDeleteModal(dispatch, deletePoint);

  return (
    <Layout>
      <Helmet>
        <title>Points</title>
      </Helmet>
      <Container className="py-2">
        {errors.size > 0 && (
          <Row>
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
              <Alert color="primary" className="w-100">
                {actionInProgress} action(s) in progress{' '}
                <Spinner color="primary" size="sm" />
              </Alert>
            </Col>
          </Row>
        )}
        <Row className="justify-content-center align-items-center">
          <Col xs="9">
            <h1>Points System</h1>
          </Col>
          <Col xs="3" className="d-flex justify-content-end">
            <Button color="success" size="md" onClick={handleAdd}>
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <PointsTable
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              points={points}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default memo(Points);
