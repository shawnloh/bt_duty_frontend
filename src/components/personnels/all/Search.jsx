import React from 'react';
import { InputGroup, Input, Button, InputGroupAddon } from 'reactstrap';
import PropTypes from 'prop-types';

const Search = ({ search, onChange, onClear }) => {
  return (
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
  );
};

Search.propTypes = {
  search: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
};

export default Search;
