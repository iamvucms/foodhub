import axios from 'axios';
import { getItem, isAndroid } from '../utils';
export let axiosInstance = null;
export const createAxiosInstance = async () => {
  const BASE_URL = isAndroid ? 'http://192.168.1.6:3000/api' : 'http://localhost:3000/api';
  const accessToken = await getItem('accessToken');
  axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return axiosInstance;
};
export const baseAuthUrl = '/auth';
export const baseUrl = '/data';
