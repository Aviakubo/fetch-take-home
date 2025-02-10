import React from 'react';

function DogCard({ dog, isFavorite, toggleFavorite }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
      <img src={dog.img} alt={dog.name} style={{ width: '100%', height: 'auto' }} />
      <h3>{dog.name}</h3>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age}</p>
      <p>Zip: {dog.zip_code}</p>
      <button onClick={() => toggleFavorite(dog.id)}>
        {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
      </button>
    </div>
  );
}

export default DogCard;
