import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const artworkAPI = {
  list: (category = null) => 
    apiClient.get(`/artworks/${category ? `?category=${category}` : ''}`),
  get: (id) => apiClient.get(`/artworks/${id}/`),
  create: (data) => apiClient.post('/admin/artworks/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const blogAPI = {
  list: () => apiClient.get('/blog/'),
  get: (slug) => apiClient.get(`/blog/${slug}/`),
};

export const authAPI = {
  login: (email, password) => apiClient.post('/admin/login/', { email, password }),
};

export default apiClient;
