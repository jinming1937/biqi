import React, {useCallback, useState} from 'react'
import {Page} from '@biqi/ui'

export const Demo = () => {
  const [page, setPage] = useState(1)
  const onPageChange = useCallback((index: number) => {
    console.log(index)
    setPage(index)
  }, [])
  return <Page page={page} total={325} pageSize={10} onPageChange={onPageChange} />
}
