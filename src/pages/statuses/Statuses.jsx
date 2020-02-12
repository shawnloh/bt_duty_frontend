import React, { memo, useState } from 'react';
import { Container, Col, Row, Button, Alert, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import useUpdateModal from '../../hooks/useUpdateModal';
import useAddModal from '../../hooks/useAddModal';
import useDeleteModal from '../../hooks/useDeleteModal';
import useReduxPageSelector from '../../hooks/useReduxPageSelector';

import Layout from '../shared/AppLayout';
import StatusesTable from '../../components/statuses/StatusesTable';
import Pagination from '../../components/commons/Pagination';

import { getStatuses } from './selectors';
import { addStatus, deleteStatus, updateStatus } from './actions';

export function Statuses() {
  const [rowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const statuses = useSelector(getStatuses);
  const errors = useReduxPageSelector('statuses', 'errors');
  const actionInProgress = useReduxPageSelector('statuses', 'actionInProgress');

  const handleAdd = useAddModal(dispatch, addStatus, 'status');
  const handleUpdate = useUpdateModal(dispatch, updateStatus, 'status');
  const handleDelete = useDeleteModal(dispatch, deleteStatus);

  const lastIndex = page * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const shownStatuses = statuses.slice(firstIndex, lastIndex);

  return (
    <Layout>
      <Helmet>
        <title>Statuses</title>
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
            <h1>Statuses</h1>
          </Col>
          <Col xs="3" className="d-flex justify-content-end">
            <Button color="success" size="md" onClick={handleAdd}>
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <StatusesTable
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              statuses={shownStatuses}
            />
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col>
            <Pagination
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              totalPosts={statuses.size}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default memo(Statuses);
