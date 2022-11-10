import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VitePluginVitepressDemo from '../src'

export default defineConfig({
  plugins: [
    VitePluginVitepressDemo(),
    Inspect(),
    VueJsx(),
  ],
})
