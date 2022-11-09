import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/theme.ts',
  ],
  external: [
    /^\.\/components\/.*\.vue$/,
    'vite',
    'vitepress',
    'vue',
    'markdown-it',
  ],
  format: 'esm',
  dts: true,
})
