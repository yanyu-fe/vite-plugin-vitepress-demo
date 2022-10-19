import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/theme.ts',
  ],
  external: [
    './components/demo.vue',
    'vite',
    'vitepress',
    'vue',
  ],
  format: 'esm',
  dts: true,
})
