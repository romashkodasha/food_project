import React from 'react'
import classNames from 'classnames'
import Loader from '../Loader/Loader'
import styles from './Button.module.scss'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Состояние загрузки */
    loading?: boolean
    /** Текст кнопки */
    children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
    loading,
    className,
    disabled,
    children,
    ...rest
}) => {
    const isDisabled = loading || disabled
    const buttonClasses = classNames(
        styles.button,
        className,
        {
            [styles['button_loading']]: loading,
        },
        {
            [styles['button_disabled']]: disabled,
        }
    )

    return (
        <button className={buttonClasses} {...rest} disabled={isDisabled}>
            {loading && (
                <Loader
                    size="s"
                    className="button-loader"
                />
            )}
            {children}
        </button>
    )
}

export default Button
