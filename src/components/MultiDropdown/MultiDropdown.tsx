import React, { useState, useRef, useEffect } from 'react';
import Input from '../Input/Input';
import ArrowDownIcon from '../icons/ArrowDownIcon/ArrowDownIcon';
import './MultiDropdown.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleOptionClick = (option: Option) => {
    const optionIndex = value.findIndex((v) => v.key === option.key);
    let newValue;

    if (optionIndex === -1) {
      // Если опция не включена в текущий value, добавляем ее
      newValue = [...value, option];
    } else {
      // Если опция уже включена, убираем ее из value
      newValue = value.filter((v) => v.key !== option.key);
    }

    // Вызываем onChange с новым значением
    onChange(newValue);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);
  useEffect(() => {
    if (!isDropdownOpen && value.length!==0) {
      setInputValue(getTitle(value));
    }
    if (isDropdownOpen){
      setInputValue('');
    }
  }, [isDropdownOpen, value]);


  const filteredOptions = options.filter((option) =>
    option.value.includes(inputValue)
  );

  return (
    <div className={`multi-dropdown ${className || ''}`} ref={dropdownRef} >
      <div className={`input-container ${isDropdownOpen ? 'open' : 'closed'}`}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setIsDropdownOpen(true)}
          disabled={disabled}
          placeholder={getTitle(value)}
          afterSlot={<ArrowDownIcon color="secondary"/>}
        />
        <div
          ref={dropdownRef}
          className='options'
        >
          {(isDropdownOpen && !disabled)&& 
            filteredOptions.map((option) => (
              <div
                key={option.key}
                className={`option ${
                  value.some((v) => v.key === option.key) ? 'selected' : ''
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.value}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MultiDropdown;
