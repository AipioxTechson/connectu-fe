import React from "react";
import AsyncSelect from "react-select/async";

import styles from "../styles/components/Autocomplete.module.css";

const Autocomplete = ({ name, options, onSelect, onSearch, props }) => {
  const loadOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(onSearch(inputValue));
      }, 1000);
    });

  return (
    <AsyncSelect
      name={name}
      cacheOptions
      defaultOptions={options}
      loadOptions={loadOptions}
      placeholder="Search users"
      isClearable
      isSearchable
      onChange={(val) => onSelect(val)}
      className={styles.autocomplete}
      {...props}
    />
  );
};
export default Autocomplete;
