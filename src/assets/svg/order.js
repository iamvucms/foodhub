import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { setValue } from '../../utils';

const SvgComponent = ({ size = 21, color = Colors.typography }) => (
  <Svg width={setValue(size)} height={setValue(size)} fill="none" viewBox="0 0 19 21">
    <Path
      d="M13.516.917H5.485C2.57.917.875 2.623.875 5.545v9.9c0 2.97 1.696 4.638 4.61 4.638h8.031c2.96 0 4.609-1.667 4.609-4.638v-9.9c0-2.922-1.648-4.628-4.609-4.628Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.743 5.373v.01a.748.748 0 0 0 0 1.494h2.864a.751.751 0 0 0 .749-.758.748.748 0 0 0-.749-.746H5.743Zm7.513 5.836H5.743a.748.748 0 0 1 0-1.496h7.513a.748.748 0 0 1 0 1.496Zm0 4.38H5.743a.744.744 0 0 1-.719-.345.762.762 0 0 1 .719-1.16h7.513c.383.038.671.364.671.757a.75.75 0 0 1-.67.748Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgComponent;
