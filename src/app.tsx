import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import * as UI from '@biqi/ui'

export type EPage =  'bubble' | 'calendar' | 'input'

export type IMenuItem = {
  name: string;
  link: string;
  page: EPage;
}

export const MenuList: IMenuItem[] = [
  {name: '气泡', link: '/bubble', page: 'bubble'},
  {name: '日历', link: '/calendar', page: 'calendar'},
  {name: '文本框', link: '/input', page: 'input'},
]


const Page = {
  bubble: UI.Bubble,
  calendar: UI.Calendar,
  input: UI.Input
}

const home = () => {
  return (
    <div>
      home
    </div>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={home} />
          {
            MenuList.map((item, index) => <Route key={index} path={item.link} component={Page[item.page]}/>)
          }
          <Route render={() => <div>没有找到您想要的组件</div>}/>
        </Switch>
      </>
    )
  }
}
