import { fileURLToPath } from 'url'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { describe, expect, it } from 'vitest'
import { createMarkdownRenderer } from 'vitepress'
import { Parser } from '../src/parser'

const fixturePath = fileURLToPath(new URL('./fixtures', import.meta.url))
const inlineMd = resolve(fixturePath, 'inline.md')
const inlineCode = readFileSync(inlineMd, 'utf-8')
const blockMd = resolve(fixturePath, 'block.md')
const blockCode = readFileSync(blockMd, 'utf-8')

describe('transform md', async() => {
  const config: any = {}
  const md = await createMarkdownRenderer(process.cwd(), {}, config.base ?? '/')
  const parser = new Parser({}, config, md)
  it('get demo inline', async() => {
    const demos = await parser.transform(inlineCode, inlineMd)
    expect(demos).toMatchInlineSnapshot(`
      {
        "code": "<demo src=\\"/tests/fixtures/demos/basic.vue\\"></demo>

      <demo src=\\"/tests/fixtures/demos/index.vue\\"></demo>

      <demo src=\\"/tests/fixtures/demos/test.tsx\\"></demo>
      ",
        "map": SourceMap {
          "file": null,
          "mappings": "AAAA,mDAAqC;AACrC;AACA,mDAAqC;AACrC;AACA,kDAAoC;",
          "names": [],
          "sources": [
            null,
          ],
          "sourcesContent": [
            null,
          ],
          "version": 3,
        },
      }
    `)
  })
  it('get demo block', async() => {
    const demos = await parser.transform(blockCode, blockMd)
    expect(demos).toMatchInlineSnapshot(`
      {
        "code": "<demo src=\\"/tests/fixtures/demos/index.vue\\">
          <template #title=\\"\\">
              TestTitle
          </template>
      </demo>

      <demo src=\\"/tests/fixtures/demos/test.tsx\\">
      </demo>
      ",
        "map": SourceMap {
          "file": null,
          "mappings": "AAAA;;;;;AAKA;AACA;;",
          "names": [],
          "sources": [
            null,
          ],
          "sourcesContent": [
            null,
          ],
          "version": 3,
        },
      }
    `)
  })
})
