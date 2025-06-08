// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://employee-management-backend-89cq.onrender.com',
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
