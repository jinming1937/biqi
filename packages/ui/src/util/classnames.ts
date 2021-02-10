type ClassValue = {[key: string]: boolean} | string | undefined

export const classnames = (...classValues: ClassValue[]) => {
  if (classValues.length === 0) return ''
  return classValues
    .map((classes: ClassValue) => {
      switch (typeof classes) {
        case 'object':
          return Object.keys(classes)
            .filter(item => classes[item])
            .join(' ')
            .trim()
        case 'string':
          return classes
        case 'undefined':
          return ''
      }
    })
    .join(' ')
    .trim()
}
