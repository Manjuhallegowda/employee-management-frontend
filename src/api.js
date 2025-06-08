// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log('✅ Token attached to request:', token);
  } else {
    console.warn('⚠️ No token found in localStorage');
  }
  return req;
});

export default API;