import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { setValue } from '../../utils';

const SvgComponent = ({ size = 9, color = Colors.typography }) => (
  <Svg width={setValue(size)} height={setValue(size)} fill="none" viewBox="0 0 6 9">
    <Path d="m1 1 3.34 3.34L1 7.68" stroke={color} strokeWidth={1.5} />
  </Svg>
);

export default SvgComponent;
