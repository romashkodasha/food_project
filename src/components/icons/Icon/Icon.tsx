import * as React from 'react';
import cn from 'classnames';
import styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  left?: boolean; //для ArrowRightIcon чтобы отобразить в левую сторону при true
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  children,
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <svg
      {...props}
      className={cn(styles.icon, color && styles[`icon_color-${color}`], className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      width={width}
      height={height}
    >
      {children}
    </svg>
  );
};

export default Icon;
