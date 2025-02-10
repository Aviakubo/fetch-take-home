import axios from 'axios';

const BASE_URL = 'https://frontend-take-home-service.fetch.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const login = (name, email) =>
  apiClient.post('/auth/login', { name, email });

export const getBreeds = () =>
  apiClient.get('/dogs/breeds');

export const searchDogs = (params) =>
  apiClient.get('/dogs/search', { params });

export const getDogs = (dogIds) =>
  apiClient.post('/dogs', dogIds);

export const matchDogs = (dogIds) =>
  apiClient.post('/dogs/match', dogIds);