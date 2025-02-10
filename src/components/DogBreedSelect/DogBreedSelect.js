import React from 'react';
import AsyncSelect from 'react-select/async';

const DogBreedSelect = ({ selectedBreeds, setSelectedBreeds, allBreeds }) => {
  const options = allBreeds.map((breed) => ({ value: breed, label: breed }));

  const loadOptions = (inputValue, callback) => {
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredOptions);
  };

  const handleChange = (selectedOptions) => {
    setSelectedBreeds(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const selectedOptions = options.filter(option => selectedBreeds.includes(option.value));

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions={options}
      loadOptions={loadOptions}
      value={selectedOptions}
      onChange={handleChange}
      placeholder="Select dog breeds..."
    />
  );
};

export default DogBreedSelect;
