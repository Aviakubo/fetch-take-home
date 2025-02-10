import React, { useState, useEffect } from 'react';
import { getBreeds, searchDogs, getDogs, matchDogs } from '../api/api';
import DogCard from './DogCard';
import Pagination from './Pagination';

function SearchPage() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [dogIds, setDogIds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [nextQuery, setNextQuery] = useState(null);
  const [prevQuery, setPrevQuery] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBreeds() {
      try {
        const response = await getBreeds();
        setBreeds(response.data);
      } catch (err) {
        console.error('Error fetching breeds:', err);
      }
    }
    fetchBreeds();
  }, []);

  const performSearch = async (queryParams = {}) => {
    setLoading(true);
    try {
      const params = {
        breeds: selectedBreeds,
        sort: `breed:${sortOrder}`,
        ...queryParams,
      };

      const searchResponse = await searchDogs(params);
      const { resultIds, total, next, prev } = searchResponse.data;
      setDogIds(resultIds);
      setTotal(total);
      setNextQuery(next);
      setPrevQuery(prev);

      const dogsResponse = await getDogs(resultIds);
      setDogs(dogsResponse.data);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch();
  }, [selectedBreeds, sortOrder]);

  const toggleFavorite = (dogId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(dogId)
        ? prevFavorites.filter((id) => id !== dogId)
        : [...prevFavorites, dogId]
    );
  };

  const handleMatch = async () => {
    try {
      const response = await matchDogs(favorites);
      const { match } = response.data;
      alert(`You've been matched with dog ID: ${match}`);
    } catch (err) {
      console.error('Match error:', err);
    }
  };

  const handleNext = () => {
    if (nextQuery) {
      performSearch({ from: nextQuery });
    }
  };

  const handlePrev = () => {
    if (prevQuery) {
      performSearch({ from: prevQuery });
    }
  };

  return (
    <div>
      <h2>Search Dogs</h2>

      <div>
        <label>Filter by Breed:</label>
        <select
          multiple
          value={selectedBreeds}
          onChange={(e) => {
            const options = e.target.options;
            const selected = [];
            for (let i = 0; i < options.length; i++) {
              if (options[i].selected) {
                selected.push(options[i].value);
              }
            }
            setSelectedBreeds(selected);
          }}
        >
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Sort by Breed:</label>
        <button onClick={() => setSortOrder('asc')} disabled={sortOrder === 'asc'}>
          Ascending
        </button>
        <button onClick={() => setSortOrder('desc')} disabled={sortOrder === 'desc'}>
          Descending
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            isFavorite={favorites.includes(dog.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <Pagination onNext={handleNext} onPrev={handlePrev} />

      {favorites.length > 0 && (
        <div>
          <button onClick={handleMatch}>Find My Match</button>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
