import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});
