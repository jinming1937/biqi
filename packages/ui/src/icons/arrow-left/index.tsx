import * as React from 'react'
import {classnames, getPrefixCls} from '../../util'
import {IIconProps} from '../icon-type'

export const ArrowLeft = (props: IIconProps) => {
  const {className = '', style} = props
  return (
    <span className={classnames(getPrefixCls('arrow'), className)} style={style}>
      <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <path d="M10 0 L2 7 L10 14" stroke="#009aff" strokeWidth="1" fill="none" />
      </svg>
    </span>
  )
}
