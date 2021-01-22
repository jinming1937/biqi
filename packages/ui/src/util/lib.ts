/**
 * get the last day of the month
 * @param {Number} y year
 * @param {Number} m month
 */
export const getLastDateFromMonth = (y: number, m: number) => {
  m += 1
  switch (m) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31
    case 4:
    case 6:
    case 9:
    case 11:
      return 30
    case 2:
      return y % 4 && !(y % 400) ? 28 : 29
    default:
      return 31
  }
}
