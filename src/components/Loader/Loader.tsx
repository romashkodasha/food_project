import React from 'react';
import styles from './Loader.module.scss'

export type LoaderProps = {
    /** Размер */
    size?: 's' | 'm' | 'l';
    /** Дополнительный класс */
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({size='l', className='', ...rest}) => {
    const loaderClasses = [styles.loader, className];
    if (size === 's'){
        loaderClasses.push(styles.s);
    } else if (size === 'm'){
        loaderClasses.push(styles.m);
    } else loaderClasses.push(styles.l);

    return <div className={loaderClasses.join(' ')} {...rest}></div>;
};

export default Loader;
