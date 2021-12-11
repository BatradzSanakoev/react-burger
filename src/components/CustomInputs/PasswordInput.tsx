import React, { useRef, useState, ChangeEvent, FocusEvent } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

type TPasswordInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  size?: 'small' | 'default' | undefined;
};

export const PasswordInput = ({ value, onChange, name, placeholder, size = 'default' }: TPasswordInputProps) => {
  const [fieldDisabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setDisabled(false);
    setVisible(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const validateField = (value: string) => {
    setError(value.length < 6);
  };

  const onFocus = () => {
    setError(false);
  };

  const onBlur = (e?: FocusEvent<HTMLInputElement, Element> | undefined): void => {
    if (e?.target.value) {
      validateField(e.target.value);
    } else {
      setError(false);
    }
    setDisabled(true);
    setVisible(false);
  };

  return (
    <Input
      type={visible ? 'text' : 'password'}
      placeholder={placeholder}
      onChange={onChange}
      icon={visible ? 'CloseIcon' : 'EditIcon'}
      value={value}
      ref={inputRef}
      onBlur={onBlur}
      onFocus={onFocus}
      name={name}
      error={error}
      onIconClick={onIconClick}
      errorText={'Некорректный пароль'}
      size={size}
      disabled={fieldDisabled}
    />
  );
};
