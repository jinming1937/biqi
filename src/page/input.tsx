import React, {useEffect, useCallback, useState} from 'react'
import {Input, Divider, Button} from '@biqi/ui'

export const Demo = () => {
  const ref = React.useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  useEffect(() => {
    // console.l
    ref.current?.focus()
  }, [])

  const onClick = useCallback(() => {
    ref.current?.focus()
    console.log(ref.current)
  }, [])

  const onChange = useCallback((val: string) => setValue(val), [value])

  return (
    <div className="demo">
      <Divider>
        <h3>normal</h3>
      </Divider>
      <Input value={value} onChange={onChange} placeholder="请输入..." />
      <Divider>
        <h3>disabled</h3>
      </Divider>
      <Input value="123" disabled={true} />
      <Divider>
        <h3>ref</h3>
      </Divider>
      <Button onClick={onClick}>11111</Button>
      <Input value="" ref={ref} placeholder="自动获取焦点" />
    </div>
  )
}
