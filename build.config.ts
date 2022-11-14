import { defineBuildConfig } from 'unbuild'
export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: 'src/components',
      outDir: 'dist/components',
    },
  ],
  declaration: true,
})
