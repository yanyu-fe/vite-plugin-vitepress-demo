import { describe, expect, it } from 'vitest'
import { objToStr } from '../src/parser/obj-to-str'
const obj1 = {
  a: '1',
  b: 1,
  c: true,
  d: undefined,
  e: null,
  g: ['1', 2, true, undefined, null],
}
describe('obj2str', () => {
  it('should work', () => {
    const str = objToStr(obj1)
    expect(str).toMatchInlineSnapshot('"{a: \'1\',b: 1,c: true,d: undefined,e: null,g: [\'1\',2,true,undefined,null,],}"')
  })
})
