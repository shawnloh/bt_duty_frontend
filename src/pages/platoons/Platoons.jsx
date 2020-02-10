import React, { useCallback, memo } from 'react';
import { Container, Col, Row, Button, Alert, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import { getPlatoons } from './selectors';

import Layout from '../shared/AppLayout';
import PlatoonsTable from '../../components/platoons/PlatoonsTable';

import { addPlatoon, deletePlatoon, updatePlatoon } from './actions';

export function Platoons() {
  const dispatch = useDispatch();
  const platoonsById = useSelector(state => state.platoons.get('platoons'));
  const platoons = useSelector(getPlatoons);
  const errors = useSelector(state => state.pages.platoons.get('errors'));
  const actionInProgress = useSelector(state =>
    state.pages.platoons.get('actionInProgress')
  );
  const handleUpdate = useCallback(
    id => {
      async function showModal() {
        const selectedPlatoon = platoonsById.get(id);
        const result = await Swal.fire({
          title: `Enter a new platoon name for ${selectedPlatoon.get('name')}`,
          input: 'text',
          inputValue: '',
          inputPlaceholder: selectedPlatoon.get('name'),
          showCancelButton: true,
          confirmButtonText: 'Update',
          confirmButtonColor: '#28a745',
          cancelButtonText: 'Cancel',
          cancelButtonColor: '#007bff',
          reverseButtons: true,
          inputValidator: value => {
            if (!value) {
              return 'Updating a platoon name cannot be empty';
            }
            return null;
          }
        });
        if (result.value) {
          dispatch(updatePlatoon(id, result.value));
        }
      }
      showModal();
    },
    [dispatch, platoonsById]
  );

  const handleDelete = useCallback(
    id => {
      async function showModal() {
        const selectedPlatoon = platoonsById.get(id);
        const result = await Swal.fire({
          title: `Are you sure you want to delete ${selectedPlatoon.get(
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
          dispatch(deletePlatoon(id));
        }
      }
      showModal();
    },
    [dispatch, platoonsById]
  );

  const handleAdd = useCallback(() => {
    async function showModal() {
      const result = await Swal.fire({
        title: 'Enter a new platoon name',
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
        dispatch(addPlatoon(result.value));
      }
    }
    showModal();
  }, [dispatch]);

  return (
    <Layout>
      <Helmet>
        <title>Platoons</title>
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
            <h1>Platoons</h1>
          </Col>
          <Col xs="3" className="d-flex justify-content-end">
            <Button color="success" size="md" onClick={handleAdd}>
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <PlatoonsTable
              platoons={platoons}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default memo(Platoons);
