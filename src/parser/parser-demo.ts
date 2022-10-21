import { extname } from 'path'
import type { Node, NodeTag } from 'posthtml-parser'
import { parser } from 'posthtml-parser'
import { render } from 'posthtml-render'
import fsExtra from 'fs-extra'
import type { DemoAttr } from '../typing'
import type { Parser } from './index'

/**
 * @description: parse demo to code
 * @param src
 * @param md
 */
const parserSrc = async(src: string, md: Parser): Promise<string | undefined> => {
  const demoPath = md.getDemoPath(src)
  const fullPath = md.getFullPath(src)
  if (md.cacheSrcCode.has(demoPath))
    return md.cacheSrcCode.get(demoPath)
  // check file exist
  const isExist = await fsExtra.pathExists(fullPath)
  if (isExist) {
    const code = await fsExtra.readFile(fullPath, 'utf-8')
    if (code) {
      // read cache
      md.cacheSrcCode.set(demoPath, code)
      return code
    }
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
    highlight: code ? md.renderCode(code, ext.slice(1)) : undefined,
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

const generateDemo = (demo: string, attrs: DemoAttr, node: NodeTag, nodes: Node[], md: Parser) => {
  const src = md.getDemoPath(attrs.src)
  node.attrs = {
    src,
  } as Record<string, any>
  const html = render(nodes)
  if (attrs.code)
    attrs.code = encodeURIComponent(attrs.code as string)
  if (attrs.highlight)
    attrs.highlight = encodeURIComponent(attrs.highlight as string)

  md.setCache(src, attrs)
  md.replaceCode(demo, html)
}

export const parserDemo = async(demos: string[], md: Parser) => {
  const deduplicateDemos = [...new Set(demos || [])]
  for (const demo of deduplicateDemos) {
    const nodes: Node[] = parser(demo)
    const node: NodeTag = nodes[0] as NodeTag
    const attrs = await parserAttr(md, node.attrs)
    if (attrs.raw || !md.checkSupportExt(attrs.ext)) {
      // 当前是源码模式
      checkRaw(demo, attrs, md)
    }
    else {
      // 当前不是raw模式
      generateDemo(demo, attrs, node, nodes, md)
    }
  }
}
