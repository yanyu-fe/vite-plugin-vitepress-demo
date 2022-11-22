import { defineBuildConfig } from 'unbuild'
export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: 'src/theme',
      outDir: 'dist/theme',
    },
  ],
  declaration: true,
})
