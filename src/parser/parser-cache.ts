import type { CacheStore } from '../typing'

export const decodeData = (str: string |undefined): string | undefined => {
  if (!str) return undefined
  return decodeURIComponent(str)
}

export const encodeData = (str: string |undefined): string | undefined => {
  if (!str) return undefined
  return encodeURIComponent(decodeData(str)!)
}

export const parserCache = (obj: CacheStore): CacheStore => {
  return {
    ...obj,
    code: encodeData(obj.code) as string,
    highlight: encodeData(obj.highlight),
    docs: obj.docs?.map((item) => {
      return {
        ...item,
        desc: encodeData(item.desc),
        title: encodeData(item.title),
      }
    }),
  }
}
