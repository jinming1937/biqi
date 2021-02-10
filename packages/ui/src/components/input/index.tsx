import React, {forwardRef, useCallback} from 'react'
import {classnames, getPrefixCls} from '../../util'

type IInputProps = {
  className?: string
  disabled?: boolean
  placeholder?: string
  readOnly?: boolean
  value: string
  onChange?: (e: string) => void
}

export const Input = forwardRef((props: IInputProps, ref?: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null) => {
  const {value = '', onChange, className = '', placeholder = '', disabled = false, readOnly = false, ...restProps} = props

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => typeof onChange === 'function' && onChange(e.currentTarget.value), [value])

  const cls = classnames(getPrefixCls('input-text'), {[`${getPrefixCls('input-text')}-disabled`]: disabled}, className)

  return <input value={value} disabled={disabled} readOnly={readOnly} ref={ref} type="text" onChange={onInputChange} className={cls} placeholder={placeholder} {...restProps} />
})
