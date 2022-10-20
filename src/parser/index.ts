import type { MarkdownRenderer } from 'vitepress'
import type { ResolvedConfig } from 'vite'
import type { UserOptions } from '../typing'
import { getDemo } from './get-demo'

export class Parser {
  public wrapper = 'demo'

  constructor(public options: UserOptions, public config: ResolvedConfig, public md: MarkdownRenderer) {
    if (options.wrapper)
      this.wrapper = options.wrapper
  }

  public checkWrapper(token: string): boolean {
    const REGEX_DEMO = new RegExp(`<${this.wrapper}.*?>(.*?)</${this.wrapper}>`, 'gis')
    const REGEX_DEMO1 = new RegExp(`<${this.wrapper}.*?/>`, 'gis')
    return REGEX_DEMO.test(token) || REGEX_DEMO1.test(token)
  }

  private checkFile(id: string): boolean {
    return id.endsWith('.md')
  }

  public transform(code: string, id: string): string | undefined {
    if (!this.checkFile(id))
      return undefined
    const env = {}
    const tokens = this.md.parse(code, env)
    getDemo(tokens, this)
    return undefined
  }
}
