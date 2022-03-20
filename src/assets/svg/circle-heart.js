import * as React from 'react';
import Svg, { G, Path, Defs } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { setValue } from '../../utils';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SvgComponent = ({ size = 28, color = Colors.typography }) => (
  <Svg width={setValue(size)} viewBox="0 0 58 58" height={setValue(size)} fill="none">
    <G filter="url(#a)">
      <Path d="M29 36c7.732 0 14-6.268 14-14S36.732 8 29 8s-14 6.268-14 14 6.268 14 14 14Z" fill={color} />
    </G>
    <Path
      d="M32.055 16a4.027 4.027 0 0 0-3.51 2.055A4.029 4.029 0 0 0 25.031 16 4.262 4.262 0 0 0 21 20.292c0 5.593 7.544 9.495 7.544 9.495s7.544-3.9 7.544-9.495A4.263 4.263 0 0 0 32.055 16Z"
      fill="#fff"
    />
    <Defs></Defs>
  </Svg>
);

export default SvgComponent;
