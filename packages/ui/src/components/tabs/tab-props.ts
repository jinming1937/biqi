export interface ITabItemProps {
  className?: string
  style?: object
  closeable?: boolean
}

export interface ITabsProps {
  className?: string
  style?: object
  children: ITabItemProps
}
