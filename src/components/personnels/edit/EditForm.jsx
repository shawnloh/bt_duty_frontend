import React from 'react';
import {
  Label,
  FormGroup,
  FormFeedback,
  Input,
  Form,
  Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EditFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  rank: Yup.string().required('Rank is required'),
  platoon: Yup.string().required('Platoon is required')
});

const EditForm = ({
  person,
  handleSubmit,
  rankIds,
  ranks,
  platoonIds,
  platoons,
  isUpdating
}) => {
  const formik = useFormik({
    initialValues: {
      name: person.name,
      rank: person.rank._id,
      platoon: person.platoon._id
    },
    validationSchema: EditFormSchema,
    onSubmit: handleSubmit
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <Label for="nameInput">Name</Label>
        <Input
          type="text"
          name="name"
          id="nameInput"
          placeholder="John"
          invalid={
            formik.touched.name &&
            formik.errors.name &&
            formik.errors.name !== ''
          }
          value={formik.values.name}
          onChange={formik.handleChange}
          disabled={isUpdating}
        />
        {formik.touched.name && formik.errors.name ? (
          <FormFeedback>{formik.errors.name}</FormFeedback>
        ) : null}
      </FormGroup>
      <FormGroup>
        <Label for="rankSelect">Rank</Label>
        <Input
          type="select"
          name="rank"
          id="rankSelect"
          invalid={
            formik.touched.rank &&
            formik.errors.rank &&
            formik.errors.rank !== ''
          }
          onChange={formik.handleChange}
          value={formik.values.rank}
          disabled={isUpdating}
        >
          {rankIds.map(id => {
            return (
              <option value={id} key={id}>
                {ranks[id].name}
              </option>
            );
          })}
        </Input>
        {formik.touched.rank && formik.errors.rank ? (
          <FormFeedback>{formik.errors.rank}</FormFeedback>
        ) : null}
      </FormGroup>
      <FormGroup>
        <Label for="platoonSelect">Platoon</Label>
        <Input
          type="select"
          name="platoon"
          id="platoonSelect"
          disabled={isUpdating}
          invalid={
            formik.touched.platoon &&
            formik.errors.platoon &&
            formik.errors.platoon !== ''
          }
          onChange={formik.handleChange}
          value={formik.values.platoon}
        >
          {platoonIds.map(id => {
            return (
              <option value={id} key={id}>
                {platoons[id].name}
              </option>
            );
          })}
        </Input>
        {formik.touched.platoon && formik.errors.platoon ? (
          <FormFeedback>{formik.errors.platoon}</FormFeedback>
        ) : null}
      </FormGroup>
      <Button
        color="primary"
        type="submit"
        className="w-100"
        disabled={isUpdating}
      >
        Update
      </Button>
    </Form>
  );
};

EditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  person: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rank: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    platoon: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  ranks: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  rankIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  platoons: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  platoonIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  isUpdating: PropTypes.bool.isRequired
};

export default EditForm;
