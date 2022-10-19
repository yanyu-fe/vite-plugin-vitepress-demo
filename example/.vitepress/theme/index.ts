import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { Demo } from '../../../src/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', Demo)
  },
} as Theme
