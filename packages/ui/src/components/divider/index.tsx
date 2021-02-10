import React from 'react'
import {classnames, getPrefixCls} from '../../util'

type mode = 'vertical' | 'horizontal'

export interface IDivider {
  children?: React.ReactNode
  className?: string
  mode?: mode
  style?: object
}

export const Divider = (props: IDivider) => {
  const {className, children, mode = 'horizontal', ...restProps} = props
  const cls = classnames(getPrefixCls('divider'), getPrefixCls(`divider-${mode}`), className)
  return (
    <div className={cls} {...restProps}>
      {children ? <span className={getPrefixCls('')}>{children}</span> : null}
    </div>
  )
}
