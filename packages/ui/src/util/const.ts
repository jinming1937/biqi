export const prefixCls = 'biqi'

export const getPrefixCls = (clas: string, com?: string) => (com ? `${prefixCls}-${com}-${clas}` : `${prefixCls}-${clas}`)
