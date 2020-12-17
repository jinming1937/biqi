import * as React from 'react'
import {IIconProps} from '../icon-type'
import {classnames, getPrefixCls} from '../../util'

export const ArrowRight = (props: IIconProps) => {
  const {className = '', style} = props
  return (
    <span className={classnames(getPrefixCls('arrow'), className)} style={style}>
      <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version='1.1'>
        <path d="M4 0 L12 7 L4 14" stroke="#009aff" strokeWidth="1" fill="none"/>
      </svg>
    </span>
  )
}
