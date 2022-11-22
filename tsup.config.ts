import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  external: [
    'vite',
    'vitepress',
    'vue',
    'markdown-it',
  ],
  format: ['esm', 'cjs'],
  dts: true,
})
