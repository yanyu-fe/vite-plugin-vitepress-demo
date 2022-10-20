import { dirname, resolve } from 'path'
import type { MarkdownRenderer } from 'vitepress'
import type { ResolvedConfig } from 'vite'
import MagicString from 'magic-string'
import type { DemoAttr, UserOptions } from '../typing'
import { getDemo } from './get-demo'
import { parserDemo } from './parser-demo'

export class Parser {
  public wrapper = 'demo'

  public cache = new Map<string, DemoAttr>()

  private _filePath: string | undefined

  private _currentCode: MagicString | undefined

  get basePath(): string {
    return (this.options.base ?? this.config.base) || process.cwd()
  }

  get filePath(): string | undefined {
    return dirname(this._filePath ?? this.basePath)
  }

  public getDemoPath(src: string): string {
    return resolve(this.filePath ?? this.basePath, src)
  }

  public hasCache(src: string): boolean {
    return this.cache.has(src)
  }

  public setCache(src: string, attr: DemoAttr): void {
    this.cache.set(src, attr)
  }

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

  public async transform(code: string, id: string): Promise<string | undefined> {
    if (!this.checkFile(id))
      return undefined
    this._filePath = id
    const env = {}
    const tokens = this.md.parse(code, env)
    this._currentCode = new MagicString(code)
    const demos = getDemo(tokens, this)
    await parserDemo(demos, this)
    // 拿到demos
    return this._currentCode.toString()
  }

  public renderCode(code: string, lang: string): string {
    const env = {}
    return this.md.render(`\`\`\`${lang}\n${code}\n\`\`\``, env)
  }

  public renderMd(code: string): string {
    const env = {}
    return this.md.render(code, env)
  }

  public replaceCode(target: string, code: string) {
    this._currentCode?.replaceAll(target, code)
  }
}