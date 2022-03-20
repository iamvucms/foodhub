import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { setValue } from '../../utils';

const SvgComponent = ({ color = Colors.typography, size = 24 }) => (
  <Svg width={setValue(size)} height={setValue(size)} viewBox="0 0 21 24" fill="none">
    <Path
      d="M18.849 4.719a9.871 9.871 0 0 0-8.453-4.72 9.867 9.867 0 0 0-8.453 4.72 10.43 10.43 0 0 0-1.036 8.226c1.717 5.905 7.483 9.738 9.076 10.7a.8.8 0 0 0 .822 0c1.594-.965 7.359-4.8 9.076-10.7a10.427 10.427 0 0 0-1.032-8.226Zm-8.453 8.829a3.384 3.384 0 1 1 .002-6.768 3.384 3.384 0 0 1-.002 6.768Z"
      fill={color}
    />
  </Svg>
);

export default SvgComponent;
