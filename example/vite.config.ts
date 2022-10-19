import { defineConfig } from 'vite'
import { vitePluginVitepressDemo } from '../src'

export default defineConfig({
  plugins: [
    vitePluginVitepressDemo(),
  ],
})
