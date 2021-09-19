import React from 'react'
import {Route, Switch, Redirect, Link} from 'react-router-dom'
import {classnames} from '@biqi/ui/src/util'
import * as Demo from './page'

export enum EPage {
  bubble = 'bubble',
  calendar = 'calendar',
  input = 'input',
  page = 'page',
  table = 'table'
}

export type IMenuItem = {
  name: string
  link: string
  page: EPage
}

export const MenuList: IMenuItem[] = [
  {name: '气泡', link: '/bubble', page: EPage.bubble},
  {name: '日历', link: '/calendar', page: EPage.calendar},
  {name: '文本框', link: '/input', page: EPage.input},
  {name: '分页', link: '/page', page: EPage.page},
  {name: '表格', link: '/table', page: EPage.table}
]

const Page = {
  [EPage.bubble]: Demo.Bubble,
  [EPage.calendar]: Demo.Calendar,
  [EPage.input]: Demo.Input,
  [EPage.page]: Demo.Page,
  [EPage.table]: Demo.Table
}

const home = () => <div>home</div>

const LeftMenu = () => (
  <ul className="menu">
    {MenuList.map((item, index) => (
      <li key={index}>
        <Link className={classnames({active: window.location.pathname === item.link})} to={item.link}>
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
)

export default class App extends React.Component {
  render() {
    return (
      <>
        <nav className="nav">
          <h3>@biqi UI</h3>
        </nav>
        <div className="section">
          <LeftMenu />
          <div className="content">
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={home} />
              {MenuList.map((item, index) => (
                <Route key={index} path={item.link} component={Page[item.page]} />
              ))}
              <Route render={() => <div>没有找到您想要的组件</div>} />
            </Switch>
          </div>
        </div>
      </>
    )
  }
}
