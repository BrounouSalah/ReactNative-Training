import axios from 'axios';
import envs from '../config/env';
import AsyncStorage from '@react-native-async-storage/async-storage';

let headers = {
  Authorization:
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkhlbGxvIn0.oDPkItpWBwZfBiZW_0qcrwkUVejsqSeWyNSmgkq6YPk',
};
const axiosInstance = axios.create({
  baseURL: envs.DEV_BACKEND_URL,
  headers,
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorisation = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
