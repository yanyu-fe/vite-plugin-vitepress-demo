import { fileURLToPath } from 'url'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { describe, expect, it } from 'vitest'
import { createMarkdownRenderer } from 'vitepress'
import { renderCode } from '../src/parser/render-code'
import { Parser } from '../src/parser'
const demoPath = fileURLToPath(new URL('./fixtures/demos', import.meta.url))
const blockName = resolve(demoPath, 'block-name.vue')
const blockNameCode = readFileSync(blockName, 'utf-8')
describe('renderer', async() => {
  const config: any = {}
  const md = await createMarkdownRenderer(process.cwd(), {}, config.base ?? '/')
  const parser = new Parser({}, config, md)
  it('should render a template', async() => {
    const res = await renderCode(blockNameCode, parser)
    expect(res).toMatchInlineSnapshot(`
      {
        "code": "<template>
        <div />
      </template>


      <script lang=\\"ts\\" setup>

      </script>",
        "docs": [
          {
            "desc": "%3Cp%3E%E5%86%85%E5%AE%B9%E6%8F%8F%E8%BF%B0%3C%2Fp%3E%0A",
            "locale": undefined,
            "title": "Block Name",
          },
        ],
      }
    `)
  })
})
