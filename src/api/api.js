import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true,
});

export const login = (name, email) =>
  apiClient.post('/auth/login', { name, email });

export const logout = () => apiClient.post('/auth/logout');

export const getBreeds = () => apiClient.get('/dogs/breeds');

export const searchDogs = (params) =>
  apiClient.get('/dogs/search', { params });

export const getDogs = (dogIds) =>
  apiClient.post('/dogs', dogIds);

export const matchDogs = (dogIds) =>
  apiClient.post('/dogs/match', dogIds);