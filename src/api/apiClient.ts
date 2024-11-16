import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const isLocalhost = window.location.hostname === 'localhost';

export const apiClient = axios.create({
  baseURL: isLocalhost ? `${API_BASE_URL}/api` : '/api', // 슬래시(/)를 포함해 명확히 설정
});
