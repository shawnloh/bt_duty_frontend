import React, { memo, useCallback } from 'react';
import { Container, Col, Row, Button, Alert, Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

import { addPoint, deletePoint, updatePoint } from './actions';
import { getPoints } from './selectors';

import Layout from '../shared/AppLayout';
import PointsTable from '../../components/points/PointsTable';

export function Points() {
  const dispatch = useDispatch();
  const pointsById = useSelector(state => state.points.get('points'));
  const points = useSelector(getPoints);
  const errors = useSelector(state => state.pages.points.get('errors'));
  const actionInProgress = useSelector(state =>
    state.pages.points.get('actionInProgress')
  );

  const handleUpdate = useCallback(
    id => {
      async function showModal() {
        const selectedPoint = pointsById.get(id);
        const result = await Swal.fire({
          title: `Enter a new point name for ${selectedPoint.get('name')}`,
          input: 'text',
          inputValue: '',
          inputPlaceholder: selectedPoint.get('name'),
          showCancelButton: true,
          confirmButtonText: 'Update',
          confirmButtonColor: '#28a745',
          cancelButtonText: 'Cancel',
          cancelButtonColor: '#007bff',
          reverseButtons: true,
          inputValidator: value => {
            if (!value) {
              return 'Updating a point name cannot be empty';
            }
            return null;
          }
        });
        if (result.value) {
          dispatch(updatePoint(id, result.value));
        }
      }
      showModal();
    },
    [dispatch, pointsById]
  );

  const handleDelete = useCallback(
    id => {
      async function showModal() {
        const selectedPoint = pointsById.get(id);
        const result = await Swal.fire({
          title: `Are you sure you want to delete ${selectedPoint.get(
            'name'
          )}?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#dc3545',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
          reverseButtons: true
        });
        if (result.value) {
          dispatch(deletePoint(id));
        }
      }
      showModal();
    },
    [dispatch, pointsById]
  );

  const handleAdd = useCallback(() => {
    async function showModal() {
      const result = await Swal.fire({
        title: 'Enter a new point name',
        input: 'text',
        inputValue: '',
        showCancelButton: true,
        confirmButtonText: 'Add',
        confirmButtonColor: '#28a745',
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#007bff',
        reverseButtons: true,
        inputValidator: value => {
          if (!value) {
            return 'Name cannot be empty';
          }
          return null;
        }
      });
      if (result.value) {
        dispatch(addPoint(result.value));
      }
    }
    showModal();
  }, [dispatch]);

  return (
    <Layout>
      <Helmet>
        <title>Points</title>
      </Helmet>
      <Container>
        {errors.size > 0 && (
          <Row>
            {errors.map(error => {
              return (
                <Alert key={error} color="danger" className="w-100">
                  {error}
                </Alert>
              );
            })}
          </Row>
        )}
        {actionInProgress !== 0 && (
          <Row>
            <Alert color="primary" className="w-100">
              {actionInProgress} action(s) in progress{' '}
              <Spinner color="primary" size="sm" />
            </Alert>
          </Row>
        )}
        <Row className="my-2 d-flex justify-content-center align-items-center">
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
