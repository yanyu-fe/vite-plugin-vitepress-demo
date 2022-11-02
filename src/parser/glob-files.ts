import fg from 'fast-glob'
import fsExtra from 'fs-extra'
import type { CacheStore } from '../typing'
import type { Parser } from './index'
export const globFiles = async(md: Parser) => {
  const files = await fg(md.glob, {
    cwd: md.basePath,
  })
  /**
     * 拿到文件对文件进行缓存
     */
  for (const file of files) {
    // 读取文件内容，对文件内容进行解析，并且缓存
    const relativePath = md.getBaseDemoPath(file)
    const fullPath = md.getFullPath(file, true)
    const code = await fsExtra.readFile(fullPath, 'utf-8')
    const storeItem: CacheStore = {
      relativePath,
      code,
    }
    /**
     * 存储文件内容信息
     */
    md.cacheStore.set(relativePath, storeItem)
  }
}
