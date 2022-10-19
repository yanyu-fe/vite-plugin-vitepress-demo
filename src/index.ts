import type { PluginOption } from 'vite'
import type { UserOptions } from './typing'

const vitePluginVitepressDemo = (_opt?: UserOptions): PluginOption => {
  return {
    name: 'vite-plugin-vitepress-demo',
  }
}

export {
  vitePluginVitepressDemo,
}

export default vitePluginVitepressDemo
