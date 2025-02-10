import React from 'react';
import DogBreedSelect from '../DogBreedSelect/DogBreedSelect';
import styles from './FilterBar.module.css';

function FilterBar({
  allBreeds,
  selectedBreeds,
  setSelectedBreeds,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterControls}>
        <label className={styles.filterLabel}>Filter by Breed:</label>
        <DogBreedSelect
          allBreeds={allBreeds}
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={setSelectedBreeds}
        />
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
