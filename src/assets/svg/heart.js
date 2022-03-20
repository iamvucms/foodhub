import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { setValue } from '../../utils';

const SvgComponent = ({ size = 22, color = Colors.typography }) => (
  <Svg width={setValue(size)} height={setValue(size)} fill="none" viewBox="0 0 22 20">
    <Path
      d="M15.866 0a5.78 5.78 0 0 0-5.039 2.95A5.78 5.78 0 0 0 5.787 0 6.117 6.117 0 0 0 0 6.16c0 8.027 10.827 13.627 10.827 13.627S21.654 14.19 21.654 6.16A6.117 6.117 0 0 0 15.866 0Z"
      fill={color}
    />
  </Svg>
);

export default SvgComponent;
