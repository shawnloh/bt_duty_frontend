import React, { useCallback, memo } from 'react';
import { Container, Col, Row, Button, Alert, Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

import { getRanks } from './selectors';

import Layout from '../shared/AppLayout';
import RanksTable from '../../components/ranks/RanksTable';

import { addRank, deleteRank, updateRank } from './actions';

export function Ranks() {
  const dispatch = useDispatch();
  const ranksById = useSelector(state => state.ranks.get('ranks'));
  const ranks = useSelector(getRanks);
  const errors = useSelector(state => state.pages.ranks.get('errors'));
  const actionInProgress = useSelector(state =>
    state.pages.ranks.get('actionInProgress')
  );

  const handleUpdate = useCallback(
    id => {
      async function showModal() {
        const selectedRank = ranksById.get(id);
        const result = await Swal.fire({
          title: `Enter a new rank name for ${selectedRank.get('name')}`,
          input: 'text',
          inputValue: '',
          inputPlaceholder: selectedRank.get('name'),
          showCancelButton: true,
          confirmButtonText: 'Update',
          confirmButtonColor: '#28a745',
          cancelButtonText: 'Cancel',
          cancelButtonColor: '#007bff',
          reverseButtons: true,
          inputValidator: value => {
            if (!value) {
              return 'Updating a rank name cannot be empty';
            }
            return null;
          }
        });
        if (result.value) {
          dispatch(updateRank(id, result.value));
        }
      }
      showModal();
    },
    [dispatch, ranksById]
  );

  const handleDelete = useCallback(
    id => {
      async function showModal() {
        const selectedRank = ranksById.get(id);
        const result = await Swal.fire({
          title: `Are you sure you want to delete ${selectedRank.get('name')}?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#dc3545',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
          reverseButtons: true
        });
        if (result.value) {
          dispatch(deleteRank(id));
        }
      }
      showModal();
    },
    [dispatch, ranksById]
  );

  const handleAdd = useCallback(() => {
    async function showModal() {
      const result = await Swal.fire({
        title: 'Enter a new rank name',
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
        dispatch(addRank(result.value));
      }
    }
    showModal();
  }, [dispatch]);

  return (
    <Layout>
      <Helmet>
        <title>Ranks</title>
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
            <h1>Ranks</h1>
          </Col>
          <Col xs="3" className="d-flex justify-content-end">
            <Button color="success" size="md" onClick={handleAdd}>
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <RanksTable
              ranks={ranks}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default memo(Ranks);
