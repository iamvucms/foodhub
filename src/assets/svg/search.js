import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { setValue } from '../../utils';

const SvgComponent = ({ color = Colors.typography, size = 16 }) => (
  <Svg width={setValue(size)} height={setValue(size)} viewBox="0 0 16 16">
    <Path d="m11.047 11.4 3.453 3.1" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12Z" stroke={color} strokeWidth={2} />
  </Svg>
);

export default SvgComponent;
