// src/http-common.js
import axios from 'axios';
import { getToken } from './utils/token';

const http = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "application/json"
  }
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (!config.headers["Content-Type"]?.includes('multipart/form-data')) {
      config.headers["Content-type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;