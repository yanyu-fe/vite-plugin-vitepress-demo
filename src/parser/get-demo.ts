import type * as Token from 'markdown-it/lib/token'
import type { Parser } from './index'

export const getDemo = (tokens: Token[], md: Parser): string[] => {
  const demos: string[] = []
  for (const token of tokens) {
    if (token.type === 'html_block' || token.type === 'html_inline') {
      const isDemo = md.checkWrapper(token.content)
      if (isDemo)
        demos.push(token.content)
    }
  }
  return demos
}
