import { Axios } from 'axios';
import { axiosInstance, createAxiosInstance } from '../constants';

export const get = async (url, params = {}) => {
  return await request(url, params, 'get');
};
export const post = async (url, data = {}) => {
  return await request(url, data, 'post');
};
export const deleteRequest = async (url, data = {}) => {
  return await request(url, data, 'delete');
};
export const postDelete = async url => {
  return await request(url, {}, 'delete');
};
export const request = async (url, data = {}, method = 'post') => {
  try {
    const axios = createAxiosInstance();
    const response = await axios[method](url, data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
