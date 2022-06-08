import { Platform } from 'react-native';
import { baseUrl, Layout, PREFIX_BASE_URL } from '../constants';
import AsyncStorge from '@react-native-async-storage/async-storage';
import { ignore } from 'mobx-sync';
import dayjs from 'dayjs';
import { post } from './api';
import { userStore } from '../stores';
import { UserActions } from '../actions';
export * from './api';
const {
  window: { width, height },
  iphoneMaxHeight,
  iphoneMaxWidth
} = Layout;
const cachingYValue = {};
const cachingXValue = {};
const cachingValue = {};

export const setYAxisValue = value => {
  if (!cachingYValue[`${value}`]) {
    const ratio = height / iphoneMaxHeight;
    const y = ratio > 1 ? value : value * ratio;
    cachingYValue[`${value}`] = y;
    return y;
  } else {
    return cachingYValue[value];
  }
};

export const setValue = value => {
  if (!cachingValue[`${value}`]) {
    const ratio = (height * width) / (iphoneMaxHeight * iphoneMaxWidth);
    const xy = ratio >= 1 ? value : value * ratio;
    cachingValue[`${value}`] = xy;
    return xy;
  } else {
    return cachingValue[value];
  }
};

export const setXAxisValue = value => {
  if (!cachingXValue[`${value}`]) {
    const ratio = width / iphoneMaxWidth;
    const x = ratio >= 1 ? value : value * ratio;
    cachingXValue[`${value}`] = x;
    return x;
  } else {
    return cachingXValue[value];
  }
};

export const getHeight = () => height;

export const getWidth = () => width;
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

export const compareCartItemAddOns = (a, b) => {
  if (a.options.length !== b.options.length) return false;
  for (let i = 0; i < a.options.length; i++) {
    if (a.options[i].id !== b.options[i].id) return false;
  }
  return true;
};
export const storeItem = async (key, value, encodeJson) => {
  try {
    await AsyncStorge.setItem(key, encodeJson ? JSON.stringify(value) : value);
  } catch (e) {
    console.log(e);
  }
};
export const getItem = async (key, decodeJson = false) => {
  try {
    const data = await AsyncStorge.getItem(key);
    return decodeJson ? JSON.parse(data) : data;
  } catch (e) {
    console.log(e);
  }
};
export const ignorePersistNodes = (context, nodeNames) => {
  nodeNames.forEach(nodeName => ignore(context, nodeName));
};
export const getDiffTimeString = time1 => {
  const time2 = new Date().getTime();
  const diffInSeconds = Math.abs(time1 - time2) / 1000;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  let dateString = dayjs(time1).format('MMM DD, YYYY');
  let type = 'date';
  let postfix = '';
  if (diffInSeconds < 60) {
    type = 'seconds';
    dateString = `${diffInSeconds}`;
    postfix = `second${diffInSeconds > 1 ? 's' : ''} ago`;
  } else if (diffInMinutes < 60) {
    type = 'minutes';
    dateString = `${diffInMinutes}`;
    postfix = `minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    type = 'hours';
    dateString = `${diffInHours}`;
    postfix = `hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 30) {
    type = 'days';
    dateString = `${diffInDays}`;
    postfix = `day${diffInDays > 1 ? 's' : ''} ago`;
  }
  if (type !== 'date') {
    dateString = Math.round(dateString);
  }
  return {
    dateString,
    type,
    postfix
  };
};
export const uploadImage = async (uri, type = 'image/jpeg') => {
  try {
    const formData = new FormData();
    formData.append('photo', {
      uri,
      name: 'photo.' + type.split('/')[1],
      type
    });
    const response = await fetch(`${PREFIX_BASE_URL}${baseUrl}/photo`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + userStore.user.accessToken
      },
      method: 'POST',
      body: formData
    }).then(rs => rs.json());
    return response.data;
  } catch (e) {
    console.log({ uploadImage: e });
  }
};
