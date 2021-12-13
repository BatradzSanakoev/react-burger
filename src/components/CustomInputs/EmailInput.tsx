import React, { useRef, useState, ChangeEvent, FocusEvent } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { TCustomInputProps } from '../../utils/types';

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const EmailInput = ({ value, onChange, name, placeholder, size = 'default' }: TCustomInputProps) => {
  const [fieldDisabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const validateField = (value: string) => {
    setError(!validateEmail(value));
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
  };

  return (
    <Input
      type='email'
      placeholder={placeholder}
      onChange={onChange}
      icon={!fieldDisabled ? 'CloseIcon' : 'EditIcon'}
      value={value}
      ref={inputRef}
      onBlur={onBlur}
      onFocus={onFocus}
      name={name}
      error={error}
      disabled={fieldDisabled}
      onIconClick={onIconClick}
      errorText={'Ой, произошла ошибка!'}
      size={size}
    />
  );
};
