import { Platform } from 'react-native';
import { Layout } from '../constants';
import AsyncStorge from '@react-native-async-storage/async-storage';
import { ignore } from 'mobx-sync';
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
