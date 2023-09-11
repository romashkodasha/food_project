import * as React from 'react'
import { IconProps } from '../Icon';
import './CheckIcon.scss'

const CheckIcon: React.FC<IconProps> = ({width, height, className, color, ...props}) => {
    let customColor;
    if (width===undefined) {width=24}
    if (height===undefined) {height=24}
    if (color==='accent'){
        customColor = 'var(--text-accent)';
    }
    if (color==='secondary'){
        customColor = 'var(--text-secondary)';
    }
    if (color==='primary'){
        customColor = 'var(--text-primary)';
    }
    return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox='0 0 24 24' fill='none' className={className} {...props}>
    <path d="M4 11.6129L9.87755 18L20 7" stroke={color === undefined ? 'currentColor' : customColor} className={className} strokeWidth="2" />
    </svg>;
};

export default CheckIcon;
