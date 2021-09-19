import React from 'react'
import {getPrefixCls} from '../../util'

export type IAlign = 'center' | 'left' | 'right'

export interface IColumns<T> {
  title?: string
  width?: number
  dataIndex?: keyof T
  align?: IAlign
  render?: (row: T) => JSX.Element | string | null
}

export interface TableProps<T> {
  datasource: T[]
  columns: IColumns<T>[]
}

export interface TableState {}

export class Table<T> extends React.Component<TableProps<T>, TableState> {
  constructor(props: TableProps<T>) {
    super(props)
  }
  renderTableHeader() {
    const {columns} = this.props
    return (
      <div className={getPrefixCls('theader')}>
        {columns.map((item, index) => {
          const style: React.CSSProperties = {
            textAlign: item.align || 'right'
          }
          if (item.width) {
            style.width = `${item.width}px`
          } else {
            style.flex = 1
          }
          return (
            <div className={getPrefixCls('columnItem')} key={`${item.dataIndex}-${index}`}>
              <div className={getPrefixCls('cell')} style={style}>
                {item.title || item.dataIndex}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  renderTableBody() {
    const {datasource} = this.props
    return <div className={getPrefixCls('tbody')}>{datasource.length > 0 ? datasource.map((rowData, index) => this.renderRow(rowData, index)) : null}</div>
  }

  renderRow(rowData: T, index: number) {
    const {columns} = this.props
    return (
      <div key={index} className={getPrefixCls('rowItem')}>
        {columns.map((item, index) => {
          const style: React.CSSProperties = {
            textAlign: item.align || 'right'
          }
          if (item.width) {
            style.width = `${item.width}px`
          } else {
            style.flex = 1
          }
          return (
            <div className={getPrefixCls('columnItem')} key={`${item.dataIndex}-${index}`}>
              <div className={getPrefixCls('cell')} style={style}>
                {typeof item.render === 'function' ? item.render(rowData) : item.dataIndex ? rowData[item.dataIndex] : ''}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  renderTableFooter() {
    return <div className={getPrefixCls('footer')}></div>
  }
  render() {
    return (
      <div className={getPrefixCls('table')}>
        <div className={getPrefixCls('table-area')}>
          {this.renderTableHeader()}
          {this.renderTableBody()}
        </div>
      </div>
    )
  }
}
