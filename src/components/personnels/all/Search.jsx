import React, { memo } from 'react';
import {
  InputGroup,
  Input,
  Button,
  InputGroupAddon,
  FormGroup
} from 'reactstrap';
import PropTypes from 'prop-types';

const Search = ({ search, onChange, onClear }) => {
  return (
    <FormGroup>
      <InputGroup>
        <Input placeholder="search..." value={search} onChange={onChange} />
        {search !== '' && (
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={onClear}>
              Clear
            </Button>
          </InputGroupAddon>
        )}
      </InputGroup>
    </FormGroup>
  );
};

Search.propTypes = {
  search: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
};

export default memo(Search);
