import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { setValue } from '../../utils';

const SvgComponent = ({ size = 25, color = Colors.typography }) => (
  <Svg width={setValue(size)} height={setValue(size)} fill="none" viewBox="0 0 22 25">
    <Path
      d="M20.972 10.072a4.105 4.105 0 0 0-3.859-3.64v-.284A6.129 6.129 0 0 0 15.312 1.8 6.133 6.133 0 0 0 10.962 0a6.151 6.151 0 0 0-6.148 6.15v.286a4.105 4.105 0 0 0-3.788 3.639L0 19.419a4.728 4.728 0 0 0 4.74 4.709h12.52a4.728 4.728 0 0 0 4.74-4.71l-1.028-9.346ZM6.62 6.16a4.342 4.342 0 1 1 8.686 0v.264H6.62v-.264Zm.856 6.388a1.09 1.09 0 1 1 .419-2.1 1.09 1.09 0 0 1-.419 2.1Zm7.05 0a1.093 1.093 0 0 1-1.01-1.51 1.093 1.093 0 1 1 1.428 1.427 1.09 1.09 0 0 1-.418.083Z"
      fill={color}
    />
  </Svg>
);

export default SvgComponent;
