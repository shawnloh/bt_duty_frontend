import React, { memo } from 'react';
import { Container, Col, Row, Button, Alert, Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';

import { getRanks } from './selectors';

import Layout from '../shared/AppLayout';
import RanksTable from '../../components/ranks/RanksTable';
import useUpdateModal from '../../hooks/useUpdateModal';
import useAddModal from '../../hooks/useAddModal';
import useDeleteModal from '../../hooks/useDeleteModal';
import useReduxPageSelector from '../../hooks/useReduxPageSelector';

import { addRank, deleteRank, updateRank } from './actions';

export function Ranks() {
  const dispatch = useDispatch();
  const ranks = useSelector(getRanks);
  const errors = useReduxPageSelector('ranks', 'errors');
  const actionInProgress = useReduxPageSelector('ranks', 'actionInProgress');
  const handleAdd = useAddModal(dispatch, addRank, 'rank');
  const handleUpdate = useUpdateModal(dispatch, updateRank, 'rank');
  const handleDelete = useDeleteModal(dispatch, deleteRank);

  return (
    <Layout>
      <Helmet>
        <title>Ranks</title>
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
            <h1>Ranks</h1>
          </Col>
          <Col xs="3" className="d-flex justify-content-end">
            <Button color="success" size="md" onClick={handleAdd}>
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
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
