import React from 'react';
import styles from './DogCard.css';

function DogCard({ dog, isFavorite, toggleFavorite }) {
  return (
    <div className={styles.dogCard}>
      <img src={dog.img} alt={dog.name} />
      <div className={styles.dogInfo}>
        <h3>{dog.name}</h3>
        <p>Breed: {dog.breed}</p>
        <p>Age: {dog.age}</p>
        <p>Zip: {dog.zip_code}</p>
      </div>
      <button
        className={styles.favoriteBtn}
        onClick={() => toggleFavorite && toggleFavorite(dog.id)}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
    </div>
  );
}

export default DogCard;
