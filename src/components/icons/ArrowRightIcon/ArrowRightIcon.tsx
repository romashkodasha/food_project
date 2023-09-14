import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const ArrowRightIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props} viewBox="0 0 32 32">
      <path
        d={
          props.left
            ? 'M20.12 26.5599L11.4267 17.8666C10.4 16.8399 10.4 15.1599 11.4267 14.1333L20.12 5.43994'
            : 'M11.88 26.5599L20.5733 17.8666C21.6 16.8399 21.6 15.1599 20.5733 14.1333L11.88 5.43994'
        }
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Icon>
  );
};

export default ArrowRightIcon;
