export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is object => Object.prototype.toString.call(val) === '[object Object]'

export const mergeObject = (target: Record<string, any>, source: Record<string, any>) => {
  for (const key in source) {
    if (key === 'comp')
      continue

    if (isObject(target[key]) && isObject(source[key]))
      mergeObject(target[key], source[key])

    else
      target[key] = source[key]
  }
}
