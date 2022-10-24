import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { DefaultTheme as DefaultDemo } from '../../../src/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', DefaultDemo)
  },
} as Theme
