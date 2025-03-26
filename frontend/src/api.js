import axios from 'axios';

const API_URL = 'http://localhost:5005/users'; 


const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }), 
  },
});


export const registerUser = (userData) => axiosInstance.post('register', userData);

export const fetchUsers = () => 
  axios.get('http://localhost:5005/users', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

export const updateUser = (id, userData) => 
  axios.put(`http://localhost:5005/users/${id}`, userData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

export const deleteUser = (id) => 
  axios.delete(`http://localhost:5005/users/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
