import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const AddForm = ({
  handleSubmit,
  handleChange,
  rank,
  ranks,
  rankIds,
  platoon,
  platoons,
  platoonIds,
  name,
  disabled = false
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="nameInput">Name</Label>
        <Input
          type="text"
          name="name"
          id="nameInput"
          placeholder="John"
          invalid={name === ''}
          valid={name !== ''}
          value={name}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="rankSelect">Rank</Label>
        <Input
          type="select"
          name="rank"
          id="rankSelect"
          onChange={handleChange}
          value={rank}
        >
          {rankIds.map(id => {
            return (
              <option value={id} key={id}>
                {ranks[id].name}
              </option>
            );
          })}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="platoonSelect">Platoon</Label>
        <Input
          type="select"
          name="platoon"
          id="platoonSelect"
          onChange={handleChange}
          value={platoon}
        >
          {platoonIds.map(id => {
            return (
              <option value={id} key={id}>
                {platoons[id].name}
              </option>
            );
          })}
        </Input>
      </FormGroup>
      <Button color="success" className="w-100" disabled={disabled}>
        Submit
      </Button>
    </Form>
  );
};

AddForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  rank: PropTypes.string.isRequired,
  ranks: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  rankIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  platoon: PropTypes.string.isRequired,
  platoons: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  platoonIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};
export default AddForm;
