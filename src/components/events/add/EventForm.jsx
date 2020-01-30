import React from 'react';
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  FormText,
  Spinner,
  Button,
  FormFeedback
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GenerateForm from './GenerateForm';

const EventFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3)
    .max(50)
    .required('Name is required'),
  date: Yup.string()
    .required('Date is required')
    .test('checkValidDate', 'Invalid date, only DDMMYY is allowed', date => {
      return moment(date, 'DDMMYY', true).isValid();
    }),
  pointSystem: Yup.string().required('Point System is required'),
  pointAllocation: Yup.number()
    .min(1, 'Minimum of 1 point is needed')
    .required('Point Allocation is required'),
  selectedPersonnels: Yup.array()
    .min(1, 'At least 1 personnels is required')
    .required('Personnel is required')
});

const EventForm = ({
  points,
  pointIds,
  platoonIds,
  platoons,
  rankIds,
  ranks,
  statusIds,
  statuses,
  personnels,
  isAdding,
  handleSubmit
}) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      date: '',
      pointSystem: pointIds[0] || '',
      pointAllocation: 1,
      selectedPersonnels: []
    },
    validationSchema: EventFormSchema,
    onSubmit: handleSubmit
  });

  const setSelectedPersonnels = personnelsToSet => {
    formik.setFieldValue('selectedPersonnels', personnelsToSet);
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              type="text"
              name="name"
              id="Name"
              placeholder="Name of the event"
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              invalid={
                formik.touched.name &&
                formik.errors.name &&
                formik.errors.name !== ''
              }
            />
            {formik.touched.name && formik.errors.name ? (
              <FormFeedback>{formik.errors.name}</FormFeedback>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="PointSystem">Point System</Label>
            <Input
              type="select"
              name="pointSystem"
              id="PointSystem"
              value={formik.values.pointSystem}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              invalid={
                formik.touched.pointSystem &&
                formik.errors.pointSystem &&
                formik.errors.pointSystem !== ''
              }
            >
              {pointIds.map(id => (
                <option key={id} value={id}>
                  {points[id].name}
                </option>
              ))}
            </Input>
            {formik.touched.pointSystem && formik.errors.pointSystem ? (
              <FormFeedback>{formik.errors.pointSystem}</FormFeedback>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="Date">Date</Label>
            <Input
              type="text"
              name="date"
              id="Date"
              disabled={formik.isSubmitting}
              placeholder={`e.g. ${moment()
                .tz('Asia/Singapore')
                .format('DDMMYY')}`}
              onChange={formik.handleChange}
              value={formik.values.date}
              invalid={
                formik.touched.date &&
                formik.errors.date &&
                formik.errors.date !== ''
              }
            />
            {formik.touched.date && formik.errors.date ? (
              <FormFeedback>{formik.errors.date}</FormFeedback>
            ) : null}
            <FormText color="muted">
              Must be in DDMMYY format, it will automatically convert to
              DD-MM-YYYY during submission
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="PointAllocation">Point Allocation</Label>
            <Input
              type="number"
              name="pointAllocation"
              disabled={formik.isSubmitting}
              id="PointAllocation"
              onChange={formik.handleChange}
              value={formik.values.pointAllocation}
              invalid={
                formik.touched.pointAllocation &&
                formik.errors.pointAllocation &&
                formik.errors.pointAllocation !== ''
              }
            />
            <FormText color="muted">
              Min of 1 is needed to create event
            </FormText>
            {formik.touched.pointAllocation && formik.errors.pointAllocation ? (
              <FormFeedback>{formik.errors.pointAllocation}</FormFeedback>
            ) : null}
          </FormGroup>
        </Col>
      </Row>

      {formik.touched.selectedPersonnels && formik.errors.selectedPersonnels ? (
        <Row>
          <Col>
            <p className="text-danger">{formik.errors.selectedPersonnels}</p>
          </Col>
        </Row>
      ) : null}

      <Row>
        <Col className="d-flex justify-content-start align-items-center">
          <p className="font-weight-bold">
            Total Selected: {formik.values.selectedPersonnels.length}
          </p>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <GenerateForm
            platoonIds={platoonIds}
            platoons={platoons}
            rankIds={rankIds}
            ranks={ranks}
            statusIds={statusIds}
            statuses={statuses}
            setSelectedPersonnels={setSelectedPersonnels}
            pointSystem={formik.values.pointSystem}
            date={formik.values.date}
          />
        </Col>
      </Row>
      <Row className="my-2">
        <Col className="overflow-auto" style={{ maxHeight: '150px' }}>
          {formik.values.selectedPersonnels.map(id => {
            const person = personnels[id];
            return (
              <Row key={id}>
                <Col>
                  <p>
                    {person.platoon.name} {person.rank.name} {person.name}
                  </p>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          {formik.isSubmitting || isAdding ? (
            <>
              <Spinner color="primary" />
              <p>Adding...</p>
            </>
          ) : (
            <Button
              size="lg"
              className="w-100"
              color="success"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Create
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
};

EventForm.propTypes = {
  points: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  pointIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  ranks: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  rankIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  platoons: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  platoonIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  statuses: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  statusIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  personnels: PropTypes.shape({
    id: PropTypes.shape({
      name: PropTypes.string.isRequired,
      rank: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired,
      platoon: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    })
  }).isRequired,
  isAdding: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default EventForm;
