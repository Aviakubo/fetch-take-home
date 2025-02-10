import React from 'react';

function Pagination({ onNext, onPrev }) {
  return (
    <div style={{ margin: '20px 0' }}>
      <button onClick={onPrev}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
}

export default Pagination;
