import type { MarkdownOptions } from 'vitepress'

export interface UserOptions {
  base?: string
  wrapper?: string
  markdown?: MarkdownOptions
  /**
   * support transform code to vue component extra
   * @default ['.vue', '.tsx', '.jsx']
   */
  includeExt?: string[]
  aliasName?: string
}

export interface DemoAttr{
  title?: string
  desc?: string
  src?: string
  raw?: boolean
  link?: string
  ext?: string
  code?: string
  highlight?: string
}
