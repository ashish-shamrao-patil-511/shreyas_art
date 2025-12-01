import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public APIs
export const getArtworks = (category = null) => {
  const params = category ? { category } : {};
  return api.get('/artworks/', { params });
};

export const getArtwork = (id) => api.get(`/artworks/${id}/`);

export const getBlogPosts = () => api.get('/blog/');

export const getBlogPost = (slug) => api.get(`/blog/${slug}/`);

// Admin APIs
export const adminLogin = (email, password) => 
  api.post('/admin/login/', { email, password });

export const createArtwork = (formData) => {
  return api.post('/artworks/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateArtwork = (id, formData) => {
  return api.put(`/artworks/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteArtwork = (id) => api.delete(`/artworks/${id}/`);

export default api;
