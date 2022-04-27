import axios from 'axios';
import { getItem } from '../utils';
export let axiosInstance = null;
export const createAxiosInstance = async () => {
  const accessToken = await getItem('accessToken');
  axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 10000,
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return axiosInstance;
};
export const baseAuthUrl = '/auth';
export const baseUrl = '/data';
