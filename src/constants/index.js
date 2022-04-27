import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const iphoneMaxWidth = 375;

const iphoneMaxHeight = 812;
export const imageSize = 1080;
export const Layout = {
  window: {
    width,
    height
  },
  iphoneMaxWidth,
  iphoneMaxHeight
};
export * from './axios';
