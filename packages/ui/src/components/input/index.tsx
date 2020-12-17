import React, {useRef, useCallback} from 'react';
import {classnames, getPrefixCls} from '../../util';

type IInputProps = {
  className?: string;
  value: string;
  onChange?: (e: string) => void;
  placeholder?: string;
}

export const Input = (props: IInputProps) => {
  const {value = '', onChange, className = '', placeholder = ''} = props;
  const ref = useRef(null);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    typeof onChange === 'function' ? onChange(e.currentTarget.value) : '';
  }, [value]);

  return <input
    value={value}
    ref={ref}
    type="text"
    onChange={onInputChange}
    className={classnames(getPrefixCls('input-text'), className)}
    placeholder={placeholder}
  />
}
