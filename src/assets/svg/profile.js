import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { setValue } from '../../utils';

const SvgComponent = ({ size = 21, color = Colors.typography }) => (
  <Svg width={setValue(size)} height={setValue(size)} fill="none" viewBox="0 0 19 21">
    <Path d="M9.5 11.565c2.977 0 5.39-2.384 5.39-5.324S12.478.917 9.5.917 4.11 3.3 4.11 6.24c0 2.94 2.413 5.324 5.39 5.324Z" fill={color} />
    <Path
      d="M18.116 16.898a1.762 1.762 0 0 0 0-.228c-.022-.28-.101-.554-.234-.805-.524-1.024-1.994-1.488-3.22-1.75-.874-.183-1.763-.3-2.657-.35l-.936-.07H7.925l-.936.07c-.894.05-1.783.167-2.657.35-1.226.227-2.695.7-3.22 1.75a2.054 2.054 0 0 0-.233.805 1.776 1.776 0 0 0 0 .227 1.925 1.925 0 0 0 0 .228c.025.278.108.548.243.797.524 1.023 1.993 1.487 3.219 1.75.876.173 1.764.29 2.658.35l.935.061H11.08l.935-.061a20.82 20.82 0 0 0 2.658-.35c1.226-.236 2.695-.7 3.22-1.75a2.27 2.27 0 0 0 .233-.814c.001-.07-.002-.14-.01-.21Z"
      fill={color}
    />
  </Svg>
);

export default SvgComponent;
