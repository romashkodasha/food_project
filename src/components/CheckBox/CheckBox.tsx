import React from 'react';
import CheckIcon from '../icons/CheckIcon/CheckIcon';
import styles from './CheckBox.module.scss';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  checked,
  ...restProps
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  return (
    <label className={styles.custom_checkbox}>
      <input
        type="checkbox"
        onChange={handleChange}
        checked={checked}
        {...restProps}
      />
      {checked && (
        <CheckIcon
          color='accent'
          width={40}
          height={40}
          className={restProps.disabled? "check_icon_disabled" : "check_icon"}
        />
      )}
    </label>
  );
};

export default CheckBox;
