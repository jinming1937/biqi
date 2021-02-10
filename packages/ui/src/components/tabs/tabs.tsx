import * as React from 'react'
import {classnames, getPrefixCls} from '../../util'
import {ITabItemProps, ITabsProps} from './tab-props'

export interface TabsState {}

export class Tabs extends React.Component<ITabsProps, TabsState> {
  constructor(props: ITabsProps) {
    super(props)
    this.state = {}
  }

  renderTabBar(children: ITabItemProps[] | ITabItemProps) {
    return <div>111</div>
  }

  render() {
    const {className = '', style = {}, children} = this.props
    return (
      <div className={classnames(getPrefixCls('tabs'), className)} style={style}>
        {this.renderTabBar(children)}
        {children}
      </div>
    )
  }
}
