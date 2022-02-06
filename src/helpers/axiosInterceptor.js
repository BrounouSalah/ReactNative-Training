import axios from 'axios';
import envs from '../config/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../navigations/SideMenu/RootNavigation';
import {LOGOUT} from '../constants/routeNames';

let headers = {
  Authorization:
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3Q5OTk5In0.IXlqJmSnuu9Xe8LAbmWXMbApryc34QEMx-FfKyq7IOU',
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
axiosInstance.interceptors.response.use(
  response =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  error => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status === 403) {
      navigate(LOGOUT, {tokenExpired: true});
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

export default axiosInstance;
