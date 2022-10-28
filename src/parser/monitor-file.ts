import type { Parser } from './index'

export const monitorFile = async(md: Parser) => {
  // TODO: 监听文件变化
  md?.server?.watcher?.on('change', (path) => {
    console.log(path, 'change')
  })
  md.server?.watcher?.on('unlink', (path) => {
    console.log(path, 'unlink')
  })
  md.server?.watcher?.on('add', (path) => {
    console.log(path, 'add')
  })
}
