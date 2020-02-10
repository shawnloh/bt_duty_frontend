import React, { memo, useCallback } from 'react';
import { Container, Col, Row, Button, Alert, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

import Layout from '../shared/AppLayout';
import StatusesTable from '../../components/statuses/StatusesTable';

import { getStatuses } from './selectors';
import { addStatus, deleteStatus, updateStatus } from './actions';

export function Statuses() {
  const dispatch = useDispatch();
  const statusesById = useSelector(state => state.statuses.get('statuses'));
  const statuses = useSelector(getStatuses);
  const errors = useSelector(state => state.pages.statuses.get('errors'));
  const actionInProgress = useSelector(state =>
    state.pages.statuses.get('actionInProgress')
  );

  const handleUpdate = useCallback(
    id => {
      async function showModal() {
        const selectedStatus = statusesById.get(id);
        const result = await Swal.fire({
          title: `Enter a new status name for ${selectedStatus.get('name')}`,
          input: 'text',
          inputValue: '',
          inputPlaceholder: selectedStatus.get('name'),
          showCancelButton: true,
          confirmButtonText: 'Update',
          confirmButtonColor: '#28a745',
          cancelButtonText: 'Cancel',
          cancelButtonColor: '#007bff',
          reverseButtons: true,
          inputValidator: value => {
            if (!value) {
              return 'Updating a status name cannot be empty';
            }
            return null;
          }
        });
        if (result.value) {
          dispatch(updateStatus(id, result.value));
        }
      }
      showModal();
    },
    [dispatch, statusesById]
  );

  const handleDelete = useCallback(
    id => {
      async function showModal() {
        const selectedStatus = statusesById.get(id);
        const result = await Swal.fire({
          title: `Are you sure you want to delete ${selectedStatus.get(
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
          dispatch(deleteStatus(id));
        }
      }
      showModal();
    },
    [dispatch, statusesById]
  );

  const handleAdd = useCallback(() => {
    async function showModal() {
      const result = await Swal.fire({
        title: 'Enter a new status name',
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
        dispatch(addStatus(result.value));
      }
    }
    showModal();
  }, [dispatch]);

  return (
    <Layout>
      <Helmet>
        <title>Statuses</title>
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
            <h1>Statuses</h1>
          </Col>
          <Col xs="3" className="d-flex justify-content-end">
            <Button color="success" size="md" onClick={handleAdd}>
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <StatusesTable
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              statuses={statuses}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default memo(Statuses);
