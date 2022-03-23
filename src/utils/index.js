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

export const compareCartItemAddOns = (a, b) => {
  if (a.options.length !== b.options.length) return false;
  for (let i = 0; i < a.options.length; i++) {
    if (a.options[i].id !== b.options[i].id) return false;
  }
  return true;
};
