import { isBoolean, isNumber, isString } from './utils'
const isBase = (val: unknown): val is null|number | undefined | boolean => val === null || isNumber(val) || isBoolean(val) || val === undefined

export const objToStr = (obj: Record<string, any>): string => {
  let str = '{'
  for (const strKey in obj) {
    const value = obj[strKey]
    if (isString(value)) { str += `${strKey}: '${value}',` }
    else if (isBase(value)) { str += `${strKey}: ${value},` }
    else if (Array.isArray(value)) {
      str += `${strKey}: [`
      for (const item of value) {
        if (isString(item))
          str += `'${item}',`
        else if (isBase(item))
          str += `${item},`
        else
          str += `${objToStr(item)},`
      }
      str += '],'
    }
    else {
      str += `${strKey}: ${objToStr(value)},`
    }
  }
  return `${str}}`
}
