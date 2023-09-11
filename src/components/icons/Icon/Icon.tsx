import * as React from 'react'

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
    left?:boolean; //для ArrowRightIcon чтобы отобразить в левую сторону при true
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = () => null

export default Icon;
