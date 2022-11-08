import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { AntdTheme } from '../../../src/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', AntdTheme)
  },
} as Theme
