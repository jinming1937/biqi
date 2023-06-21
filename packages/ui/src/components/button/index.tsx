
import * as React from 'react'
import {classnames, getPrefixCls} from '../../util'

export interface ButtonProps {
  className?: string;
  style?: object;
  disabled?: boolean;
  children: JSX.Element | string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ButtonState {}

export const Button = (props: ButtonProps) => {
  const {children, className = '', style = {}, disabled = false, onClick} = props

  return (
    <button className={classnames(getPrefixCls('button'), {[`${getPrefixCls('button')}-disabled`]: disabled}, className)} style={style} onClick={onClick}>{children}</button>
  )
}
