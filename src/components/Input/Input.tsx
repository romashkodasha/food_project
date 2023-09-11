import React from 'react';
import './Input.scss'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, ...restProps }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };

    return (
      <div className={`input-container ${className}`}>
        <input
          {...restProps}
          type="text"
          value={value}
          onChange={handleChange}
          className="input-field"
        />
        {afterSlot && <div className="input-icon">{afterSlot}</div>}
      </div>
    );
  }
);

export default Input;
