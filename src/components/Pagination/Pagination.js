import React from 'react';
import styles from './Pagination.css';

function Pagination({ onPrev, onNext, disablePrev, disableNext }) {
  return (
    <div className={styles.pagination}>
      <button onClick={onPrev} disabled={disablePrev}>
        Previous
      </button>
      <button onClick={onNext} disabled={disableNext}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
