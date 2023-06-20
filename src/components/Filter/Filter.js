import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ onChangeFilter, filter }) => {
  return (
    <div className={css.searchContainer}>
      <label className={css.searchLabel}>
        find contact by name
        <input
          type="text"
          className={css.searchInput}
          onChange={onChangeFilter}
          value={filter}
        ></input>
      </label>
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};