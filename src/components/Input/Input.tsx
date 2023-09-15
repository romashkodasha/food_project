import React from "react";
import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
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
      <div className={`${styles.input_container} ${className}`}>
        <input
          {...restProps}
          type="text"
          value={value}
          onChange={handleChange}
          className={styles.input_field}
        />
        {afterSlot && <div className={styles.input_icon}>{afterSlot}</div>}
      </div>
    );
  },
);

export default Input;
