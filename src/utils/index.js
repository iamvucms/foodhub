import { Platform } from 'react-native';
import { Layout } from '../constants';

const {
  window: { width, height },
  iphoneMaxHeight,
  iphoneMaxWidth
} = Layout;
console.log({ width, height });
export const setYAxisValue = value => {
  const ratio = height / iphoneMaxHeight;
  return ratio > 1 ? value : value * ratio;
};

export const setValue = value => {
  const ratio = (height * width) / (iphoneMaxHeight * iphoneMaxWidth);
  return ratio >= 1 ? value : value * ratio;
};

export const setXAxisValue = value => {
  const ratio = width / iphoneMaxWidth;
  return ratio >= 1 ? value : value * ratio;
};

export const getHeight = () => height;

export const getWidth = () => width;
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';
