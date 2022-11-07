import { extname } from 'path'
import type { Node, NodeTag } from 'posthtml-parser'
import { parser } from 'posthtml-parser'
import { render } from 'posthtml-render'
import type { CacheStore, DemoAttr } from '../typing'
import { decodeData } from './parser-cache'
import type { Parser } from './index'

/**
 * @description: parse demo to code
 * @param src
 * @param md
 */
const parserSrc = async(src: string, md: Parser): Promise<CacheStore | undefined> => {
  const demoPath = md.getDemoPath(src)
  const relativePath = md.getBaseDemoPath(demoPath)
  if (md.cacheStore.has(relativePath)) {
    return md.cacheStore.get(relativePath)
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
  const code1 = await parserSrc(attrs.src, md)
  const code = code1?.code
  const docs: any[] = code1?.docs ?? []
  const title = docs.length > 0 ? docs[0].title : attrs?.title
  const desc = docs.length > 0 ? docs[0].desc : attrs?.desc
  const highlight = code1?.highlight
  return {
    raw,
    title,
    desc,
    src: attrs.src,
    link: attrs.link,
    ext,
    code,
    highlight,
  }
}

const checkRaw = (demo: string, attrs: DemoAttr, md: Parser) => {
  const ext = attrs?.ext?.slice(1) ?? 'html'
  const code = attrs.code ?? ''
  if (code) {
    const codeInfo = md.renderCode(decodeData(code)!, ext, false)
    md.replaceCode(demo, codeInfo)
  }
}

const generateDemo = (demo: string, attrs: DemoAttr, node: NodeTag, nodes: Node[], md: Parser) => {
  let src = md.getDemoPath(attrs.src)
  src = src.startsWith('/') ? src : `/${src}`
  const liveCodeOption: Record<string, any> = {}
  if (md.options?.codeSandBox?.url) {
    liveCodeOption.codeSandBox = {
      ':codeSandBox': md.options.codeSandBox.url,
    }
  }
  if (md.options?.stackblitz?.url) {
    liveCodeOption.stackblitz = {
      ':stackblitz': md.options.stackblitz.url,
    }
  }
  node.attrs = {
    src,
    link: attrs.link,
    ...liveCodeOption,
  } as Record<string, any>
  const html = render(node)
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
