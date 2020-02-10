import React, { useState, useCallback, useMemo, memo } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'reactstrap';
import Helmet from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import Swal from 'sweetalert2';

import PersonnelsTable from '../../../components/personnels/all/PersonnelsTable';
import Pagination from '../../../components/commons/Pagination';
import Search from '../../../components/personnels/all/Search';
// import PersonnelModalDelete from '../../../components/personnels/all/PersonnelModalDelete';

import { deletePersonnel } from './actions';
import { getPersonnels } from './selectors';

export function All() {
  const [rowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { path } = useRouteMatch();

  const personnels = useSelector(getPersonnels);
  const errors = useSelector(state => state.pages.personnels.all.get('errors'));
  const actionInProgress = useSelector(state =>
    state.pages.personnels.all.get('actionInProgress')
  );

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

  const handleDelete = useCallback(
    person => {
      Swal.fire({
        title: 'Are you sure?',
        html: `
        <p>You are deleting: ${person.get('name')}</p>
        <p>You won't be able to revert this!</p>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonColor: '#3085d6'
      }).then(result => {
        if (result.value) {
          dispatch(deletePersonnel(person.get('_id')));
        }
      });
    },
    [dispatch]
  );

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
        <Row className="my-2 justify-content-center align-items-center">
          <Col xs="9">
            <h1>Personnels</h1>
          </Col>
          <Col xs="3" className="d-flex justify-content-end">
            <Button tag={Link} to={`${path}/add`} color="success" size="md">
              Add
            </Button>
          </Col>
        </Row>
        <Row className="my-2 mx-1">
          <Search
            onChange={onChangeSearch}
            onClear={clearSearch}
            search={search}
          />
        </Row>
        <Row>
          <PersonnelsTable
            personnels={shownPersonnels}
            onDelete={handleDelete}
          />
        </Row>
        <Row className="justify-content-center align-items-center">
          <Pagination
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            totalPosts={personnels.size}
          />
        </Row>
      </Container>
    </>
  );
}

export default memo(All);
