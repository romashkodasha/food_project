import React, { useRef, useEffect } from 'react'
import Input from '../Input/Input'
import ArrowDownIcon from '../icons/ArrowDownIcon/ArrowDownIcon'
import styles from './MultiDropdown.module.scss'
import { observer, useLocalStore } from 'mobx-react-lite'
import MultiDropdownStore from 'store/MultiDropdownStore'
import { motion } from 'framer-motion'

export type Option = {
    /** Ключ варианта, используется для отправки на бек/использования в коде */
    key: string
    /** Значение варианта, отображается пользователю */
    value: string
}

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
    className?: string
    /** Массив возможных вариантов для выбора */
    options: Option[]
    /** Текущие выбранные значения поля, может быть пустым */
    value: Option[]
    /** Callback, вызываемый при выборе варианта */
    onChange: (value: Option[]) => void
    /** Заблокирован ли дропдаун */
    disabled?: boolean
    /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
    getTitle: (value: Option[]) => string
}

const MultiDropdown: React.FC<MultiDropdownProps> = ({
    className = '',
    options,
    value,
    onChange,
    disabled,
    getTitle,
}) => {
    const multiDropdownStore = useLocalStore(() => new MultiDropdownStore())

    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleInputChange = (value: string) => {
        multiDropdownStore.setInputValue(value)
    }

    const handleOptionClick = (option: Option) => {
        const optionIndex = value.findIndex((v) => v.key === option.key)
        let newValue

        if (optionIndex === -1) {
            // Если опция не включена в текущий value, добавляем ее
            newValue = [...value, option]
        } else {
            // Если опция уже включена, убираем ее из value
            newValue = value.filter((v) => v.key !== option.key)
        }

        // Вызываем onChange с новым значением
        onChange(newValue)
    }

    const handleDocumentClick = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            multiDropdownStore.setIsDropdownOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleDocumentClick)
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick)
        }
    }, [])
    useEffect(() => {
        if (!multiDropdownStore.isDropdownOpen && value.length !== 0) {
            multiDropdownStore.setInputValue(getTitle(value))
        }
        if (multiDropdownStore.isDropdownOpen) {
            multiDropdownStore.setInputValue('')
        }
    }, [getTitle, multiDropdownStore.isDropdownOpen, value])

    const filteredOptions = options.filter((option) =>
        option.value.includes(multiDropdownStore.inputValue)
    )

    return (
        <div className={styles[className]} ref={dropdownRef}>
            <div
                className={
                    multiDropdownStore.isDropdownOpen
                        ? styles.input_container_open
                        : styles.input_container_closed
                }
            >
                <Input
                    value={multiDropdownStore.inputValue}
                    onChange={handleInputChange}
                    onClick={() => multiDropdownStore.setIsDropdownOpen(true)}
                    disabled={disabled}
                    placeholder={getTitle(value)}
                    afterSlot={
                        <ArrowDownIcon
                            color="secondary"
                            className={
                                multiDropdownStore.isDropdownOpen
                                    ? styles.rotate180
                                    : ''
                            }
                            onClick={() =>
                                {
                                multiDropdownStore.setIsDropdownOpen(!multiDropdownStore.isDropdownOpen)}
                            }
                        />
                    }
                />
                <motion.div
                    ref={dropdownRef}
                    className={styles.options}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: multiDropdownStore.isDropdownOpen ? 'auto' : 0,
                        opacity: multiDropdownStore.isDropdownOpen ? 1 : 0,
                    }}
                    exit={{ height: 0, opacity: 0 }} // Анимация при закрытии
                    transition={{ duration: 0.3 }}
                >
                    {multiDropdownStore.isDropdownOpen &&
                        !disabled &&
                        filteredOptions.map((option) => (
                            <div
                                key={option.key}
                                className={
                                    value.some((v) => v.key === option.key)
                                        ? `${styles.option} ${styles.selected} `
                                        : styles.option
                                }
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.value}
                            </div>
                        ))}
                </motion.div>
            </div>
        </div>
    )
}

export default observer(MultiDropdown)
