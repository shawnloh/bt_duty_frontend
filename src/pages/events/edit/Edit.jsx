import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams, Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  Button
} from 'reactstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import moment from 'moment-timezone';
import { getPersonnels, getEventById } from './selectors';
import { updateEvent } from './actions';
import Layout from '../../shared/AppLayout';
import useSelectPersonnelsOptionsByDate from '../hooks/useSelectPersonnelsOptionsByDate';
import useHandleSetPersonnels from '../hooks/useHandleSetPersonnels';
import useSuccessUpdatedModal from '../../../hooks/useSuccessModal';
import useErrorModal from '../../../hooks/useErrorModal';
import useReduxPageSelector from '../../../hooks/useReduxPageSelector';
import usePrevious from '../../../hooks/usePrevious';

const animatedComponents = makeAnimated();

export function Edit() {
  const params = useParams();
  const history = useHistory();
  const showSuccessModal = useSuccessUpdatedModal(
    'Successfully Updated!',
    2000
  );
  const showErrorModal = useErrorModal(
    'You cannot save with empty personnel',
    2000
  );
  const dispatch = useDispatch();
  const allPersonnelsList = useSelector(getPersonnels);
  const personnelsbyId = useSelector(state =>
    state.personnels.get('personnels')
  );
  const event = useSelector(state => getEventById(state, params.eventId));
  const errors = useReduxPageSelector(['events', 'edit'], 'errors');
  const isUpdating = useReduxPageSelector(['events', 'edit'], 'isUpdating');
  const prevUpdating = usePrevious(isUpdating);

  useEffect(() => {
    if (prevUpdating && !isUpdating && errors.size === 0) {
      showSuccessModal();
    }
  }, [errors.size, isUpdating, prevUpdating, showSuccessModal]);

  const currentEventPersonnels = useMemo(
    () =>
      event
        .get('personnels')
        .map(eventPersonnel => {
          const id = eventPersonnel.get('_id');
          const person = personnelsbyId.get(id);
          return {
            value: id,
            label: `${person.getIn(['platoon', 'name'])} ${person.getIn([
              'rank',
              'name'
            ])} ${person.get('name')}`
          };
        })
        .toArray(),
    [personnelsbyId, event]
  );

  const date = useMemo(
    () => moment(event.get('date'), 'DD-MM-YYYY', true).format('DDMMYY'),
    [event]
  );

  const personnelsOption = useSelectPersonnelsOptionsByDate(
    date,
    allPersonnelsList,
    currentEventPersonnels
  );

  const [personnels, setPersonnels] = useState(currentEventPersonnels);
  const handleOnChange = useHandleSetPersonnels(date, setPersonnels);

  const handleCancel = useCallback(() => {
    if (history.length > 1) {
      return history.goBack();
    }
    return history.replace(`/events/${params.eventId}`);
  }, [history, params.eventId]);

  const handleSave = useCallback(() => {
    if (personnels.length === 0) {
      return showErrorModal();
    }
    const newPersonnels = personnels.map(person => person.value);
    return dispatch(updateEvent(params.eventId, newPersonnels));
  }, [dispatch, params.eventId, personnels, showErrorModal]);

  if (!event || event.size === 0) {
    return <Redirect to="/events" />;
  }

  return (
    <Layout>
      <Helmet />
      <Container className="py-2">
        <Row>
          <Col>
            <Breadcrumb tag="nav">
              <BreadcrumbItem tag={Link} to="/events">
                Events
              </BreadcrumbItem>
              <BreadcrumbItem tag="span">Details</BreadcrumbItem>
              <BreadcrumbItem tag={Link} to={`/events/${params.eventId}`}>
                {event.get('name')}
              </BreadcrumbItem>
              <BreadcrumbItem active tag="span">
                Edit
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped responsive>
              <tbody>
                <tr>
                  <th className="text-center">Event Name</th>
                  <td className="text-center">{event.get('name')}</td>
                </tr>
                <tr>
                  <th className="text-center">Event date</th>
                  <td className="text-center">{event.get('date')}</td>
                </tr>
                <tr>
                  <th className="text-center">Points allocation</th>
                  <td className="text-center">
                    {event.get('pointsAllocation')}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="mb-0">Personnels:</p>
            <Select
              options={personnelsOption}
              components={animatedComponents}
              isMulti
              id="selectedPersonnels"
              name="selectedPersonnels"
              placeholder="Select Personnels.."
              // value={getSelectedPersonnelsValues}
              value={personnels}
              onChange={handleOnChange}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mt-2">
            <Button onClick={handleCancel} color="primary" className="w-100">
              Cancel
            </Button>
          </Col>
          <Col md="6" className="mt-2">
            <Button color="success" className="w-100" onClick={handleSave}>
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Edit;
