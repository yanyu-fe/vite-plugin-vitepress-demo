import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/theme.ts',
  ],
  external: [
    /^.\/components/,
    'vite',
    'vitepress',
    'vue',
    'markdown-it',
  ],
  format: ['esm', 'cjs'],
  dts: true,
})
