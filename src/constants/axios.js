import axios from 'axios';
import { Platform } from 'react-native';
import { userStore } from '../stores';
export let axiosInstance = null;
export const PREFIX_BASE_URL = Platform.OS === 'android' ? 'http://192.168.1.2:3000/api' : 'http://localhost:3000/api';
export const createAxiosInstance = () => {
  const accessToken = userStore.user.accessToken;
  axiosInstance = axios.create({
    baseURL: PREFIX_BASE_URL,
    timeout: 10000,
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return axiosInstance;
};
export const baseAuthUrl = '/auth';
export const baseUrl = '/data';
