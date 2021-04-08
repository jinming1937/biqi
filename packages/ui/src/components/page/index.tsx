import React, {Fragment, ReactNode} from 'react'
import {classnames, getPrefixCls} from '../../util'
import {ArrowLeft, ArrowRight} from '../../icons'
import {Input} from '../input'

interface IPageItem {
  disabled?: boolean
  label: string
  index: number
  childEle: ReactNode
}

const PLACEHOLDER = '...'

function getPageItemData(page: number): IPageItem {
  return {
    label: `${page}`,
    index: page,
    childEle: <span>{page}</span>
  }
}

function getPageItemPlaceHolder(page: number): IPageItem {
  return {
    label: PLACEHOLDER,
    index: page,
    childEle: <span className={getPrefixCls('page-apostrophe-cell')}>{PLACEHOLDER}</span>
  }
}

/**
 * 获取分页页码
 *
 * @param {number} index 当前页码
 * @param {number} pageCount 总页码
 * @param {number} wrapNums 当前页 左右两边显示的数字个数
 * @returns {IPageItem[]} 页面页码集合
 */
function getPaginationList(index: number, pageCount: number, wrapNums: number): IPageItem[] {
  const blockLength = wrapNums * 2 + 1
  const maxBlockIndex = Math.max(pageCount - blockLength, 0)
  const blockStartIndex = Math.max(index - wrapNums - 1, 0)
  const blockEndIndex = blockStartIndex + blockLength - 1
  const pagerItemList = new Array<IPageItem>()
  if (maxBlockIndex < 2) {
    pagerItemList.push(...generatePageItem(1, pageCount))
  } else {
    if (blockStartIndex < maxBlockIndex) {
      if (blockStartIndex < 2) {
        pagerItemList.push(...generatePageItem(1, blockEndIndex + 1))
      } else {
        pagerItemList.push(getPageItemData(1))
        pagerItemList.push(getPageItemPlaceHolder(blockStartIndex))
        pagerItemList.push(...generatePageItem(blockStartIndex + 1, blockEndIndex + 1))
      }
      if (pageCount - blockEndIndex - 1 - 1 > 0) {
        pagerItemList.push(getPageItemPlaceHolder(blockEndIndex + 1 + 1))
      }
      pagerItemList.push(getPageItemData(pageCount))
    } else {
      pagerItemList.push(getPageItemData(1))
      pagerItemList.push(getPageItemPlaceHolder(blockStartIndex))
      pagerItemList.push(...generatePageItem(maxBlockIndex + 1, pageCount))
    }
  }

  pagerItemList.unshift({
    disabled: index === 1,
    label: '<',
    index: -1,
    childEle: <ArrowLeft className={getPrefixCls('page-arrow-left')} />
  })
  pagerItemList.push({
    disabled: index === pageCount,
    label: '>',
    index: -2,
    childEle: <ArrowRight className={getPrefixCls('page-arrow-right')} />
  })
  return pagerItemList
}

/**
 * 生成连续页码集合
 *
 * @param {number} start 开始页码
 * @param {number} end 结束页码
 * @returns {IPageItem[]} 页码集合
 */
function generatePageItem(start: number, end: number): IPageItem[] {
  const paginationList = new Array<IPageItem>()
  for (let i = start; i <= end; i++) {
    paginationList.push(getPageItemData(i))
  }
  return paginationList
}

export interface IPageProps {
  showTotal?: boolean
  showJump?: boolean
  disabled?: boolean
  useText?: boolean
  pageSize?: number
  className?: string
  wrapNums?: number
  pageSizeList?: number[]
  page: number
  total: number
  renderTotal?: (total: number) => ReactNode
  onPageSizeChange?: (page: number, pageSize: number) => void
  onPageChange: (index: number) => void
}

export interface IPageState {
  inputVal: string
}

export class Page extends React.Component<IPageProps, IPageState> {
  constructor(props: IPageProps) {
    super(props)
    this.state = {inputVal: ''}
  }
  onItemClick = (idx: number): void => {
    const {page = 1, total, pageSize = 10} = this.props
    const pageCount = Math.ceil(total / pageSize)
    const next = page + 1
    const pre = page - 1
    switch (idx) {
      case -1:
        // 上一页
        pre > 0 && this.setCurrentIndex(pre)
        break
      case -2:
        // 下一页
        next <= pageCount && this.setCurrentIndex(next)
        break
      default:
        idx !== page && this.setCurrentIndex(idx)
        break
    }
  }

