import { axiosInstance, createAxiosInstance } from '../constants';

export const get = async (url, params = {}) => {
  return await request(url, params, 'get');
};
export const post = async (url, data = {}) => {
  return await request(url, data, 'post');
};
export const request = async (url, data = {}, method = 'post') => {
  try {
    let axios = axiosInstance;
    if (!axios) {
      axios = await createAxiosInstance();
    }
    console.log({ url });
    const response = await axios[method](url, data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
