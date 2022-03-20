import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { setValue } from '../../utils';

const SvgComponent = ({ size = 25, color = Colors.typography }) => (
  <Svg width={setValue(size)} height={setValue(size)} fill="none" viewBox="0 0 24 25">
    <Path
      d="M11.97.332a11.855 11.855 0 1 0 0 23.71 11.855 11.855 0 0 0 0-23.71Zm4.433 8.348-1.687 5.743a.744.744 0 0 1-.505.506l-5.748 1.692a.747.747 0 0 1-.925-.937l1.756-5.683a.746.746 0 0 1 .493-.493l5.68-1.75a.747.747 0 0 1 .936.922Z"
      fill={color}
    />
  </Svg>
);

export default SvgComponent;
