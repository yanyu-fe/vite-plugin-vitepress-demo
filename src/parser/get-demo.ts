import type * as Token from 'markdown-it/lib/token'
import type { Parser } from './index'

export const getDemo = (tokens: Token[], md: Parser) => {
  const demos: string[] = []
  console.log(tokens)
  for (const token of tokens) {
    if (token.type === 'html_block') {
      const isDemo = md.checkWrapper(token.content)
      if (isDemo)
        demos.push(token.content)
    }
    else if (token.type === 'html_inline') {
      // todo
      console.log(token)
      const isDemo = md.checkWrapper(token.content)
      if (isDemo)
        demos.push(token.content)
    }
  }
  console.log(demos)
}
