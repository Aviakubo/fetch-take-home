import React, { useState, useEffect, useCallback } from 'react';
import DogCard from '../DogCard/DogCard';
import Pagination from '../Pagination/Pagination';
import FilterBar from '../FilterBar/FilterBar';
import { getBreeds, searchDogs, getDogs } from '../../api/api';
import styles from './SearchPage.module.css';

function SearchPage() {
  const [allBreeds, setAllBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [sortField, setSortField] = useState('breed');
  const [sortOrder, setSortOrder] = useState('asc');
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [nextQuery, setNextQuery] = useState(null);
  const [prevQuery, setPrevQuery] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBreeds() {
      try {
        const response = await getBreeds();
        setAllBreeds(response.data);
      } catch (err) {
        console.error('Error fetching breeds:', err);
      }
    }
    fetchBreeds();
  }, []);

  const performSearch = useCallback(async (queryParams = {}) => {
    setLoading(true);
    try {
      const params = {
        breeds: selectedBreeds,
        sort: `${sortField}:${sortOrder}`,
        ...queryParams,
      };

      const searchResponse = await searchDogs(params);
      const { resultIds, next, prev } = searchResponse.data;
      const dogsResponse = await getDogs(resultIds);
      setDogs(dogsResponse.data);
      setNextQuery(next);
      setPrevQuery(prev);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedBreeds, sortField, sortOrder]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const toggleFavorite = (dogId) => {
    setFavorites((prevFavorites) => 
      prevFavorites.includes(dogId)
        ? prevFavorites.filter((id) => id !== dogId)
        : [...prevFavorites, dogId]
    );
  };

  return (
    <div className={styles.searchPage}>
      <FilterBar
        allBreeds={allBreeds}
        selectedBreeds={selectedBreeds}
        setSelectedBreeds={setSelectedBreeds}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {loading && <p>Loading...</p>}

      <div className={styles.dogGrid}>
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            isFavorite={favorites.includes(dog.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <Pagination
        onPrev={() => prevQuery && performSearch({ from: prevQuery })}
        onNext={() => nextQuery && performSearch({ from: nextQuery })}
        disablePrev={!prevQuery}
        disableNext={!nextQuery}
      />
    </div>
  );
}

export default SearchPage;
