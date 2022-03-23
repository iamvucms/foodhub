import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';

const SvgComponent = ({ color = Colors.typography }) => (
  <Svg width={12} height={2} fill="none">
    <Path stroke={color} strokeWidth={1.5} strokeLinecap="round" d="M1.355 1.04h9.3" />
  </Svg>
);

export default SvgComponent;
