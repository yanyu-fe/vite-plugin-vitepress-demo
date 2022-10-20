import { extname } from 'path'
import type { Node, NodeTag } from 'posthtml-parser'
import { parser } from 'posthtml-parser'
import fsExtra from 'fs-extra'
import type { DemoAttr } from '../typing'
import type { Parser } from './index'

const parserSrc = async(src: string, md: Parser): Promise<string | undefined> => {
  const demoPath = md.getDemoPath(src)
  const isExist = await fsExtra.pathExists(demoPath)
  if (isExist) {
    return await fsExtra.readFile(demoPath, 'utf-8')
  }
  else {
    console.error(`[vitepress-plugin-demo] ${src} not found`)
    return undefined
  }
}

const parserAttr = async(md: Parser, attrs?: Record<string, any>): Promise<DemoAttr> => {
  if (!attrs)
    return {}
  const raw = Reflect.has(attrs, 'raw')
  const ext = extname(attrs.src)
  const code = await parserSrc(attrs.src, md)
  return {
    raw,
    title: attrs.title,
    desc: attrs.desc,
    src: attrs.src,
    link: attrs.link,
    ext,
    code,
  }
}

const checkRaw = (demo: string, attrs: DemoAttr, md: Parser) => {
  const ext = attrs?.ext?.slice(1) ?? 'html'
  const code = attrs.code ?? ''
  if (code) {
    const codeInfo = md.renderCode(code, ext)
    md.replaceCode(demo, codeInfo)
  }
}

export const parserDemo = async(demos: string[], md: Parser) => {
  for (const demo of demos) {
    const nodes: Node[] = parser(demo)
    const node: NodeTag = nodes[0] as NodeTag
    const attrs = await parserAttr(md, node.attrs)
    if (attrs.raw) {
      // 当前是源码模式
      checkRaw(demo, attrs, md)
    }
  }
}
