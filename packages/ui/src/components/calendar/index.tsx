import React, {Component} from 'react'
import {getLastDateFromMonth, classnames, getPrefixCls} from '../../util'

enum LanguageType {
  En = 'EN',
  Cn = 'CN'
}

type IDates = {
  date: string
  day: number
  today: Date
  dayState: boolean
}

type IMonths = {
  months: IDates[]
  date: string
  today: Date
}

type ISelectedDate = {
  date: string
  valide?: boolean
}

interface ICalendarProps {
  today: Date
  monthCount: number
  isShow: boolean
  onClose?: (e: MouseEvent) => void
  eventSelectDay?: (data: ISelectedDate) => void
}

interface ICalendarState {
  months: IMonths[]
  weeks: string[]
  defDate: string
}

export class Calendar extends Component<ICalendarProps, ICalendarState> {
  static getLastDaysFromMonth = () => getLastDateFromMonth(new Date().getFullYear(), new Date().getMonth()) - new Date().getDate()
  static getLastDaysFromYear = () => {
    const newDate = new Date()
    const fullYear = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const date = newDate.getDate()
    let remainsDaysMonth = getLastDateFromMonth(fullYear, month) - date
    for (let times = 0; times < 12 - month; times++) {
      remainsDaysMonth += getLastDateFromMonth(fullYear, month + times)
    }
    return remainsDaysMonth
  }
  constructor(props: ICalendarProps) {
    // 由于是在constructor 里做的初始化，所以父组件update 的时候，这里不变
    super(props)
    let today = this.props.today // new Date(2018,9,15);
    let aimMonthArray = this.getMonthGroup(this.props.monthCount, today)
    let weekBar = this.getWeekGroup(LanguageType.Cn)

    this.onCloseHandler = this.onCloseHandler.bind(this)
    // console.log(JSON.stringify(aimMonthArray));
    this.state = {
      months: aimMonthArray,
      weeks: weekBar,
      defDate: today
        .toLocaleDateString()
        .replace(/\//g, '-')
        .replace(/(\b\d\b)/g, '0$1')
    }
  }
  onCloseHandler(e: MouseEvent) {
    // console.log('calendar:e', e);
    typeof this.props.onClose === 'function' ? this.props.onClose(e) : ''
  }
  eventSelectDay(data: ISelectedDate) {
    if (data.valide && this.props.eventSelectDay) {
      this.props.eventSelectDay({
        date: data.date
      })
    }
  }

  shouldComponentUpdate(nextProps: ICalendarProps, nextState: ICalendarState) {
    return nextProps.monthCount !== this.props.monthCount
  }

  /**
   * component register
   */
  componentDidMount() {
    // this.timerID = setInterval(
    //     () => this.tick(),
    //     1000
    // );
    console.log(this.props.isShow) // init false
  }
  /**
   * component unload
   */
  componentWillUnmount() {
    // clearInterval(this.timerID);
  }
  /**
   * get months' group
   * @param {Number} num months'
   * @param {Date} date default start date
   */
  getMonthGroup(num = 1, date = new Date()) {
    let monthArray = []
    let cacheToDay = new Date(Number(date))
    while (num--) {
      monthArray.push({
        months: this.getDayGroup(cacheToDay),
        date: cacheToDay.getFullYear() + '-' + (cacheToDay.getMonth() + 1 + '').replace(/^(\d)$/, '0$1'),
        today: date
      })
      cacheToDay.setDate(
        // must be setDate
        getLastDateFromMonth(cacheToDay.getFullYear(), cacheToDay.getMonth()) + 1 // the first day of next month
      )
    }
    return monthArray
  }
  /**
   * get week tap array
   * @param {String} lang language
   */
  getWeekGroup(lang: LanguageType) {
    const week = {
      EN: 'Sun Mon Thr Web Thi Fri Sur',
      CN: '日 一 二 三 四 五 六'
    }
    return week[lang].split(/\s/)
  }
  /**
   * get some months' day
   * 0   1  2  3  4  5  6
   * 30  1  2  3  4  5  6
   * ... 3 * 7
   * 28 29 30 31  1  2  3
   * @param {Date} date start date
   */
  getDayGroup(date = new Date()) {
    const today = new Date(Number(date))
    const firstDayOfMonth = new Date(new Date(Number(date)).setDate(1))
    const lastDay = getLastDateFromMonth(today.getFullYear(), today.getMonth())
    const lastDayOfMonth = new Date(new Date(Number(date)).setDate(lastDay))
    const weekOfFirstDay = firstDayOfMonth.getDay()
    const dateArray = []
    const count = lastDay === 28 && weekOfFirstDay === 0 ? 28 : weekOfFirstDay >= 5 && lastDay > 29 ? 42 : 35
    for (let t = 0; t < count; t++) {
      let beginDate = new Date(new Date(Number(date)).setDate(1 - weekOfFirstDay + t))
      dateArray.push({
        date: beginDate.getFullYear() + '-' + (beginDate.getMonth() + 1 + '').replace(/^(\d)$/, '0$1') + '-' + (beginDate.getDate() + '').replace(/^(\d)$/, '0$1'),
        day: beginDate.getDate(),
        today: beginDate, ///// only one
        dayState: +beginDate - +firstDayOfMonth < 0 || +beginDate - +lastDayOfMonth > 0
      })
    }
    return dateArray
  }
  render() {
    console.log('render')
    return (
      <div className={this.props.isShow ? getPrefixCls('calendar') : getPrefixCls('hide')}>
        <div className={getPrefixCls('navbar')}>
          <div className={getPrefixCls('navbarTitle')}>选择日期</div>
          {/* <div className={getPrefixCls("navbar")-right}>
                        <a onClick={this.onCloseHandler}>关闭</a>
                    </div> */}
        </div>
        <ul className={getPrefixCls('weekNav')}>
          {this.state.weeks.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className={getPrefixCls('daySelectBox')}>
          {this.state.months.map((item: IMonths, index) => (
            <section className={getPrefixCls('monthArea')} key={index}>
              <header className={getPrefixCls('monthTitle')}>{item.date}</header>
              <ul className={getPrefixCls('dayArea')}>
                {item.months.map((it: IDates, ind) => (
                  <li key={ind} className={+it.today - +item.today < 0 ? getPrefixCls('disabled') : it.date === this.state.defDate && !it.dayState ? getPrefixCls('active') : ''}>
                    {!it.dayState ? (
                      <span
                        onClick={() => {
                          console.log(it.date)
                          this.setState({defDate: it.date})
                          this.eventSelectDay({date: it.date, valide: +it.today - +item.today >= 0})
                        }}>
                        {it.day}
                      </span>
                    ) : (
                      ''
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    )
  }
}
