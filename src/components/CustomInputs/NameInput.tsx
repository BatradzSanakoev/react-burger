import React, { useRef, useState, ChangeEvent } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { TCustomInputProps } from '../../utils/types';

export const NameInput = ({ value, onChange, name, placeholder, size = 'default' }: TCustomInputProps) => {
  const [fieldDisabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const onFocus = () => {
    setError(false);
  };

  const onBlur = () => {
    setDisabled(true);
  };

  return (
    <Input
      type='text'
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
