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
    enforce: 'pre',
    config(config) {
      const path = normalizePath(options.base || config.root || process.cwd())
      return {
        resolve: {
          alias: {
            [aliasName]: path,
          },
        },
        ssr: {
          noExternal: ['vite-plugin-vitepress-demo'],
        },
      }
    },
    async buildStart() {
      parser.cacheStore.clear()
      await parser.buildCache()
    },
    async configResolved(_config) {
      config = _config
      md = await createMarkdownRenderer(config.root, options?.markdown ?? {}, config.base ?? '/')
      parser = new Parser(options, config, md)
    },
    async configureServer(server) {
      await parser.setupServer(server)
    },
    resolveId(id) {
      if (id === virtualModule)
        return virtualModuleId
    },
    async transform(code, id) {
      if (id.endsWith(`lang.${parser.blockName}`))
        return 'export default {}'

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

export const VitePluginVitepressDemo = vitePluginVitepressDemo

export default vitePluginVitepressDemo
