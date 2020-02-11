import React, { memo } from 'react';
import { Container, Col, Row, Button, Alert, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getPlatoons } from './selectors';

import Layout from '../shared/AppLayout';
import PlatoonsTable from '../../components/platoons/PlatoonsTable';

import { addPlatoon, deletePlatoon, updatePlatoon } from './actions';
import useReduxPageSelector from '../../hooks/useReduxPageSelector';
import useUpdateModal from '../../hooks/useUpdateModal';
import useDeleteModal from '../../hooks/useDeleteModal';
import useAddModal from '../../hooks/useAddModal';

export function Platoons() {
  const dispatch = useDispatch();
  const platoons = useSelector(getPlatoons);
  const errors = useReduxPageSelector('platoons', 'errors');
  const actionInProgress = useReduxPageSelector('platoons', 'actionInProgress');
  const handleAdd = useAddModal(dispatch, addPlatoon, 'platoon');
  const handleUpdate = useUpdateModal(dispatch, updatePlatoon, 'platoon');
  const handleDelete = useDeleteModal(dispatch, deletePlatoon);

  return (
    <Layout>
      <Helmet>
        <title>Platoons</title>
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
            <h1>Platoons</h1>
          </Col>
          <Col xs="3" className="d-flex justify-content-end">
            <Button color="success" size="md" onClick={handleAdd}>
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
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
