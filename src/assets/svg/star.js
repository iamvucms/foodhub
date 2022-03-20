import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { setValue } from '../../utils';

const SvgComponent = ({ color = Colors.typography, size = 11 }) => (
  <Svg width={setValue(size)} height={setValue(size)} viewBox="0 0 11 10">
    <Path
      d="M8.94 9.446 5.888 7.841 2.833 9.446l.584-3.4L.944 3.636l3.415-.496L5.887 0l1.529 3.141 3.415.496-2.474 2.41.584 3.399Z"
      fill={color}
    />
  </Svg>
);

export default SvgComponent;
