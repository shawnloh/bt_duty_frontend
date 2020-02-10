import React, { memo, useCallback, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Alert
} from 'reactstrap';
import { Link, Redirect, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { getPerson, getRanks, getPlatoons } from './selectors';
import EditForm from '../../../components/personnels/edit/EditForm';
import { updatePerson } from './actions';
import ActionAlert from '../../../components/commons/ActionAlert';
import usePrevious from '../../../hooks/usePrevious';

export function Edit() {
  const params = useParams();
  const person = useSelector(state => getPerson(state, params.personnelId));

  /**
   * initial setup
   */
  const isUpdating = useSelector(state =>
    state.pages.personnels.edit.get('isUpdating')
  );
  const prevUpdating = usePrevious(isUpdating);
  const errors = useSelector(state =>
    state.pages.personnels.edit.get('errors')
  );
  const ranks = useSelector(getRanks);
  const platoons = useSelector(getPlatoons);

  const dispatch = useDispatch();
  useEffect(() => {
    if (prevUpdating && !isUpdating && errors.size === 0) {
      Swal.fire({
        title: 'Updated!',
        text: 'Successfully Updated!',
        icon: 'success',
        timer: 2000
      });
    }
  }, [errors.size, isUpdating, prevUpdating]);

  const handleEdit = useCallback(
    values => {
      const personToUpdate = {
        ...values,
        personnelId: params.personnelId
      };
      dispatch(updatePerson(personToUpdate));
    },
    [dispatch, params.personnelId]
  );
  /**
   * if there is no person found, redirect back to
   * personnels page
   */
  if (!person || person.size === 0) {
    return <Redirect to="/personnels" />;
  }

  return (
    <Container>
      <Row className="my-2 justify-content-center align-items-center">
        <Col>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag={Link} to="/personnels">
              Personnels
            </BreadcrumbItem>
            <BreadcrumbItem tag="span">Details</BreadcrumbItem>
            <BreadcrumbItem tag={Link} to={`/personnels/${params.personnelId}`}>
              {person.get('name')}
            </BreadcrumbItem>
            <BreadcrumbItem active tag="span">
              Edit Details
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      {errors.size > 0 && (
        <Row className="my-2 flex-column">
          <Col>
            <Alert color="danger" className="w-100">
              {errors.map(error => {
                return <p key={error}>{error}</p>;
              })}
            </Alert>
          </Col>
        </Row>
      )}
      {isUpdating && <ActionAlert name="Updating" />}
      <Row>
        <Col>
          <h1>Editing {person.get('name')}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <EditForm
            handleSubmit={handleEdit}
            person={person}
            platoons={platoons}
            ranks={ranks}
            isUpdating={isUpdating}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default memo(Edit);
