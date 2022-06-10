import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';

const SvgComponent = ({ color = Colors.typography, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path stroke={color} strokeWidth={1.5} strokeLinecap="round" d="M6.559 1.649v9.3M1.65 6.04h9.299" />
  </Svg>
);

export default SvgComponent;
