import type { PluginOption, ResolvedConfig } from 'vite'
import type { MarkdownRenderer } from 'vitepress'
import { createMarkdownRenderer } from 'vitepress'
import { normalizePath } from 'vite'
import type { UserOptions } from './typing'
import { Parser } from './parser'

const vitePluginVitepressDemo = (_opt?: UserOptions): PluginOption => {
  let config: ResolvedConfig
  const options: UserOptions = Object.assign({}, _opt)
  let md: MarkdownRenderer
  let parser: Parser
  const aliasName = options.aliasName ?? '/@/VITEPRESS_DEMO'
  const virtualModule = 'virtual:vitepress-demo'
  const virtualModuleId = `\0${virtualModule}`
  return {
    name: 'vite-plugin-vitepress-demo',
    config(config) {
      const path = normalizePath(options.base || config.root || process.cwd())
      return {
        resolve: {
          alias: {
            [aliasName]: path,
          },
        },
      }
    },
    async configResolved(_config) {
      config = _config
      md = await createMarkdownRenderer(config.root, options?.markdown ?? {}, config.base ?? '/')
      parser = new Parser(options, config, md)
    },
    resolveId(id) {
      if (id === virtualModule)
        return virtualModuleId
    },
    async transform(code, id) {
      return await parser.transform(code, id)
    },
    load(id) {
      if (id === virtualModuleId)
        return parser.load()
    },
  }
}

export {
  vitePluginVitepressDemo,
}

export default vitePluginVitepressDemo
