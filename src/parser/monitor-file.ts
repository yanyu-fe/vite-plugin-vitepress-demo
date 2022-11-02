import { normalizePath } from 'vite'
import type { Parser } from './index'

export const monitorFile = async(md: Parser) => {
  // TODO: 监听文件变化
  md?.server?.watcher?.on('change', async(_path) => {
    const path = normalizePath(_path)
    const src = md.getDemoPath(path)
    md.server?.ws?.send('vitepress-demo:change', {
    })
  })
  md.server?.watcher?.on('unlink', (path) => {
    // console.log(path, 'unlink')
  })
  md.server?.watcher?.on('add', () => {
    const modules = md.server?.moduleGraph?.getModulesByFile(md.moduleId)
    modules?.forEach((module) => {
      md.server?.moduleGraph.invalidateModule(module)
    })
    md.server?.ws?.send({
      type: 'full-reload',
    })
  })
}
