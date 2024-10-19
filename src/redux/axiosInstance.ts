import axios from 'axios';
import Constants from '../utils/Constants';
import {storage} from '../utils/Storage';

const axiosInstance = axios.create({
  baseURL: Constants.baseUrlApi,
});

axiosInstance.interceptors.request.use(config => {
  const token = storage.getString('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let axiosInstance2 = axios.create({
  baseURL: Constants.baseUrlApi,
});

axiosInstance2.interceptors.request.use(config => {
  const token = storage.getString('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'multipart/form-data';
  }

  return config;
});

export {axiosInstance, axiosInstance2};
