import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { vitePluginVitepressDemo } from '../src'

export default defineConfig({
  plugins: [
    vitePluginVitepressDemo(),
    Inspect(),
  ],
})
