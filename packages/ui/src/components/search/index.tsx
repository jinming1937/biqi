import React, { Component } from 'react'
import {classnames, getPrefixCls} from '../../util';

type SearchProps = {
  value: string;
  placeholder?: string;
  onChange: (val: string) => void
  onSend: (val: string) => void
}
type SearchState = {
  isValid: boolean
}
export class Search extends Component<SearchProps, SearchState> {
  inputRef: HTMLInputElement | null;
  constructor(props: SearchProps) {
    super(props);
    this.state = {isValid: true};
    this.inputRef = null as HTMLInputElement | null
  }

  ref = (ref: HTMLInputElement | null) => {
    this.inputRef = ref;
  }

  onSeachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // todo get history  自动补全
    this.props.onChange(e.target.value);
    this.setState({isValid: e.target.value !== ''})
  }

  onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (this.props.value.trim() !== '') {
        console.log('searching ...')
        this.props.onSend(this.props.value);
      } else {
        this.setState({isValid: false})
      }
    }
  }

  render() {
    const {value= "", placeholder= ""} = this.props;
    const {isValid = true} = this.state
    return (
      <input maxLength={30} placeholder={placeholder} ref={this.ref} className={classnames(getPrefixCls("searchBox"), {[getPrefixCls("redBox")]: !isValid})} value={value} onChange={this.onSeachChange} onKeyDown={this.onEnter}/>
    )
  }
}
