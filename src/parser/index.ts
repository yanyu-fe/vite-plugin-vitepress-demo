import type { MarkdownRenderer } from 'vitepress'
import type { ResolvedConfig } from 'vite'
import type { UserOptions } from '../typing'

export class Parser {
  constructor(public options: UserOptions, public config: ResolvedConfig, public md: MarkdownRenderer) {}

  private checkFile(id: string): boolean {
    return id.endsWith('.md')
  }

  public transform(code: string, id: string): string | undefined {
    if (!this.checkFile(id))
      return undefined
    const env = {}
    const tokens = this.md.parse(code, env)
    console.log(tokens, env)
    return undefined
  }
}
