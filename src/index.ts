import type { PluginOption, ResolvedConfig } from 'vite'
import type { MarkdownRenderer } from 'vitepress'
import { createMarkdownRenderer } from 'vitepress'
import type { UserOptions } from './typing'
import { Parser } from './parser'

const vitePluginVitepressDemo = (_opt?: UserOptions): PluginOption => {
  let config: ResolvedConfig
  const options: UserOptions = Object.assign({}, _opt)
  let md: MarkdownRenderer
  let parser: Parser
  return {
    name: 'vite-plugin-vitepress-demo',
    async configResolved(_config) {
      config = _config
      md = await createMarkdownRenderer(config.root, options?.markdown ?? {}, config.base ?? '/')
      parser = new Parser(options, config, md)
    },
    async transform(code, id) {
      return await parser.transform(code, id)
    },
  }
}

export {
  vitePluginVitepressDemo,
}

export default vitePluginVitepressDemo
