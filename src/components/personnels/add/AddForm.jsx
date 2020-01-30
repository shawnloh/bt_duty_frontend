import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  rank: Yup.string().required('Rank is required'),
  platoon: Yup.string().required('Platoon is required')
});

const AddForm = ({ handleSubmit, ranks, rankIds, platoons, platoonIds }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      rank: rankIds[0] || '',
      platoon: platoonIds[0] || ''
    },
    validationSchema: AddFormSchema,
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
        color="success"
        className="w-100"
        disabled={formik.isSubmitting}
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

AddForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  ranks: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  rankIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  platoons: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  platoonIds: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default AddForm;
