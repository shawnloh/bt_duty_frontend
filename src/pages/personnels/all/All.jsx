import React, { useState, useCallback, useMemo, memo } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'reactstrap';
import Helmet from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import PersonnelsTable from '../../../components/personnels/all/PersonnelsTable';
import Pagination from '../../../components/commons/Pagination';
import Search from '../../../components/personnels/all/Search';
// import PersonnelModalDelete from '../../../components/personnels/all/PersonnelModalDelete';

import { deletePersonnel } from './actions';
import { getPersonnels } from './selectors';
import useReduxPageSelector from '../../../hooks/useReduxPageSelector';
import useDeleteModal from '../../../hooks/useDeleteModal';

export function All() {
  const [rowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { path } = useRouteMatch();

  const personnels = useSelector(getPersonnels);
  const pages = useMemo(() => ['personnels', 'all'], []);
  const errors = useReduxPageSelector(pages, 'errors');
  const actionInProgress = useReduxPageSelector(pages, 'actionInProgress');

  const dispatch = useDispatch();

  const onChangeSearch = useCallback(
    ({ target: { value } }) => {
      setSearch(value);
      if (page !== 1) setPage(1);
    },
    [page]
  );
  const clearSearch = useCallback(() => {
    setSearch('');
  }, []);

  const handleDelete = useDeleteModal(dispatch, deletePersonnel);

  const lastIndex = page * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const shownPersonnels = useMemo(() => {
    if (search === '') {
      return personnels.slice(firstIndex, lastIndex);
    }
    const searchInput = search.toLowerCase();
    const filteredPersonnels = personnels.filter(person => {
      const name = person.get('name').toLowerCase();
      const platoon = person.getIn(['platoon', 'name']).toLowerCase();
      const rank = person.getIn(['rank', 'name']).toLowerCase();
      return (
        name.indexOf(searchInput) > -1 ||
        platoon.indexOf(searchInput) > -1 ||
        rank.indexOf(searchInput) > -1
      );
    });

    return filteredPersonnels.slice(firstIndex, lastIndex);
  }, [firstIndex, lastIndex, personnels, search]);

  return (
    <>
      <Helmet>
        <title>Personnels</title>P
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
            <h1>Personnels</h1>
          </Col>
          <Col xs="3" className="d-flex justify-content-end">
            <Button tag={Link} to={`${path}/add`} color="success" size="md">
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Search
              onChange={onChangeSearch}
              onClear={clearSearch}
              search={search}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <PersonnelsTable
              personnels={shownPersonnels}
              onDelete={handleDelete}
            />
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col>
            <Pagination
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              totalPosts={personnels.size}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default memo(All);
