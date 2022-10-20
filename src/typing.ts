import type { MarkdownOptions } from 'vitepress'

export interface UserOptions {
  base?: string
  wrapper?: string
  markdown?: MarkdownOptions
}

export interface DemoAttr{
  title?: string
  desc?: string
  src?: string
  raw?: boolean
  link?: string
  ext?: string
  code?: string
}
