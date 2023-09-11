import React from 'react';
import './Loader.scss'

export type LoaderProps = {
    /** Размер */
    size?: 's' | 'm' | 'l';
    /** Дополнительный класс */
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({size='l', className='', ...rest}) => {
    const loaderClasses = ['loader', className];
    if (size === 's'){
        loaderClasses.push('s');
    } else if (size === 'm'){
        loaderClasses.push('m');
    } else loaderClasses.push('l');

    return <div className={loaderClasses.join(' ')} {...rest}></div>;
};

export default Loader;
