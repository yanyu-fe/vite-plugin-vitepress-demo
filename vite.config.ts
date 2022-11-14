import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    emptyOutDir: false,
    rollupOptions: {
      external: ['virtual:vitepress-demo', 'vue'],
      output: [
        {
          preserveModules: true,
          preserveModulesRoot: 'src/components',
          entryFileNames: '[name].js',
          dir: 'dist/components',
          exports: 'named',
          format: 'esm',
        },
      ],
    },
    lib: {
      entry: 'src/components/index.ts',
      formats: ['es'],
    },
  },
})
