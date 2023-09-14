import React from 'react';
import classNames from 'classnames';
import Loader from '../Loader/Loader';
import './Button.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = React.memo(({ loading, className, disabled, children, ...rest }) => {
  const isDisabled = loading || disabled;
  const buttonClasses = classNames(
    'button',
    className,
    {
      'button-loading': loading,
    },
    {
      'button-disabled': disabled,
    },
  );

  return (
    <button className={buttonClasses} {...rest} disabled={isDisabled}>
      {loading && <Loader size="s" className="button-loader" data-testid="loader" />}
      {children}
    </button>
  );
});

export default Button;
