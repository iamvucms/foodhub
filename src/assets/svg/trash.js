import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { setValue } from '../../utils';

const SvgComponent = ({ size = 20, color = Colors.typography }) => (
  <Svg width={setValue(size)} height={setValue(size)} viewBox="0 0 24 24">
    <Path
      d="M19 11v9.4a.6.6 0 0 1-.6.6H5.6a.6.6 0 0 1-.6-.6V11M10 17v-6M14 17v-6M21 7h-5M3 7h5m0 0V3.6a.6.6 0 0 1 .6-.6h6.8a.6.6 0 0 1 .6.6V7M8 7h8"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
