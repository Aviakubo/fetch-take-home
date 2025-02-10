import React from 'react';
import styles from './FilterBar.module.css';

function FilterBar({
  breeds,
  selectedBreeds,
  setSelectedBreeds,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}) {
  const handleBreedChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedBreeds(selected);
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterControls}>
        <label htmlFor="breedFilter">Filter by Breed:</label>
        <select
          id="breedFilter"
          multiple
          value={selectedBreeds}
          onChange={handleBreedChange}
        >
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.sortControls}>
        <label htmlFor="sortField">Sort by:</label>
        <select
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="breed">Breed</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>

        <label htmlFor="sortOrder">Order:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
