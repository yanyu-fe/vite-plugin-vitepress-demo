import { fileURLToPath } from 'url'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { describe, expect, it } from 'vitest'
import { createMarkdownRenderer } from 'vitepress'
import { Parser } from '../src/parser'

const fixturePath = fileURLToPath(new URL('./fixtures', import.meta.url))
const inlineMd = resolve(fixturePath, 'inline.md')
const inlineCode = readFileSync(inlineMd, 'utf-8')

describe('transform md', async() => {
  const config: any = {}
  const md = await createMarkdownRenderer(process.cwd(), {}, config.base ?? '/')
  const parser = new Parser({}, config, md)
  it('get demo inline', async() => {
    const demos = await parser.transform(inlineCode, inlineMd)
    expect(demos).toMatchInlineSnapshot(`
      "<div class=\\"language-vue\\"><button title=\\"Copy Code\\" class=\\"copy\\"></button><span class=\\"lang\\">vue</span><pre v-pre><code><span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;</span><span style=\\"color: #F07178\\">template</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"><span style=\\"color: #A6ACCD\\">  </span><span style=\\"color: #89DDFF\\">&lt;</span><span style=\\"color: #F07178\\">div</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"><span style=\\"color: #A6ACCD\\">    Basic Vue</span></span>
      <span class=\\"line\\"><span style=\\"color: #A6ACCD\\">  </span><span style=\\"color: #89DDFF\\">&lt;/</span><span style=\\"color: #F07178\\">div</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;/</span><span style=\\"color: #F07178\\">template</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;</span><span style=\\"color: #F07178\\">script</span><span style=\\"color: #A6ACCD\\"> </span><span style=\\"color: #C792EA\\">lang</span><span style=\\"color: #A6ACCD\\">=</span><span style=\\"color: #89DDFF\\">&quot;</span><span style=\\"color: #C3E88D\\">ts</span><span style=\\"color: #89DDFF\\">&quot;</span><span style=\\"color: #A6ACCD\\"> </span><span style=\\"color: #C792EA\\">setup</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;/</span><span style=\\"color: #F07178\\">script</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;</span><span style=\\"color: #F07178\\">style</span><span style=\\"color: #A6ACCD\\"> </span><span style=\\"color: #C792EA\\">scoped</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;/</span><span style=\\"color: #F07178\\">style</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"></span></code></pre>
      </div>

      <div class=\\"language-vue\\"><button title=\\"Copy Code\\" class=\\"copy\\"></button><span class=\\"lang\\">vue</span><pre v-pre><code><span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;</span><span style=\\"color: #F07178\\">template</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"><span style=\\"color: #A6ACCD\\">  </span><span style=\\"color: #89DDFF\\">&lt;</span><span style=\\"color: #F07178\\">div</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"><span style=\\"color: #A6ACCD\\">    Basic Vue</span></span>
      <span class=\\"line\\"><span style=\\"color: #A6ACCD\\">  </span><span style=\\"color: #89DDFF\\">&lt;/</span><span style=\\"color: #F07178\\">div</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;/</span><span style=\\"color: #F07178\\">template</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;</span><span style=\\"color: #F07178\\">script</span><span style=\\"color: #A6ACCD\\"> </span><span style=\\"color: #C792EA\\">lang</span><span style=\\"color: #A6ACCD\\">=</span><span style=\\"color: #89DDFF\\">&quot;</span><span style=\\"color: #C3E88D\\">ts</span><span style=\\"color: #89DDFF\\">&quot;</span><span style=\\"color: #A6ACCD\\"> </span><span style=\\"color: #C792EA\\">setup</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;/</span><span style=\\"color: #F07178\\">script</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;</span><span style=\\"color: #F07178\\">style</span><span style=\\"color: #A6ACCD\\"> </span><span style=\\"color: #C792EA\\">scoped</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;/</span><span style=\\"color: #F07178\\">style</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"></span></code></pre>
      </div>

      <div class=\\"language-vue\\"><button title=\\"Copy Code\\" class=\\"copy\\"></button><span class=\\"lang\\">vue</span><pre v-pre><code><span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;</span><span style=\\"color: #F07178\\">template</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"><span style=\\"color: #A6ACCD\\">  </span><span style=\\"color: #89DDFF\\">&lt;</span><span style=\\"color: #F07178\\">div</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"><span style=\\"color: #A6ACCD\\">    Basic Vue</span></span>
      <span class=\\"line\\"><span style=\\"color: #A6ACCD\\">  </span><span style=\\"color: #89DDFF\\">&lt;/</span><span style=\\"color: #F07178\\">div</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;/</span><span style=\\"color: #F07178\\">template</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;</span><span style=\\"color: #F07178\\">script</span><span style=\\"color: #A6ACCD\\"> </span><span style=\\"color: #C792EA\\">lang</span><span style=\\"color: #A6ACCD\\">=</span><span style=\\"color: #89DDFF\\">&quot;</span><span style=\\"color: #C3E88D\\">ts</span><span style=\\"color: #89DDFF\\">&quot;</span><span style=\\"color: #A6ACCD\\"> </span><span style=\\"color: #C792EA\\">setup</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;/</span><span style=\\"color: #F07178\\">script</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;</span><span style=\\"color: #F07178\\">style</span><span style=\\"color: #A6ACCD\\"> </span><span style=\\"color: #C792EA\\">scoped</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"><span style=\\"color: #89DDFF\\">&lt;/</span><span style=\\"color: #F07178\\">style</span><span style=\\"color: #89DDFF\\">&gt;</span></span>
      <span class=\\"line\\"></span>
      <span class=\\"line\\"></span></code></pre>
      </div>

      <demo src=\\"./demos/basic.vue\\"></demo>
      "
    `)
  })
})
