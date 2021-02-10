import React, {useEffect, useState, useMemo} from 'react'
import ReactDOM from 'react-dom'
import {classnames, getPrefixCls} from '../../util'

type IBubbleProps = {
  children: JSX.Element | JSX.Element[] | null
  isShow: boolean
  hasBorder?: boolean
}

export const Bubble = (props: IBubbleProps) => {
  const {children, isShow, hasBorder = true} = props

  const [ele, setEle] = useState<HTMLDivElement>()

  useMemo(() => {
    console.log('bubble init')
    const ele = document.createElement('div')
    document.getElementsByTagName('body')[0].appendChild(ele)
    setEle(ele)
  }, [])

  // useEffect(() => {
  //   const cls = classnames(getPrefixCls("bubble"), getPrefixCls("rightTop"), isShow ? getPrefixCls("right2Left") : '');
  //   if(ele) ele.className = cls;
  // }, [isShow]);

  // useEffect(() => {
  //   console.log('render children');
  //   const element = (
  //     <div>
  //       {children}
  //     </div>
  //   );

  //   if (ele) {
  //     ReactDOM.render(element, ele);
  //   }
  // }, [children]);

  useEffect(() => {
    console.log('bubble render children')
    const cls = classnames(getPrefixCls('bubble'), getPrefixCls('rightTop'), {[getPrefixCls('hasBorder')]: hasBorder}, isShow ? getPrefixCls('right2Left') : '')
    const element = <div className={cls}>{children}</div>

    if (ele) {
      ReactDOM.render(element, ele)
    }
  }, [children, isShow])

  return null
}