  renderPageNumber = (): JSX.Element => {
    const {page = 1, total, pageSize = 10, wrapNums = 2, useText} = this.props
    const pageCount = Math.ceil(total / pageSize)
    const pageItemList = getPaginationList(page, pageCount, wrapNums < 1 ? 1 : Math.ceil(wrapNums))
    return (
      <ul className={getPrefixCls('page-item-group')}>
        {pageItemList.map((item, index) => {
          const basicClass = useText ? getPrefixCls('page-text-cls') : getPrefixCls('page-item-cls')
          const disCls = classnames({
            [basicClass]: !isNaN(Number(item.label)) || item.index < 0,
            [getPrefixCls('page-item-checked')]: item.index === page,
            [getPrefixCls('page-item-disabled')]: item.disabled === true || (total === 0 && pageCount === 0)
          })
          return (
            <li key={index} className={disCls} onClick={() => this.onItemClick(item.index)}>
              {item.childEle}
            </li>
          )
        })}
      </ul>
    )
  }

  renderPageSizeSelector = (): JSX.Element | null => {
    const {pageSizeList = [], pageSize = 10, disabled} = this.props
    const maxPageSizeLen = pageSizeList.length > 0 ? Math.max(...pageSizeList).toString().length : 0
    const pagerSelectWidth = `${88 + (maxPageSizeLen >= 2 ? (maxPageSizeLen - 2) * 7 : 0)}px`
    if (pageSizeList.length) {
      return (
        <select value={pageSize} style={{width: pagerSelectWidth}} disabled={disabled} onChange={this.onSelectChange}>
          {pageSizeList.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      )
    }
    return null
  }

  resetInputVal = (): void => {
    let index: number
    const {total, pageSize = 10} = this.props
    const pageCount = Math.ceil(total / pageSize)
    const {inputVal} = this.state
    const numInputVal = +inputVal
    if (numInputVal > 0) {
      index = numInputVal > pageCount ? pageCount : numInputVal
      this.setCurrentIndex(index)
    }
    this.setState({inputVal: ''})
  }

  // onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   this.setState({inputVal: e.target.value})
  // }
  onInputChange = (e: string): void => {
    this.setState({inputVal: e})
  }

  onJumpPageClick = (): void => {
    this.resetInputVal()
  }

  setCurrentIndex = (index: number): void => {
    const {disabled, onPageChange} = this.props
    !disabled && onPageChange && onPageChange(index)
  }

  renderJumpTo = (): JSX.Element | null => {
    const {disabled = false, showJump} = this.props
    const {inputVal = ''} = this.state
    if (!showJump) {
      return null
    }
    return (
      <>
        <span className={getPrefixCls('page-jump-area-cls')}>
          <Input disabled={disabled} value={inputVal} className={getPrefixCls('page-jump-input-cls')} onChange={this.onInputChange} />
        </span>
        <span className={getPrefixCls('page-jump-cls')} onClick={this.onJumpPageClick}>
          跳转
        </span>
      </>
    )
  }

  onSelectChange = (e?: React.ChangeEvent<HTMLSelectElement>) => {
    const jumpSize = e?.target.value
    const {page = 1, total = 0, onPageSizeChange} = this.props
    if (!jumpSize) {
      return
    }
    const newPageCount = Math.ceil(total / +jumpSize)
    const newAutoPage = Math.min(page, newPageCount)
    onPageSizeChange && onPageSizeChange(newAutoPage, +jumpSize)
  }
  getTotal = (): JSX.Element => {
    const {showTotal, renderTotal, total} = this.props
    if (!showTotal) {
      return <Fragment />
    }
    return <span className={getPrefixCls('page-total')}>{typeof renderTotal === 'function' ? renderTotal(total) : total}</span>
  }
  render() {
    const {className} = this.props

    return (
      <div className={classnames(getPrefixCls('page'), className)}>
        {this.getTotal()}
        {this.renderPageNumber()}
        {this.renderPageSizeSelector()}
        {this.renderJumpTo()}
      </div>
    )
  }
}
