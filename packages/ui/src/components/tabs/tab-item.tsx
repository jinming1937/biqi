import * as React from 'react'
import {classnames, getPrefixCls} from '../../util'
import {ITabItemProps} from './tab-props'

export interface TabItemState {}

export class TabItem extends React.Component<ITabItemProps, TabItemState> {
  constructor(props: ITabItemProps) {
    super(props)
    this.state = {closeable: false}
  }
  render() {
    return <div className={getPrefixCls('tabItem')}></div>
  }
}
