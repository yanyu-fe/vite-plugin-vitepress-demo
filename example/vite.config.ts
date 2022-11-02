import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { vitePluginVitepressDemo } from '../src'

export default defineConfig({
  plugins: [
    vitePluginVitepressDemo({
      glob: './**/demos/**/*.{vue,tsx,jsx}',
      base: fileURLToPath(new URL('../', import.meta.url)),
    }),
    Inspect(),
  ],
})
