import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import UserRepository from './UserRepository';

const UserSelect = ({
  isDisabled, value, onChange, placeholder,
}) => {
  UserSelect.defaultProps = {
    isDisabled: false,
  };
  const getOptionLabel = (option) => {
    const { firstName, lastName } = option;
    return `${firstName} ${lastName}`;
  };
  const getOptionValue = (option) => option.id;
  const loadOptions = (inputValue) => UserRepository.index(inputValue).then(({ data }) => data.items);
  useEffect(() => {
    loadOptions();
  }, []);

  return (
    <div>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        isDisabled={isDisabled}
        defaultValue={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
UserSelect.propTypes = {
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
};
export default UserSelect;
