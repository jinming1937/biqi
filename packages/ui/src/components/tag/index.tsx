import * as React from 'react'
import {classnames, getPrefixCls} from '../../util'

export interface TagProps<T> {
  datasource: T[]
  onSelect: (val: T) => void
  style?: object
}

export interface TagState {}

export class Tag<T> extends React.PureComponent<TagProps<T>, TagState> {
  colorList: string[]
  constructor(props: TagProps<T>) {
    super(props)
    this.colorList = [getPrefixCls('supBlue'), getPrefixCls('supGray'), getPrefixCls('supRed')]
  }

  onSelectTag = (val: T, index: number) => {
    this.props.onSelect(val)
  }

  getColor(index: number) {
    const ind = index >= this.colorList.length ? index % this.colorList.length : index
    return this.colorList[ind]
  }

  render() {
    const {datasource, style = {}} = this.props
    return (
      <ul className={getPrefixCls('tagBox')} style={style}>
        {datasource.map((item, index) => {
          return (
            <li onClick={() => this.onSelectTag(item, index)} key={index} className={classnames(getPrefixCls('tagItem'), this.getColor(index))}>
              #{item}
            </li>
          )
        })}
      </ul>
    )
  }
}
